import React from "react";
import { CheckCircle2 } from "lucide-react";

export default function RecommendedStream({ recommended }) {
  if (!recommended) return null;

  return (
    <section className="rounded-[28px] border border-emerald-400/30 bg-emerald-400/10 p-6">
      <p className="text-sm font-bold text-emerald-300">Recommended Stream</p>

      <h2 className="mt-4 text-4xl font-black text-white">
        {recommended.name}
      </h2>

      <p className="mt-2 text-emerald-300">
        {recommended.recommendationLevel} • {recommended.matchScore}% Match
      </p>

      <p className="mt-5 leading-relaxed text-slate-300">
        {recommended.recommendationReason}
      </p>

      <div className="mt-6 space-y-3">
        {recommended.whyRecommended?.map((reason) => (
          <div key={reason} className="flex items-start gap-3 text-sm text-slate-200">
            <CheckCircle2 size={18} className="mt-0.5 text-emerald-300" />
            {reason}
          </div>
        ))}
      </div>
    </section>
  );
}



