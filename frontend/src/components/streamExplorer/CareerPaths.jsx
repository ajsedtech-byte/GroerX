import React from "react";

export default function CareerPaths({ stream }) {

  if (!stream) return null;

  return (

    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">

      <h2 className="text-2xl font-bold text-white">
        Career Opportunities
      </h2>

      <div className="grid lg:grid-cols-2 gap-6 mt-6">

        {stream.careers?.map((career) => (

          <div
            key={career.title}
            className="rounded-2xl bg-white/[0.05] p-5"
          >

            <h3 className="text-xl font-semibold text-white">
              {career.title}
            </h3>

            <p className="text-slate-400 mt-2">
              {career.description}
            </p>

            <div className="mt-4">

              <div className="text-green-400">
                Salary
              </div>

              <div className="font-semibold text-white">
                {career.averageSalary}
              </div>

            </div>

            <div className="mt-4">

              <div className="text-cyan-400">
                Future Demand
              </div>

              <div className="font-bold text-white">
                {career.futureDemand}%
              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}



