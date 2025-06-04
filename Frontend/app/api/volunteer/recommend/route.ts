import { NextRequest, NextResponse } from "next/server";
import { mockDonations, mockVolunteers } from "@/lib/data";
import { predictAcceptance } from '@/ai/predictive-matching';

interface Location {
  latitude: number;
  longitude: number;
}

function distanceKm(a?: Location, b?: Location): number {
  if (!a || !b) return 10;
  const dx = a.latitude - b.latitude;
  const dy = a.longitude - b.longitude;
  return Math.sqrt(dx * dx + dy * dy) * 111;
}

export async function GET(req: NextRequest) {
  const donationId = new URL(req.url).searchParams.get("donationId");
  const donation = mockDonations.find((d) => d.id === donationId);
  if (!donation) {
    return NextResponse.json({ error: "Donation not found" }, { status: 404 });
  }
  const volunteers = mockVolunteers
    .map((v) => {
      const dist = distanceKm(donation.location, v.currentLocation);
      const probability = predictAcceptance({
        successful_pickups: (v as any).successfulPickups ?? 5,
        declined_pickups: (v as any).declinedPickups ?? 1,
        avg_distance_km: dist,
        days_since_last_pickup: 1,
        distance_km: dist,
        is_perishable: donation.isPerishable ? 1 : 0,
        requested_hour: new Date(donation.postedAt).getHours(),
      });
      return { ...v, probability };
    })
    .sort((a, b) => b.probability - a.probability);

  console.log("Notifications sent to top volunteers");
  return NextResponse.json({ volunteers });
}
