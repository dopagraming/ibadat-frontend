import React, { useEffect, useState } from "react";
import api from "../lib/api";
import UserStatsModal from "../components/UserStatsModal";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isStatsOpen, setStatsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    api
      .get("/admin/users?page=1&limit=100")
      .then((res) => setUsers(res.data.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to load users")
      )
      .finally(() => setLoading(false));
  }, []);

  const openStats = (id: string) => {
    setSelectedUser(id);
    setStatsOpen(true);
  };

  const closeStats = () => {
    setStatsOpen(false);
    setSelectedUser("");
  };

  if (loading) return <p className="p-6">Loading users…</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Email</th>
            <th className="py-2 px-4 border-b text-left">Role</th>
            <th className="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="hover:bg-gray-100">
              <td className="py-2 px-4	border-b">{u.name}</td>
              <td className="py-2 px-4 border-b">{u.email}</td>
              <td className="py-2 px-4 border-b capitalize">{u.role}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => openStats(u._id)}
                  className="text-blue-600 hover:underline"
                >
                  View Stats
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <UserStatsModal
        userId={selectedUser}
        isOpen={isStatsOpen}
        onClose={closeStats}
      />
    </div>
  );
}
