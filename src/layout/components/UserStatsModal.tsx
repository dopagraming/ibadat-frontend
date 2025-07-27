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
      className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-30"
    >
      <Dialog.Panel className="bg-white rounded shadow-lg w-full max-w-md">
        <div className="p-6">
          <Dialog.Title className="text-xl font-semibold mb-4">
            User Statistics
          </Dialog.Title>

          {loading && <p>Loading stats…</p>}
          {error && <p className="text-red-600">Error: {error}</p>}

          {!loading && !error && (
            <div className="space-y-2">
              {stats.worshipCount !== undefined && (
                <p>
                  <strong>Worships Completed:</strong> {stats.worshipCount}
                </p>
              )}
              {stats.points !== undefined && (
                <p>
                  <strong>Total Points:</strong> {stats.points}
                </p>
              )}
              {stats.gifts !== undefined && (
                <p>
                  <strong>Gifts Awarded:</strong> {stats.gifts}
                </p>
              )}
              {stats.studentCount !== undefined && (
                <p>
                  <strong>Student Count:</strong> {stats.studentCount}
                </p>
              )}
              {stats.totalPoints !== undefined && (
                <p>
                  <strong>Total Points of Students:</strong> {stats.totalPoints}
                </p>
              )}
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
              Close
            </button>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
