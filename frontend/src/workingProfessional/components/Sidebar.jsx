import React from "react";
import {
  LayoutDashboard,
  Compass,
  Shuffle,
  BarChart3,
  Briefcase,
  TrendingUp,
  Map,
  FileText,
  Mic,
  FolderKanban,
  ClipboardList,
  Bot,
  HeartPulse,
  Bookmark,
  Settings,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, module: "working-dashboard" },
  { label: "Career Direction", icon: Compass, module: "working-career-direction" },
  { label: "Career Switch Planner", icon: Shuffle, module: "working-switch-planner" },
  { label: "Skill Gap Analysis", icon: BarChart3, module: "working-skill-gap" },
  { label: "Job Explorer", icon: Briefcase, module: "working-job-explorer" },
  { label: "Salary Growth", icon: TrendingUp, module: "working-salary-growth" },
  { label: "Learning Roadmap", icon: Map, module: "working-roadmap" },
  { label: "Resume Builder", icon: FileText, module: "working-resume" },
  { label: "Interview Prep", icon: Mic, module: "working-interview" },
  { label: "Portfolio Builder", icon: FolderKanban, module: "working-portfolio" },
  { label: "Job Tracker", icon: ClipboardList, module: "working-job-tracker" },
  { label: "AI Career Mentor", icon: Bot, module: "working-ai-mentor" },
  { label: "Work-Life Balance", icon: HeartPulse, module: "working-work-life" },
  { label: "Saved Jobs", icon: Bookmark, module: "working-saved" },
  { label: "Settings", icon: Settings, module: "working-settings" },
];

export default function Sidebar() {
  const currentModule =
    localStorage.getItem("currentModule") || "working-dashboard";

  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-screen w-[272px] flex-col border-r border-white/10 bg-[#070b22] px-5 py-6 lg:flex">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-sky-500 text-2xl shadow-lg shadow-violet-900/40">
          🐘
        </div>

        <div>
          <h1 className="text-2xl font-black tracking-tight text-white">
            Groer<span className="text-fuchsia-400">X</span>
          </h1>
          <p className="text-[11px] text-slate-400">
            Professional Career OS
          </p>
        </div>
      </div>

      <div className="mb-4 rounded-2xl bg-violet-500/15 px-4 py-2 text-xs font-bold text-violet-200">
        WORKING PROFESSIONAL
      </div>

      <nav className="space-y-2 overflow-y-auto pr-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = currentModule === item.module;

          return (
            <button
              key={item.label}
              onClick={() => {
                localStorage.setItem("currentModule", item.module);
                window.goToWorkingModule?.(item.module);
              }}
              className={`flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                active
                  ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-900/30"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-5 rounded-3xl border border-blue-400/20 bg-gradient-to-br from-[#111a3f] to-[#0b102c] p-4">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
            <MessageCircle size={24} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-white">Need Guidance?</h3>
            <p className="text-xs text-slate-400">Ask Groer AI Mentor</p>
          </div>
        </div>

        <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-sky-500 py-3 text-sm font-bold text-white">
          Chat Now <ArrowRight size={16} />
        </button>
      </div>
    </aside>
  );
}


