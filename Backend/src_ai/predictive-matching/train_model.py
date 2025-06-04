import pandas as pd
import tensorflow as tf
from sklearn.model_selection import train_test_split

FEATURES = [
    'successful_pickups',
    'declined_pickups',
    'avg_distance_km',
    'days_since_last_pickup',
    'distance_km',
    'is_perishable',
    'requested_hour',
]


def load_data(path: str) -> pd.DataFrame:
    return pd.read_csv(path)


def build_model(input_dim: int) -> tf.keras.Model:
    model = tf.keras.Sequential([
        tf.keras.layers.Dense(16, activation='relu', input_shape=(input_dim,)),
        tf.keras.layers.Dense(8, activation='relu'),
        tf.keras.layers.Dense(1, activation='sigmoid'),
    ])
    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
    return model


def train(path: str, model_path: str = 'volunteer_accept_model.h5') -> None:
    df = load_data(path)
    X = df[FEATURES]
    y = df['accepted']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = build_model(X_train.shape[1])
    model.fit(X_train, y_train, epochs=20, validation_data=(X_test, y_test))
    model.save(model_path)


if __name__ == '__main__':
    import argparse

    parser = argparse.ArgumentParser(description='Train volunteer acceptance model')
    parser.add_argument('data', help='Path to training CSV')
    parser.add_argument('--output', default='volunteer_accept_model.h5', help='Output model path')
    args = parser.parse_args()
    train(args.data, args.output)
