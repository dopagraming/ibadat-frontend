import React from "react";

export default function Header() {
  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/50 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold text-slate-800">Admin Dashboard</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-semibold text-sm">A</span>
          </div>
          <span className="text-sm font-medium text-slate-700">Admin</span>
        </div>
      </div>
    </header>
  );
}
