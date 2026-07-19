import React from "react";
import { Mic } from "lucide-react";

export default function InterviewCard() {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-7">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white">Interview Readiness</h2>
          <p className="mt-2 text-slate-400">Practice needed before applying.</p>
        </div>

        <Mic className="text-orange-300" size={28} />
      </div>

      <div className="mt-7">
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-slate-300">Overall Readiness</span>
          <span className="font-bold text-white">64%</span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-black/30">
          <div className="h-full rounded-full bg-gradient-to-r from-orange-500 to-red-500" style={{ width: "64%" }} />
        </div>
      </div>

      <div className="mt-6 space-y-3 text-sm text-slate-300">
        <p>🎯 Practice product case questions</p>
        <p>🎤 Improve answer structure</p>
        <p>🧠 Prepare behavioral stories</p>
      </div>
    </div>
  );
}


