import React from "react";
import { Briefcase, MapPin } from "lucide-react";

const jobs = [
  {
    role: "Product Manager",
    company: "Razorpay",
    location: "Bangalore / Hybrid",
    salary: "₹18L - ₹32L",
    match: 91,
  },
  {
    role: "Business Analyst",
    company: "Zomato",
    location: "Gurugram / On-site",
    salary: "₹10L - ₹18L",
    match: 88,
  },
  {
    role: "Customer Success Manager",
    company: "Freshworks",
    location: "Remote",
    salary: "₹12L - ₹22L",
    match: 84,
  },
];

export default function JobCard() {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-7">
      <h2 className="text-2xl font-black text-white">Recommended Jobs</h2>
      <p className="mt-2 text-slate-400">
        Roles matching your current profile and target direction.
      </p>

      <div className="mt-6 space-y-4">
        {jobs.map((job) => (
          <div
            key={job.role}
            className="rounded-2xl border border-white/10 bg-black/20 p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-black text-white">{job.role}</h3>
                <p className="mt-1 text-sm text-slate-400">{job.company}</p>
              </div>

              <span className="rounded-full bg-violet-500/20 px-3 py-1 text-xs font-bold text-violet-300">
                {job.match}% Match
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-300">
              <span className="flex items-center gap-2">
                <MapPin size={15} /> {job.location}
              </span>
              <span className="flex items-center gap-2">
                <Briefcase size={15} /> {job.salary}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


