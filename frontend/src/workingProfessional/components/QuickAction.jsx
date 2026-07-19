import React from "react";
import { ArrowRight } from "lucide-react";

export default function QuickAction({
  title,
  description,
  color = "violet",
}) {
  const colors = {
    violet: "from-violet-600 to-sky-500",
    cyan: "from-cyan-500 to-blue-600",
    emerald: "from-emerald-500 to-green-600",
    orange: "from-orange-500 to-red-500",
  };

  return (
    <div className="rounded-[26px] border border-white/10 bg-white/[0.04] p-6 transition hover:border-violet-400/40">

      <div
        className={`inline-flex rounded-2xl bg-gradient-to-r ${colors[color]} px-4 py-2 text-xs font-bold text-white`}
      >
        Recommended
      </div>

      <h3 className="mt-6 text-2xl font-black text-white">
        {title}
      </h3>

      <p className="mt-3 text-slate-400 leading-7">
        {description}
      </p>

      <button className="mt-8 flex items-center gap-2 font-bold text-cyan-300">
        Continue
        <ArrowRight size={18} />
      </button>

    </div>
  );
}
