import React from "react";
import { FileText } from "lucide-react";

export default function ResumeCard() {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-7">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white">Resume Score</h2>
          <p className="mt-2 text-slate-400">ATS and recruiter readiness.</p>
        </div>

        <FileText className="text-cyan-300" size={28} />
      </div>

      <div className="mt-7 flex items-end gap-3">
        <h3 className="text-6xl font-black text-white">72</h3>
        <p className="pb-2 text-slate-400">/100</p>
      </div>

      <div className="mt-6 space-y-3 text-sm text-slate-300">
        <p>✅ Good work experience structure</p>
        <p>⚠️ Add quantified achievements</p>
        <p>⚠️ Add target-role keywords</p>
      </div>

      <button className="mt-6 w-full rounded-2xl bg-violet-600 py-3 font-bold text-white">
        Improve Resume
      </button>
    </div>
  );
}


