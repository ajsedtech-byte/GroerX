import React from "react";

const skills = [
  { name: "Leadership", value: 78 },
  { name: "Communication", value: 91 },
  { name: "Problem Solving", value: 86 },
  { name: "Technical Skills", value: 73 },
  { name: "Interview Readiness", value: 68 },
];

export default function AnalyticsCard() {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-7">
      <h2 className="text-2xl font-black text-white">Career Analytics</h2>
      <p className="mt-2 text-slate-400">
        Your professional growth across key competencies.
      </p>

      <div className="mt-8 space-y-6">
        {skills.map((skill) => (
          <div key={skill.name}>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-slate-300">{skill.name}</span>
              <span className="font-bold text-white">{skill.value}%</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-black/30">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                style={{ width: `${skill.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

