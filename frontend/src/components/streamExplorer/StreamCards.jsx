import React from "react";
import { ArrowRight } from "lucide-react";

export default function StreamCards({
  streams = [],
  selectedStream,
  onSelectStream,
}) {
  return (
    <section>
      <h2 className="mb-5 text-2xl font-black text-white">
        Explore Every Stream
      </h2>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {streams.map((stream) => (
          <div
            key={stream.slug}
            className={`rounded-[26px] p-6 transition ${
              selectedStream?.slug === stream.slug
                ? "border-2 border-violet-500 bg-violet-500/10"
                : "border border-white/10 bg-white/[0.04] hover:border-violet-400/50 hover:bg-white/[0.07]"
            }`}
          >
            <h3 className="text-2xl font-black text-white">
              {stream.name}
            </h3>

            <p className="mt-3 min-h-[70px] text-sm leading-relaxed text-slate-400">
              {stream.shortDescription}
            </p>

            <div className="mt-5">
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-400">Match Score</span>
                <span className="font-bold text-white">
                  {stream.matchScore}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-black/30">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                  style={{ width: `${stream.matchScore}%` }}
                />
              </div>
            </div>

            <button
  onClick={() => {
  localStorage.setItem("selectedStreamSlug", stream.slug);

  if (window.goToCareerExplorer) {
    window.goToCareerExplorer();
  }
}}
  className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 py-3 text-sm font-bold text-white transition hover:bg-violet-500"
>
  Select Stream
  <ArrowRight size={16} />
</button>
          </div>
        ))}
      </div>
    </section>
  );
}



