import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import Dashboard from "../pages/Dashboard";
import WorshipList from "../pages/WorshipList";
import UserList from "../pages/UserList";
import NotFound from "../pages/NotFound";
import { isAuthenticated } from "../utils/auth";

export default function AdminRoutes() {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <AppLayout>
      <Routes>
        <Route path="" element={<Dashboard />} />
        <Route path="worships" element={<WorshipList />} />
        <Route path="users" element={<UserList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppLayout>
  );
}
