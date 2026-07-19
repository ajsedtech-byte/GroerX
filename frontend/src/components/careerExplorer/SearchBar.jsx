import React from "react";
import { Search } from "lucide-react";

export default function SearchBar({ search, setSearch }) {
  return (
    <section className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
      <div className="flex items-center gap-3 rounded-2xl bg-black/30 px-4 py-3">
        <Search size={20} className="text-slate-400" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
          placeholder="Search careers..."
        />
      </div>
    </section>
  );
}



