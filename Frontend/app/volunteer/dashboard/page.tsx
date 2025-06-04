"use client";
import { useEffect, useState } from "react";

interface RouteStop {
  donationId: string;
  location: { latitude: number; longitude: number };
}

interface RoutePlan {
  volunteerId: string;
  stops: RouteStop[];
  distance_km: number;
}

export default function VolunteerDashboardPage() {
  const [routes, setRoutes] = useState<RoutePlan[]>([]);

  const fetchRoutes = () =>
    fetch("/api/routes/optimize")
      .then((res) => res.json())
      .then((data) => setRoutes(data.routes || []));

  useEffect(() => {
    fetchRoutes();
    const id = setInterval(fetchRoutes, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="container mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Volunteer Routes</h1>
      {routes.map((r) => (
        <div key={r.volunteerId} className="border rounded p-2">
          <h2 className="font-semibold">Volunteer {r.volunteerId}</h2>
          <ul className="list-disc pl-4">
            {r.stops.map((s) => (
              <li key={s.donationId}>
                Pickup donation {s.donationId} at ({s.location.latitude.toFixed(3)},{" "}
                {s.location.longitude.toFixed(3)})
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-500">
            Estimated distance: {r.distance_km.toFixed(2)} km
          </p>
        </div>
      ))}
    </div>
  );
}

