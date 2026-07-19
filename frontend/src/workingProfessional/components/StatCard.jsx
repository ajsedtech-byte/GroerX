import React from "react";

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
}) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">

      <div className="mb-5 text-4xl">
        {icon}
      </div>

      <p className="text-sm text-slate-400">
        {title}
      </p>

      <h2 className="mt-2 text-4xl font-black text-white">
        {value}
      </h2>

      <p className="mt-3 text-sm text-slate-400">
        {subtitle}
      </p>

    </div>
  );
}
