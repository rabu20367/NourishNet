"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { mockDonations } from "@/lib/data";
import type { Volunteer } from "@/lib/types";

export default function DonationDetailPage() {
  const params = useParams();
  const id = Array.isArray(params['id']) ? params['id'][0] : params['id'];
  const donation = mockDonations.find((d) => d.id === id);
  const [volunteers, setVolunteers] = useState<
    Volunteer[] & { probability?: number }[]
  >([]);

  useEffect(() => {
    if (id) {
      fetch(`/api/volunteer/recommend?donationId=${id}`)
        .then((res) => res.json())
        .then((data) => setVolunteers(data.volunteers || []));
    }
  }, [id]);

  if (!donation) {
    return <div className="container mx-auto">Donation not found.</div>;
  }

  return (
    <div className="container mx-auto space-y-6">
      <h1 className="text-2xl font-bold">{donation.foodName}</h1>
      <p>{donation.description}</p>
      <h2 className="text-xl font-semibold mt-4">Recommended Volunteers</h2>
      <ul className="space-y-2">
        {volunteers.map((v) => (
          <li key={v.id} className="rounded border p-2">
            {v.name} -{" "}
            {(v as any).probability
              ? `${((v as any).probability * 100).toFixed(0)}%`
              : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}
