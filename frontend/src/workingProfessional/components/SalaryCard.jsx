import React from "react";
import { TrendingUp } from "lucide-react";

const salaryTimeline = [
  { label: "Now", value: "₹7L" },
  { label: "6M", value: "₹9L" },
  { label: "12M", value: "₹12L" },
  { label: "24M", value: "₹18L" },
];

export default function SalaryCard() {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-7">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white">Salary Projection</h2>
          <p className="mt-2 text-slate-400">
            Expected growth after focused upskilling.
          </p>
        </div>

        <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-300">
          <TrendingUp size={26} />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-4 gap-3">
        {salaryTimeline.map((item) => (
          <div key={item.label} className="rounded-2xl bg-black/25 p-4 text-center">
            <p className="text-xs text-slate-400">{item.label}</p>
            <h3 className="mt-2 text-2xl font-black text-white">{item.value}</h3>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl bg-emerald-500/10 p-4">
        <p className="text-sm text-emerald-300">
          Upskilling in AI tools, product thinking and stakeholder communication
          can improve your salary potential by 2.1x.
        </p>
      </div>
    </div>
  );
}
