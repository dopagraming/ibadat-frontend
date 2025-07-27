import React, { useEffect, useState, useContext } from "react";
import api from "../lib/api";
import { AuthContext } from "../context/AuthContext";

interface Metrics {
  worships: number;
  students: number;
  parents: number;
}

export default function Dashboard() {
  const { userEmail } = useContext(AuthContext);
  const [metrics, setMetrics] = useState<Metrics>({
    worships: 0,
    students: 0,
    parents: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        // نجلب صفحة واحدة فقط لكن نستفيد من القيمة total
        const [wRes, sRes, pRes] = await Promise.all([
          api.get("/admin/worships?page=1&limit=1"),
          api.get("/admin/users?page=1&limit=1&role=student"),
          api.get("/admin/users?page=1&limit=1&role=parent"),
        ]);
        setMetrics({
          worships: wRes.data.total,
          students: sRes.data.total,
          parents: pRes.data.total,
        });
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load metrics");
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  if (loading) return <p className="p-6">Loading metrics…</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">
        Welcome{userEmail ? `, ${userEmail}` : ""}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded p-6">
          <p className="text-lg text-gray-500">Total Worships</p>
          <p className="mt-2 text-3xl font-bold">{metrics.worships}</p>
        </div>
        <div className="bg-white shadow rounded p-6">
          <p className="text-lg text-gray-500">Total Students</p>
          <p className="mt-2 text-3xl font-bold">{metrics.students}</p>
        </div>
        <div className="bg-white shadow rounded p-6">
          <p className="text-lg text-gray-500">Total Parents</p>
          <p className="mt-2 text-3xl font-bold">{metrics.parents}</p>
        </div>
      </div>
    </div>
  );
}
