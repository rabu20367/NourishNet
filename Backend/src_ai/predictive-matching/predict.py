import json
import sys
import numpy as np
import tensorflow as tf


def predict(model_path: str, features: dict) -> float:
    model = tf.keras.models.load_model(model_path)
    ordered = [
        features['successful_pickups'],
        features['declined_pickups'],
        features['avg_distance_km'],
        features['days_since_last_pickup'],
        features['distance_km'],
        features['is_perishable'],
        features['requested_hour'],
    ]
    arr = np.array([ordered], dtype=float)
    prob = float(model.predict(arr, verbose=0)[0][0])
    return prob


if __name__ == '__main__':
    model = sys.argv[1]
    features = json.loads(sys.argv[2])
    probability = predict(model, features)
    print(json.dumps({'probability': probability}))
