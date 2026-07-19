import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

const iconMap = {
  Technology: "💻",
  Engineering: "⚙️",
  Healthcare: "⚕️",
  Finance: "📊",
  Law: "⚖️",
  Design: "🎨",
  Government: "🏛️",
};

export default function CareerCards({
  careers = [],
  selectedCareer,
  setSelectedCareer,
}) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(careers.map((career) => career.category).filter(Boolean)),
  ];

  const visibleCareers =
    activeCategory === "All"
      ? careers
      : careers.filter((career) => career.category === activeCategory);

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-black text-white">
          Best Career Matches
        </h2>

        <span className="rounded-full bg-violet-600/20 px-4 py-2 text-sm font-semibold text-violet-300">
          {visibleCareers.length} Careers
        </span>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              activeCategory === category
                ? "border-violet-500 bg-violet-500/20 text-white"
                : "border-white/10 text-slate-300 hover:border-violet-500 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visibleCareers.map((career, index) => {
          const active = selectedCareer?.slug === career.slug;
          const icon = iconMap[career.category] || "🚀";

          return (
            <div
              key={career.slug}
              onClick={() => setSelectedCareer(career)}
              className={`relative cursor-pointer rounded-[28px] p-6 transition ${
                active
                  ? "scale-[1.02] border-2 border-violet-500 bg-violet-500/10 shadow-xl shadow-violet-900/30"
                  : "border border-white/10 bg-white/[0.04] hover:border-violet-400/50 hover:bg-white/[0.07]"
              }`}
            >
              {index === 0 && activeCategory === "All" && (
                <span className="absolute right-4 top-4 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300">
                  Recommended
                </span>
              )}

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-3xl">
                {icon}
              </div>

              <h3 className="mt-5 text-2xl font-black text-white">
                {career.title}
              </h3>

              <p className="mt-1 text-sm text-cyan-300">{career.category}</p>

              <p className="mt-3 min-h-[55px] text-sm leading-relaxed text-slate-400">
                {career.shortDescription}
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-black/25 p-3">
                  <p className="text-xs text-slate-400">Salary</p>
                  <p className="mt-1 text-sm font-bold text-white">
                    {career.averageSalary}
                  </p>
                </div>

                <div className="rounded-2xl bg-black/25 p-3">
                  <p className="text-xs text-slate-400">Demand</p>
                  <p className="mt-1 text-sm font-bold text-white">
                    {career.futureDemand}%
                  </p>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCareer(career);
                }}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 py-3 text-sm font-bold text-white hover:bg-violet-500"
              >
                {active ? "Selected" : "View Details"} <ArrowRight size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}



