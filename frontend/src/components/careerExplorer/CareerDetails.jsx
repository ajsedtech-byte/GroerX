import React from "react";
import { Clock, TrendingUp, Wallet, BarChart3 } from "lucide-react";

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl bg-black/25 p-5">
      <Icon className="text-cyan-300" size={24} />
      <p className="mt-3 text-sm text-slate-400">{label}</p>
      <h3 className="mt-1 text-xl font-black text-white">{value || "Not specified"}</h3>
    </div>
  );
}

export default function CareerDetails({ career }) {
  if (!career) return null;

  return (
    <section className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
      <h2 className="text-3xl font-black text-white">{career.title}</h2>

      <p className="mt-3 leading-relaxed text-slate-300">
        {career.longDescription}
      </p>

      <div className="mt-7 grid gap-5 md:grid-cols-4">
        <StatCard icon={Wallet} label="Average Salary" value={career.averageSalary} />
        <StatCard icon={TrendingUp} label="Future Demand" value={`${career.futureDemand}%`} />
        <StatCard icon={BarChart3} label="Difficulty" value={career.difficultyLevel} />
        <StatCard icon={Clock} label="Study Duration" value={career.studyYears} />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="text-xl font-black text-white">Required Skills</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {career.requiredSkills?.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-black text-white">Subjects Needed</h3>
          <div className="mt-8">

<h3 className="text-xl font-black text-white">
Entrance Exams
</h3>

<div className="mt-4 flex flex-wrap gap-3">

{career.entranceExams?.map(exam=>(

<span
key={exam}
className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300"
>

{exam}

</span>

))}

</div>

</div>
<div className="mt-8">

<h3 className="text-xl font-black text-white">
Degrees
</h3>

<div className="mt-4 flex flex-wrap gap-3">

{career.degrees?.map(degree=>(

<span
key={degree}
className="rounded-full bg-orange-500/10 px-4 py-2 text-sm text-orange-300"
>

{degree}

</span>

))}

</div>

</div>
          <div className="mt-4 flex flex-wrap gap-3">
            {career.subjectsNeeded?.map((subject) => (
              <span
                key={subject}
                className="rounded-full bg-violet-400/10 px-4 py-2 text-sm text-violet-200"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-emerald-500/10 p-5">
          <h3 className="text-xl font-black text-white">Pros</h3>
          <div className="mt-4 space-y-3">
            {career.pros?.map((item) => (
              <p key={item} className="text-sm text-slate-300">
                ✅ {item}
              </p>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-orange-500/10 p-5">
          <h3 className="text-xl font-black text-white">Reality Check</h3>
          <div className="mt-4 space-y-3">
            {career.cons?.map((item) => (
              <p key={item} className="text-sm text-slate-300">
                ⚠️ {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

