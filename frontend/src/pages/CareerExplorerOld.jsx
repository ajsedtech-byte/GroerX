import React from "react";
import Sidebar from "../components/layout/Sidebar";
import Hero from "../components/careerExplorer/Hero";
import SearchBar from "../components/careerExplorer/SearchBar";
import CareerCards from "../components/careerExplorer/CareerCards";
import CareerDetails from "../components/careerExplorer/CareerDetails";
import Roadmap from "../components/careerExplorer/Roadmap";
import RightSidebar from "../components/careerExplorer/RightSidebar";
import useCareers from "../hooks/useCareers";
import {
  Home,
  ClipboardList,
  Compass,
  Map,
  GraduationCap,
  Route,
  Settings,
  Heart,
  Bot,
  Download,
  Bell,
  ChevronDown,
  ArrowRight,
  FlaskConical,
  BriefcaseBusiness,
  Palette,
  Globe2,
  MessageCircle
} from "lucide-react";

const {
careers,
selectedCareer,
setSelectedCareer,
streamSlug,
loading,
error
}=useCareers();

const menuItems = [
  { label: "Dashboard", icon: Home },
  { label: "Assessment", icon: ClipboardList },
  { label: "Careers Explorer", icon: Compass, active: true },
  { label: "Stream Guide", icon: Map },
  { label: "Universities", icon: GraduationCap },
  { label: "Roadmap", icon: Route },
  { label: "Skills Corner", icon: Settings },
  { label: "Saved", icon: Heart },
  { label: "AI Guide", icon: Bot }
];

const streams = [
  {
    title: "Science",
    subtitle: "PCB / PCM / PCMB",
    desc: "For curious minds who love exploring how things work.",
    icon: FlaskConical,
    color: "from-blue-500/30 to-cyan-500/10",
    border: "border-cyan-400/40",
    tag: "TOP MATCH"
  },
  {
    title: "Commerce",
    subtitle: "With / Without Maths",
    desc: "For future business leaders and financial experts.",
    icon: BriefcaseBusiness,
    color: "from-yellow-500/30 to-orange-500/10",
    border: "border-yellow-400/40"
  },
  {
    title: "Humanities",
    subtitle: "",
    desc: "For those who want to understand people and society.",
    icon: Globe2,
    color: "from-blue-500/30 to-violet-500/10",
    border: "border-blue-400/40"
  },
  {
    title: "Arts",
    subtitle: "",
    desc: "For creative souls with a passion for expression.",
    icon: Palette,
    color: "from-pink-500/30 to-rose-500/10",
    border: "border-pink-400/40"
  }
];

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[230px] bg-[#070b21] border-r border-white/10 px-4 py-5 hidden lg:flex flex-col">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 rounded-2xl bg-purple-600 flex items-center justify-center text-2xl">
          🐘
        </div>
        <h1 className="text-2xl font-bold text-white">
          Groer<span className="text-purple-400">X</span>
        </h1>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition ${
                item.active
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-purple-900/30"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl bg-gradient-to-br from-[#0d1b3d] to-[#10143a] border border-blue-400/20 p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-xl bg-cyan-500/20 flex items-center justify-center">
            <MessageCircle className="text-cyan-300" size={22} />
          </div>
          <div>
            <h3 className="text-white text-sm font-semibold">Chat with AI Guide</h3>
            <p className="text-slate-400 text-xs">Personalized advice</p>
          </div>
        </div>

        <button className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-xl text-sm flex items-center justify-center gap-2">
          Ask Now <ArrowRight size={16} />
        </button>
      </div>
    </aside>
  );
}

