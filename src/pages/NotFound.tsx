import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-full p-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <Link to="/admin" className="text-blue-600 hover:underline">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
