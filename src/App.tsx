import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import PublicRoutes from "./routes/PublicRoutes";

export default function App() {
  return (
    <Routes>
      <Route path="/*" element={<PublicRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
  );
}
