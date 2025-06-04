# ML Pipeline Environment Setup

This document explains how to reproduce the machine learning workflows locally or in a cloud environment.

## Prerequisites

- Python 3.10+
- `pip`
- Access to Google Cloud Firestore (optional for production training)

## Setup Steps

1. **Install Python dependencies**
   ```bash
   pip install -r Backend/src_ai/forecasting/requirements.txt
   pip install google-cloud-firestore prophet pandas tensorflow
   ```

2. **Prepare feature data**
   - Export your training features to `data/features/latest_features.csv`.
   - Baseline statistics are stored in `Backend/src_ai/monitoring/baseline_stats.json`.

3. **Check for data drift**
   ```bash
   python Backend/src_ai/monitoring/check_drift.py
   ```
   If drift is detected, the command exits with status `1`.

4. **Run training scripts**
   ```bash
   python Backend/src_ai/forecasting/train_forecasting.py
   python Backend/src_ai/predictive-matching/train_model.py <path-to-training-csv>
   ```

These steps mirror the automation performed in `.github/workflows/ml_pipeline.yml` so contributors can reproduce the pipeline locally.
