import { spawnSync } from 'child_process';
import path from 'path';

export interface Location {
  latitude: number;
  longitude: number;
}

export interface DonationLocation {
  id: string;
  location: Location;
}

export interface VolunteerInfo {
  id: string;
  isActive: boolean;
  availability: { days: string[]; times: string[] };
  currentLocation: Location;
}

export interface OptimizeRoutesInput {
  donations: DonationLocation[];
  volunteers: VolunteerInfo[];
  currentDay: string;
  currentTime: string;
  trafficFactor?: number;
}

export interface RouteStop {
  donationId: string;
  location: Location;
}

export interface RoutePlan {
  volunteerId: string;
  stops: RouteStop[];
  distance_km: number;
}

export interface OptimizeRoutesOutput {
  routes: RoutePlan[];
  unassigned: string[];
}

export function optimizeRoutes(input: OptimizeRoutesInput): OptimizeRoutesOutput {
  const script = path.join(__dirname, 'optimize_routes.py');
  const result = spawnSync('python3', [script, JSON.stringify(input)], {
    encoding: 'utf-8',
  });
  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    console.error(result.stderr);
    throw new Error('route optimization failed');
  }
  return JSON.parse(result.stdout.trim() || '{}');
}

