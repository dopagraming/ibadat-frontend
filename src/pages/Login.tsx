import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded shadow"
      >
        <h2 className="text-2xl mb-6 text-center">Admin Login</h2>
        {error && <p className="mb-4 text-red-600">{error}</p>}
        <label className="block mb-2">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            className="mt-1 block w-full border rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Password</span>
          <input
            type="password"
            className="mt-1 block w-full border rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
