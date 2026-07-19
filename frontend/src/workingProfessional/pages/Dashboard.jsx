import React from "react";
import ProfessionalLayout from "../layouts/ProfessionalLayout";
import {
  TrendingUp,
  Target,
  Briefcase,
  Brain,
} from "lucide-react";

import StatCard from "../components/StatCard";
import CareerCard from "../components/CareerCard";
import QuickAction from "../components/QuickAction";
import AnalyticsCard from "../components/AnalyticsCard";
import SalaryCard from "../components/SalaryCard";
import JobCard from "../components/JobCard";
import ResumeCard from "../components/ResumeCard";
import InterviewCard from "../components/InterviewCard";
export default function Dashboard() {
  return (
    <ProfessionalLayout>

      <section className="rounded-[34px] border border-white/10 bg-gradient-to-br from-violet-950/70 via-[#0a0f24] to-[#081221] p-10">

        <p className="text-sm font-bold uppercase tracking-wider text-cyan-300">
          Working Professional Career OS
        </p>

        <h1 className="mt-5 max-w-4xl text-6xl font-black leading-tight text-white">

          Build your next
          <br />

          career move with AI.

        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">

          Analyze your experience, discover better roles,
          increase salary, identify skill gaps and
          prepare for interviews with GroerX AI.

        </p>

      </section>
      <section className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
  <StatCard
    icon={<Target />}
    title="Career Readiness"
    value="84%"
    subtitle="Ready for senior roles"
  />

  <StatCard
    icon={<TrendingUp />}
    title="Salary Growth"
    value="2.1X"
    subtitle="Potential in next 18 months"
  />

  <StatCard
    icon={<Briefcase />}
    title="Jobs Matched"
    value="186"
    subtitle="Based on your profile"
  />

  <StatCard
    icon={<Brain />}
    title="Skill Gap"
    value="7"
    subtitle="Skills to become AI-ready"
  />
</section>
<section className="mt-8">
  <CareerCard />
</section>
<section className="mt-10">
  <h2 className="mb-6 text-3xl font-black text-white">
    Recommended Next Actions
  </h2>

  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
    <QuickAction
      color="violet"
      title="Skill Gap Analysis"
      description="Discover which skills are stopping your next promotion."
    />

    <QuickAction
      color="cyan"
      title="Resume Builder"
      description="Increase your ATS score and improve recruiter visibility."
    />

    <QuickAction
      color="emerald"
      title="Job Explorer"
      description="186 new jobs match your profile today."
    />

    <QuickAction
      color="orange"
      title="Interview Prep"
      description="Practice AI-powered mock interviews before applying."
    />
  </div>
</section>
<section className="mt-10 grid gap-6 xl:grid-cols-2">
  <AnalyticsCard />
  <SalaryCard />
</section>

<section className="mt-10 grid gap-6 xl:grid-cols-[1fr_360px]">
  <JobCard />

  <div className="space-y-6">
    <ResumeCard />
    <InterviewCard />
  </div>
</section>

    </ProfessionalLayout>
  );
}
