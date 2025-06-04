import os
from datetime import datetime
from typing import List

from google.cloud import firestore
import pandas as pd
from prophet import Prophet

FIRESTORE_COLLECTION_DONATIONS = os.getenv("FORECAST_DONATIONS_COLLECTION", "donations")
FIRESTORE_COLLECTION_REQUESTS = os.getenv("FORECAST_REQUESTS_COLLECTION", "requests")
FORECAST_OUTPUT_COLLECTION = os.getenv("FORECAST_OUTPUT_COLLECTION", "forecasts")
FORECAST_DAYS = int(os.getenv("FORECAST_DAYS", 14))


def _load_time_series(client: firestore.Client, collection: str) -> pd.DataFrame:
    docs = client.collection(collection).stream()
    rows: List[dict] = []
    for doc in docs:
        data = doc.to_dict()
        ts = data.get("timestamp") or data.get("createdAt") or data.get("date")
        if not ts:
            continue
        if isinstance(ts, datetime):
            dt = ts
        else:
            dt = datetime.fromisoformat(str(ts))
        rows.append({"ds": dt.date(), "y": 1})
    df = pd.DataFrame(rows)
    if df.empty:
        return pd.DataFrame(columns=["ds", "y"])
    df = df.groupby("ds").sum().reset_index()
    return df


def _train_model(df: pd.DataFrame) -> Prophet:
    model = Prophet()
    if not df.empty:
        model.fit(df)
    return model


def _forecast(model: Prophet, periods: int) -> pd.DataFrame:
    future = model.make_future_dataframe(periods=periods)
    forecast = model.predict(future)
    return forecast[["ds", "yhat"]].tail(periods)


def _store_forecast(client: firestore.Client, records: pd.DataFrame) -> None:
    coll = client.collection(FORECAST_OUTPUT_COLLECTION)
    for _, row in records.iterrows():
        doc_id = row["ds"].strftime("%Y-%m-%d")
        coll.document(doc_id).set(
            {"date": doc_id, "value": float(row["yhat"])}, merge=True
        )


def main() -> None:
    client = firestore.Client()
    donations_df = _load_time_series(client, FIRESTORE_COLLECTION_DONATIONS)
    donation_model = _train_model(donations_df)
    donation_forecast = _forecast(donation_model, FORECAST_DAYS)
    _store_forecast(
        client, donation_forecast.rename(columns={"yhat": "donation_supply"})
    )

    requests_df = _load_time_series(client, FIRESTORE_COLLECTION_REQUESTS)
    request_model = _train_model(requests_df)
    request_forecast = _forecast(request_model, FORECAST_DAYS)
    _store_forecast(
        client, request_forecast.rename(columns={"yhat": "recipient_demand"})
    )


if __name__ == "__main__":
    main()
