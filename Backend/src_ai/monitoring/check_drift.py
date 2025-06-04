import json
import pandas as pd
from pathlib import Path

FEATURE_STORE_PATH = Path('data/features/latest_features.csv')
BASELINE_PATH = Path(__file__).with_name('baseline_stats.json')
DRIFT_THRESHOLD = 0.2


def load_features() -> pd.DataFrame:
    if FEATURE_STORE_PATH.exists():
        return pd.read_csv(FEATURE_STORE_PATH)
    return pd.DataFrame()


def compute_stats(df: pd.DataFrame) -> dict:
    stats = {}
    for column in df.columns:
        if pd.api.types.is_numeric_dtype(df[column]):
            stats[column] = {
                'mean': df[column].mean(),
                'std': df[column].std()
            }
    return stats


def detect_drift(baseline: dict, current: dict) -> bool:
    for key, base_vals in baseline.items():
        cur_vals = current.get(key, {})
        if not cur_vals:
            continue
        base_mean = base_vals.get('mean', 0)
        cur_mean = cur_vals.get('mean', 0)
        if abs(cur_mean - base_mean) > DRIFT_THRESHOLD * max(abs(base_mean), 1):
            return True
    return False


def main() -> None:
    if not FEATURE_STORE_PATH.exists():
        print('No feature data available')
        return
    df = load_features()
    current_stats = compute_stats(df)
    baseline = json.loads(BASELINE_PATH.read_text())
    if detect_drift(baseline, current_stats):
        print('Data drift detected')
        exit(1)
    print('No drift detected')


if __name__ == '__main__':
    main()
