import { spawnSync } from 'child_process';
import path from 'path';

export interface PredictionInput {
  successful_pickups: number;
  declined_pickups: number;
  avg_distance_km: number;
  days_since_last_pickup: number;
  distance_km: number;
  is_perishable: number;
  requested_hour: number;
}

export function predictAcceptance(input: PredictionInput): number {
  const script = path.join(__dirname, 'predict.py');
  const model = path.join(__dirname, 'volunteer_accept_model.h5');
  try {
    const result = spawnSync('python3', [script, model, JSON.stringify(input)], {
      encoding: 'utf-8',
    });
    const out = result.stdout.trim();
    if (out) {
      const data = JSON.parse(out);
      return data.probability;
    }
  } catch (err) {
    console.error('prediction error', err);
  }
  // Fallback simple heuristic
  return 1 / (1 + input.distance_km);
}
