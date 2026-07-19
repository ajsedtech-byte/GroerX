import React from "react";
import {
  ArrowRight,
  Briefcase,
  TrendingUp,
  Target,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

import ProfessionalLayout from "../layouts/ProfessionalLayout";

const careerDirections = [
  {
    role: "Product Manager",
    match: 92,
    salary: "₹18 - ₹35 LPA",
    demand: "Very High",
    timeline: "6 - 9 Months",
    skills: ["Product Strategy", "Roadmapping", "User Research"],
  },
  {
    role: "Business Analyst",
    match: 88,
    salary: "₹9 - ₹18 LPA",
    demand: "High",
    timeline: "3 - 6 Months",
    skills: ["SQL", "Excel", "Data Analysis"],
  },
  {
    role: "Customer Success Manager",
    match: 84,
    salary: "₹10 - ₹22 LPA",
    demand: "High",
    timeline: "4 - 7 Months",
    skills: ["Client Handling", "Communication", "SaaS"],
  },
];

export default function CareerDirection() {
  return (
    <ProfessionalLayout>
      <section className="rounded-[34px] border border-white/10 bg-gradient-to-br from-violet-950/70 via-[#0a0f24] to-[#081221] p-10">
        <p className="text-sm font-bold uppercase tracking-wider text-cyan-300">
          Career Direction Results
        </p>

        <h1 className="mt-5 max-w-4xl text-5xl font-black leading-tight text-white">
          Your best career direction is{" "}
          <span className="text-transparent bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text">
            Product Manager
          </span>
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
          Based on your experience, communication strength, business exposure,
          salary goal and learning capacity, GroerX recommends Product
          Management as your strongest next career path.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-[24px] bg-white/[0.05] p-5">
            <Target className="text-violet-300" />
            <p className="mt-4 text-sm text-slate-400">Career Fit</p>
            <h2 className="mt-1 text-3xl font-black text-white">92%</h2>
          </div>

          <div className="rounded-[24px] bg-white/[0.05] p-5">
            <TrendingUp className="text-emerald-300" />
            <p className="mt-4 text-sm text-slate-400">Salary Potential</p>
            <h2 className="mt-1 text-3xl font-black text-white">₹35 LPA</h2>
          </div>

          <div className="rounded-[24px] bg-white/[0.05] p-5">
            <Briefcase className="text-cyan-300" />
            <p className="mt-4 text-sm text-slate-400">Transition Time</p>
            <h2 className="mt-1 text-3xl font-black text-white">6-9M</h2>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-7">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-white">
                Recommended Career Directions
              </h2>
              <p className="mt-2 text-slate-400">
                Top roles that match your profile and growth goals.
              </p>
            </div>

            <Sparkles className="text-violet-300" />
          </div>

          <div className="mt-7 space-y-5">
            {careerDirections.map((career, index) => (
              <div
                key={career.role}
                className="rounded-[24px] border border-white/10 bg-black/20 p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-violet-300">
                      #{index + 1} Recommended
                    </p>
                    <h3 className="mt-2 text-2xl font-black text-white">
                      {career.role}
                    </h3>
                    <p className="mt-2 text-sm text-slate-400">
                      Salary: {career.salary} • Demand: {career.demand}
                    </p>
                  </div>

                  <span className="rounded-full bg-emerald-500/15 px-4 py-2 text-sm font-bold text-emerald-300">
                    {career.match}% Match
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  {career.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-violet-500/15 px-3 py-1 text-xs font-bold text-violet-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <button className="mt-5 flex items-center gap-2 rounded-2xl bg-violet-600 px-5 py-3 text-sm font-bold text-white hover:bg-violet-500">
                  View Career Path <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-xl font-black text-white">
              Why Product Manager?
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Strong communication and business understanding",
                "Good fit with your current experience",
                "High salary growth potential",
                "Strong demand in startups and tech companies",
              ].map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-2xl bg-black/25 p-4 text-sm text-slate-300"
                >
                  <CheckCircle2 size={18} className="text-emerald-300" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-xl font-black text-white">
              Next Best Actions
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Start Skill Gap Analysis",
                "Build Product Case Study",
                "Improve Resume for PM roles",
                "Practice Product Interviews",
              ].map((item) => (
                <button
                  key={item}
                  className="flex w-full items-center justify-between rounded-2xl bg-black/25 p-4 text-sm font-bold text-slate-200"
                >
                  {item}
                  <ArrowRight size={16} />
                </button>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </ProfessionalLayout>
  );
}
