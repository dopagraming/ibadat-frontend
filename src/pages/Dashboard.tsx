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
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-4xl font-bold mb-2">
          Welcome Back{userEmail ? `, ${userEmail.split('@')[0]}` : ""}
        </h1>
        <p className="text-blue-100 text-lg">Here's what's happening with your platform today</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-slate-200/50 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-slate-600 font-medium mb-2">Total Worships</p>
          <p className="text-3xl font-bold text-slate-800">{metrics.worships.toLocaleString()}</p>
          <p className="text-sm text-green-600 mt-2">↗ Active programs</p>
        </div>
        
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-slate-200/50 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-xl">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
          </div>
          <p className="text-slate-600 font-medium mb-2">Total Students</p>
          <p className="text-3xl font-bold text-slate-800">{metrics.students.toLocaleString()}</p>
          <p className="text-sm text-blue-600 mt-2">↗ Enrolled learners</p>
        </div>
        
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-slate-200/50 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-xl">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <p className="text-slate-600 font-medium mb-2">Total Parents</p>
          <p className="text-3xl font-bold text-slate-800">{metrics.parents.toLocaleString()}</p>
          <p className="text-sm text-purple-600 mt-2">↗ Connected families</p>
        </div>
      </div>
    </div>
  );
}
