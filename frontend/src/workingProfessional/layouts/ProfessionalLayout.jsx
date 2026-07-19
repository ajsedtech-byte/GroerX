import React from "react";
import Sidebar from "../components/Sidebar.jsx";
import Topbar from "../components/Topbar.jsx";

export default function ProfessionalLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#050a18] text-white">
      <Sidebar />

      <main className="min-h-screen px-4 py-5 lg:ml-[272px] lg:px-8">
        <Topbar />

        <div className="mt-6">
          {children}
        </div>
      </main>
    </div>
  );
}
