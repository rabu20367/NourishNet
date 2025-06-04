import pandas as pd
from pathlib import Path

FEATURE_STORE_DIR = Path('data/features')
FEATURE_STORE_DIR.mkdir(parents=True, exist_ok=True)


def store_features(df: pd.DataFrame, name: str = 'latest_features.csv') -> None:
    path = FEATURE_STORE_DIR / name
    df.to_csv(path, index=False)


def load_latest(name: str = 'latest_features.csv') -> pd.DataFrame:
    path = FEATURE_STORE_DIR / name
    if path.exists():
        return pd.read_csv(path)
    return pd.DataFrame()
