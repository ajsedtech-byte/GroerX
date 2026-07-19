import React from "react";
import { ArrowRight } from "lucide-react";

import Sidebar from "../components/layout/Sidebar.jsx";
import useStreams from "../hooks/useStreams";

import HeroBanner from "../components/streamExplorer/HeroBanner.jsx";
import RecommendedStream from "../components/streamExplorer/RecommendedStream.jsx";
import StreamCards from "../components/streamExplorer/StreamCards.jsx";
import WhyThisStream from "../components/streamExplorer/WhyThisStream.jsx";
import SubjectExplorer from "../components/streamExplorer/SubjectExplorer.jsx";
import CareerPaths from "../components/streamExplorer/CareerPaths.jsx";

function Header() {
  return (
    <header className="mb-6">
      <p className="text-sm text-slate-400">
        Dashboard &gt; Career Assessment &gt; Stream Explorer
      </p>

      <h1 className="mt-3 text-3xl font-black text-white">
        Stream Explorer
      </h1>

      <p className="mt-2 text-slate-400">
        Explore Class 11 stream options based on your assessment results.
      </p>
    </header>
  );
}

export default function StreamExplorer() {
  const {
    streams,
    selectedStream,
    setSelectedStream,
    loading,
    error,
  } = useStreams();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050a18] text-white">
        <Sidebar />
        <main className="min-h-screen px-4 py-5 lg:ml-[252px] lg:px-8">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-8">
            Loading Stream Explorer...
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#050a18] text-white">
        <Sidebar />
        <main className="min-h-screen px-4 py-5 lg:ml-[252px] lg:px-8">
          <div className="rounded-[28px] border border-red-400/30 bg-red-500/10 p-8 text-red-200">
            {error}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050a18] text-white">
      <Sidebar />

      <main className="min-h-screen px-4 py-5 lg:ml-[252px] lg:px-8">
        <Header />

        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <HeroBanner recommended={selectedStream} />

            <StreamCards
              streams={streams}
              selectedStream={selectedStream}
              onSelectStream={setSelectedStream}
            />

            <WhyThisStream stream={selectedStream} />
            <SubjectExplorer stream={selectedStream} />
            <CareerPaths stream={selectedStream} />
          </div>

          <aside className="space-y-6">
            <RecommendedStream recommended={selectedStream} />

            <section className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
              <h2 className="text-xl font-black text-white">What’s Next?</h2>

              <div className="mt-5 space-y-4">
                {[
                  "Compare all streams",
                  "Explore subjects",
                  "View career paths",
                  "Create Class 11 roadmap",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-2xl bg-white/[0.04] p-4 text-sm text-slate-200"
                  >
                    {item}
                    <ArrowRight size={16} />
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}



