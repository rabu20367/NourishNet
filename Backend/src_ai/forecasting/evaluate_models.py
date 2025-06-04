import os
from datetime import datetime
from typing import List, Tuple

import pandas as pd
from google.cloud import firestore
from prophet import Prophet
from sklearn.metrics import mean_absolute_error, accuracy_score
import tensorflow as tf

# Paths for predictive matching model
default_data_path = os.getenv("PREDICT_EVAL_DATA", "data/training/sample.csv")
default_model_path = os.getenv("PREDICT_MODEL_PATH", "volunteer_accept_model.h5")

FORECAST_DONATIONS_COLLECTION = os.getenv("FORECAST_DONATIONS_COLLECTION", "donations")
FORECAST_REQUESTS_COLLECTION = os.getenv("FORECAST_REQUESTS_COLLECTION", "requests")
FORECAST_DAYS = int(os.getenv("FORECAST_DAYS", "7"))

FORECAST_MAE_THRESHOLD = float(os.getenv("FORECAST_MAE_THRESHOLD", "10"))
PREDICT_ACC_THRESHOLD = float(os.getenv("PREDICT_ACC_THRESHOLD", "0.5"))

PREDICT_FEATURES = [
    "successful_pickups",
    "declined_pickups",
    "avg_distance_km",
    "days_since_last_pickup",
    "distance_km",
    "is_perishable",
    "requested_hour",
]

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

def evaluate_forecast(client: firestore.Client, collection: str) -> float:
    df = _load_time_series(client, collection)
    if len(df) <= FORECAST_DAYS:
        return float("inf")
    df = df.sort_values("ds")
    train_df = df.iloc[:-FORECAST_DAYS]
    test_df = df.iloc[-FORECAST_DAYS:]
    model = _train_model(train_df)
    preds = _forecast(model, FORECAST_DAYS)
    mae = mean_absolute_error(test_df["y"], preds["yhat"])
    return mae

def evaluate_predictive(data_path: str, model_path: str) -> float:
    df = pd.read_csv(data_path)
    X = df[PREDICT_FEATURES]
    y = df["accepted"]
    model = tf.keras.models.load_model(model_path)
    preds = (model.predict(X, verbose=0).flatten() > 0.5).astype(int)
    acc = accuracy_score(y, preds)
    return acc

def main() -> None:
    data_path = default_data_path
    model_path = default_model_path
    client = firestore.Client()

    donation_mae = evaluate_forecast(client, FORECAST_DONATIONS_COLLECTION)
    request_mae = evaluate_forecast(client, FORECAST_REQUESTS_COLLECTION)
    predict_acc = evaluate_predictive(data_path, model_path)

    print(f"Donation forecast MAE: {donation_mae:.4f}")
    print(f"Request forecast MAE: {request_mae:.4f}")
    print(f"Predictive matching accuracy: {predict_acc:.4f}")

    if (
        donation_mae > FORECAST_MAE_THRESHOLD
        or request_mae > FORECAST_MAE_THRESHOLD
        or predict_acc < PREDICT_ACC_THRESHOLD
    ):
        raise SystemExit("Model metrics did not meet required thresholds")

if __name__ == "__main__":
    main()
