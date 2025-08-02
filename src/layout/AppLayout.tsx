import React from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-8 overflow-auto flex-1">{children}</main>
      </div>
    </div>
  );
}
