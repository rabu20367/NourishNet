import { NextResponse } from 'next/server';
import { mockDonations, mockVolunteers } from '@/lib/data';
import type { DayOfWeek, TimeOfDay } from '@/lib/types';
import { optimizeRoutes } from '../../../../Backend/src_ai/routing';

function currentTimeOfDay(): TimeOfDay {
  const h = new Date().getHours();
  if (h < 12) return 'Morning';
  if (h < 18) return 'Afternoon';
  return 'Evening';
}

export async function GET() {
  const day = new Date().toLocaleDateString('en-US', { weekday: 'long' }) as DayOfWeek;
  const time = currentTimeOfDay();

  const result = optimizeRoutes({
    donations: mockDonations.filter((d) => d.status === 'Available').map((d) => ({
      id: d.id,
      location: d.location,
    })),
    volunteers: mockVolunteers.map((v) => ({
      id: v.id,
      isActive: v.isActive,
      availability: v.availability,
      currentLocation: v.currentLocation!,
    })),
    currentDay: day,
    currentTime: time,
    trafficFactor: 1.2,
  });

  return NextResponse.json(result);
}

