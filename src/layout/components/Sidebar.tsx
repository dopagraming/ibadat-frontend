import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block py-2 px-4 rounded hover:bg-gray-200 ${
      isActive ? "bg-gray-200" : ""
    }`;

  return (
    <aside className="w-60 bg-white shadow-md">
      <div className="p-4 font-bold text-lg">Admin Panel</div>
      <nav className="p-4 space-y-2">
        <NavLink to="/admin" className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/worships" className={linkClass}>
          Worships
        </NavLink>
        <NavLink to="/admin/users" className={linkClass}>
          Users
        </NavLink>
      </nav>
    </aside>
  );
}
