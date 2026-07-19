import React from "react";
import { Sparkles } from "lucide-react";

export default function Hero({ selectedCareer, streamSlug }) {
  return (
    <section className="rounded-[32px] border border-white/10 bg-gradient-to-br from-violet-950/70 to-slate-950 p-8 text-white">
      <p className="text-sm font-semibold text-cyan-300">Career Explorer</p>

      <h1 className="mt-3 max-w-2xl text-4xl font-black leading-tight md:text-5xl">
        Discover careers that match your stream.
      </h1>

      <p className="mt-4 max-w-2xl text-slate-300">
        Explore careers, salaries, future demand, skills, exams and roadmap.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <span className="rounded-full bg-violet-500/20 px-4 py-2 text-sm text-violet-200">
          Stream: {streamSlug}
        </span>

        {selectedCareer && (
          <span className="rounded-full bg-emerald-500/20 px-4 py-2 text-sm text-emerald-200">
            Top Career: {selectedCareer.title}
          </span>
        )}
      </div>

      <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5">
        <Sparkles className="text-cyan-300" size={30} />
        <p className="mt-3 text-sm text-slate-300">
          GroerX ranks careers using stream fit, skill match, salary potential and future demand.
        </p>
      </div>
    </section>
  );
}

