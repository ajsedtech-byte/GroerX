import React from "react";
import { ArrowRight } from "lucide-react";

export default function CareerCard() {
  return (
    <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-8">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-semibold text-cyan-300">
            Career Health
          </p>

          <h2 className="mt-2 text-3xl font-black text-white">
            You're on the right track 🚀
          </h2>

        </div>

        <div className="rounded-full bg-green-500/20 px-5 py-2 text-lg font-bold text-green-400">
          84%
        </div>

      </div>

      <p className="mt-6 max-w-2xl text-slate-400 leading-8">

        Based on your experience, current skills,
        salary progression and market demand,
        GroerX predicts excellent long-term growth.

      </p>

      <div className="mt-8 flex gap-4">

        <button className="rounded-2xl bg-violet-600 px-6 py-3 font-bold hover:bg-violet-500">

          View Report

        </button>

        <button className="flex items-center gap-2 rounded-2xl border border-white/10 px-6 py-3 font-bold">

          Career Roadmap

          <ArrowRight size={18}/>

        </button>

      </div>

    </div>
  );
}