function Header() {
  return (
    <header className="h-16 flex items-center justify-between">
      <div />
      <div className="flex items-center gap-4">
        <button className="hidden md:flex items-center gap-2 px-5 py-2 rounded-xl border border-white/10 bg-white/5 text-white text-sm hover:bg-white/10">
          <Download size={16} />
          Download Report
        </button>

        <button className="relative w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-white">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-300 to-red-500 border-2 border-white/20" />
          <div className="hidden sm:block">
            <p className="text-white text-sm font-semibold">Hello, Aarav!</p>
            <p className="text-slate-400 text-xs">Class 10th</p>
          </div>
          <ChevronDown size={16} className="text-slate-400" />
        </div>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#101a46] via-[#101436] to-[#070b21] p-7 min-h-[330px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(124,58,237,0.35),transparent_35%),radial-gradient(circle_at_30%_80%,rgba(59,130,246,0.25),transparent_35%)]" />

      <div className="relative z-10 grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6">
        <div>
          <p className="text-slate-300 text-lg mb-2">Discover. Explore. Decide.</p>

          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Your Future,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300">
              Your Choice!
            </span>
          </h2>

          <p className="text-slate-300 mt-4 max-w-xl leading-relaxed">
            Based on your assessment, explore the best stream options and exciting career paths that match you.
          </p>

          <div className="mt-8 w-full max-w-md rounded-2xl bg-emerald-500/10 border border-emerald-400/30 p-5 flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-emerald-400/10 border border-emerald-300/40 flex items-center justify-center">
              <FlaskConical className="text-emerald-300" size={30} />
            </div>

            <div>
              <p className="text-emerald-300 text-xs font-semibold">Your Top Match</p>
              <h3 className="text-white text-xl font-bold">Science Stream</h3>
              <p className="text-emerald-300 text-4xl font-black">87% <span className="text-base">Match</span></p>
            </div>
          </div>
        </div>

        <div className="hidden xl:flex items-center justify-center">
          <div className="relative">
            <div className="text-[140px] drop-shadow-2xl">🐘</div>
            <div className="absolute -left-28 top-8 space-y-4">
              <div className="rotate-6 rounded-xl border border-cyan-400/40 bg-cyan-500/10 px-5 py-3 text-white shadow-lg shadow-cyan-900/30">
                🔍 Discover<br />
                <span className="text-xs text-slate-300">your strengths</span>
              </div>
              <div className="-rotate-3 rounded-xl border border-blue-400/40 bg-blue-500/10 px-5 py-3 text-white shadow-lg shadow-purple-900/30">
                🏔 Explore<br />
                <span className="text-xs text-slate-300">career paths</span>
              </div>
              <div className="rotate-3 rounded-xl border border-orange-400/40 bg-orange-500/10 px-5 py-3 text-white shadow-lg shadow-orange-900/30">
                🎯 Decide<br />
                <span className="text-xs text-slate-300">your future</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StreamCard({ stream }) {
  const Icon = stream.icon;

  return (
    <div className={`relative rounded-2xl bg-gradient-to-br ${stream.color} border ${stream.border} p-5 min-h-[230px] overflow-hidden hover:scale-[1.02] transition`}>
      {stream.tag && (
        <span className="absolute top-0 left-0 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-br-xl">
          ★ {stream.tag}
        </span>
      )}

      <div className="h-20 flex items-center justify-center mb-4 mt-3">
        <Icon size={58} className="text-white drop-shadow-lg" />
      </div>

      <h3 className="text-white text-xl font-bold text-center">{stream.title}</h3>
      {stream.subtitle && (
        <p className="text-yellow-300 text-sm font-semibold text-center mt-1">
          {stream.subtitle}
        </p>
      )}
      <p className="text-slate-300 text-sm text-center mt-3 leading-relaxed">
        {stream.desc}
      </p>

      <button className="mt-5 w-full rounded-xl bg-white/10 border border-white/10 text-white py-2 text-sm flex items-center justify-center gap-2 hover:bg-white/20">
        Explore <ArrowRight size={15} />
      </button>
    </div>
  );
}

function ExploreStreams() {
  return (
    <section className="mt-6">
      <h2 className="text-white text-xl font-bold mb-4">Explore Streams</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {streams.map((stream) => (
          <StreamCard key={stream.title} stream={stream} />
        ))}
      </div>
    </section>
  );
}

export default function CareerExplorer() {
  return (
    <div className="min-h-screen bg-[#050a18] text-white">
      <Sidebar />

      <main className="lg:ml-[230px] px-4 md:px-8 pb-8">
        <Header />

        <div className="grid grid-cols-1 2xl:grid-cols-[1fr_400px] gap-6">
          <div>
            <HeroSection />
            <ExploreStreams />
          </div>

          <aside className="hidden 2xl:block">
            <div className="rounded-3xl border border-white/10 bg-[#0d1430] p-6 min-h-[330px]">
              <h3 className="text-white font-bold mb-4">Recommended Stream</h3>
              <div className="rounded-2xl bg-blue-500/10 border border-blue-400/20 p-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <FlaskConical className="text-blue-300" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold">Science</h4>
                    <p className="text-emerald-300 text-sm">87% Match</p>
                  </div>
                </div>
                <p className="text-slate-300 text-sm mt-4">
                  Great match! Your interests, aptitude and personality align strongly with Science.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}



