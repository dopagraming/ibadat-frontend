import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import api from "../lib/api";
import WorshipForm from "../components/WorshipForm";

interface Worship {
  _id: string;
  name: string;
  points: number;
  rewardValue: number;
}

export default function WorshipList() {
  const [worships, setWorships] = useState<Worship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Worship | null>(null);

  const fetchWorships = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/worships?page=1&limit=100");
      setWorships(res.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load worships");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorships();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (item: Worship) => {
    setEditing(item);
    setModalOpen(true);
  };

  const handleSubmit = async (data: Omit<Worship, "_id">) => {
    if (editing) {
      await api.put(`/admin/worships/${editing._id}`, data);
    } else {
      await api.post("/admin/worships", data);
    }
    setModalOpen(false);
    fetchWorships();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this worship?")) {
      await api.delete(`/admin/worships/${id}`);
      setWorships((prev) => prev.filter((w) => w._id !== id));
    }
  };

  if (loading) return <p className="p-6">Loading worships…</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Manage Worships</h2>
        <button
          onClick={openCreate}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Worship
        </button>
      </div>
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Points</th>
            <th className="py-2 px-4 border-b">Reward Value</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {worships.map((w) => (
            <tr key={w._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{w.name}</td>
              <td className="py-2 px-4 border-b">{w.points}</td>
              <td className="py-2 px-4 border-b">{w.rewardValue}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => openEdit(w)}
                  className="text-blue-600 hover:underline mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(w._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-30"
      >
        <Dialog.Panel className="bg-white rounded shadow-lg w-full max-w-md">
          <WorshipForm
            initialValues={
              editing
                ? {
                    name: editing.name,
                    points: editing.points,
                    rewardValue: editing.rewardValue,
                  }
                : undefined
            }
            onSubmit={handleSubmit}
            onClose={() => setModalOpen(false)}
          />
        </Dialog.Panel>
      </Dialog>
    </div>
  );
}
