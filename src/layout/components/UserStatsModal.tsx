import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import api from "../lib/api";

interface Stats {
  worshipCount?: number;
  points?: number;
  gifts?: number;
  studentCount?: number;
  totalPoints?: number;
}

interface Props {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function UserStatsModal({ userId, isOpen, onClose }: Props) {
  const [stats, setStats] = useState<Stats>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    api
      .get(`/admin/users/${userId}/stats`)
      .then((res) => setStats(res.data.stats))
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to load stats")
      )
      .finally(() => setLoading(false));
  }, [isOpen, userId]);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <Dialog.Panel className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 border border-slate-200/50">
        <div className="p-8">
          <Dialog.Title className="text-2xl font-bold text-slate-800 mb-6 text-center">
            User Statistics
          </Dialog.Title>

          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-slate-600">Loading stats...</span>
            </div>
          )}
          
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
              <p className="text-red-700 text-sm">Error: {error}</p>
            </div>
          )}

          {!loading && !error && (
            <div className="space-y-4">
              {stats.worshipCount !== undefined && (
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <span className="font-medium text-slate-700">Worships Completed</span>
                  <span className="text-2xl font-bold text-blue-600">{stats.worshipCount}</span>
                </div>
              )}
              {stats.points !== undefined && (
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <span className="font-medium text-slate-700">Total Points</span>
                  <span className="text-2xl font-bold text-green-600">{stats.points}</span>
                </div>
              )}
              {stats.gifts !== undefined && (
                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                  <span className="font-medium text-slate-700">Gifts Awarded</span>
                  <span className="text-2xl font-bold text-purple-600">{stats.gifts}</span>
                </div>
              )}
              {stats.studentCount !== undefined && (
                <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                  <span className="font-medium text-slate-700">Student Count</span>
                  <span className="text-2xl font-bold text-orange-600">{stats.studentCount}</span>
                </div>
              )}
              {stats.totalPoints !== undefined && (
                <div className="flex justify-between items-center p-4 bg-indigo-50 rounded-lg">
                  <span className="font-medium text-slate-700">Students' Total Points</span>
                  <span className="text-2xl font-bold text-indigo-600">{stats.totalPoints}</span>
                </div>
              )}
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <button 
              onClick={onClose} 
              className="px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors duration-200 font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
