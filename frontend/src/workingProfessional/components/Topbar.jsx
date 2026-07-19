import React from "react";
import { Bell, ChevronDown, Search } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm text-slate-400">
          GroerX &gt; Working Professional Career OS
        </p>
        <h1 className="mt-2 text-2xl font-black text-white">
          Welcome back, A.J 👋
        </h1>
      </div>

      <div className="hidden items-center gap-4 xl:flex">
        <div className="flex w-[320px] items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
          <Search size={18} className="text-slate-400" />
          <input
            placeholder="Search jobs, skills, paths..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          />
        </div>

        <button className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-3">
          <Bell size={20} />
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold">
            3
          </span>
        </button>

        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 font-black">
            AJ
          </div>

          <div>
            <p className="text-sm font-bold text-white">A.J</p>
            <p className="text-xs text-slate-400">Working Professional</p>
          </div>

          <ChevronDown size={18} className="text-slate-400" />
        </div>
      </div>
    </header>
  );
}
