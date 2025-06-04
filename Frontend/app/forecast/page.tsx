"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { PageHeader } from "@/components/page-header";
import { mockForecasts } from "@/lib/data";

interface Forecast {
  date: string;
  donation_supply: number;
  recipient_demand: number;
}

export default function ForecastPage() {
  const [data, setData] = useState<Forecast[]>(mockForecasts);

  useEffect(() => {
    async function load() {
      try {
        const q = query(collection(db, "forecasts"), orderBy("date"));
        const snap = await getDocs(q);
        const docs = snap.docs.map((d) => d.data() as Forecast);
        if (docs.length) {
          setData(docs);
        }
      } catch (err) {
        console.error("Failed to load forecasts", err);
      }
    }
    load();
  }, []);

  return (
    <div className="container mx-auto">
      <PageHeader
        title="Forecasts"
        description="Predicted donation supply and recipient demand."
      />
      <div className="overflow-x-auto">
        <LineChart width={730} height={250} data={data} className="mx-auto">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="donation_supply"
            stroke="#8884d8"
            name="Donations"
          />
          <Line
            type="monotone"
            dataKey="recipient_demand"
            stroke="#82ca9d"
            name="Demand"
          />
        </LineChart>
      </div>
    </div>
  );
}
