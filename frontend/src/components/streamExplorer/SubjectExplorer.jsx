import React from "react";

export default function SubjectExplorer({ stream }) {

  if (!stream) return null;

  return (

    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">

      <h2 className="text-2xl font-bold text-white">
        Subjects You'll Study
      </h2>

      <div className="grid lg:grid-cols-2 gap-8 mt-6">

        <div>

          <h3 className="font-semibold text-cyan-300 mb-4">
            Class 11
          </h3>

          <div className="space-y-4">

            {stream.subjectsClass11?.map((subject) => (

              <div
                key={subject.name}
                className="rounded-xl bg-white/[0.05] p-4"
              >

                <h4 className="font-semibold text-white">
                  {subject.name}
                </h4>

                <p className="text-slate-400 text-sm mt-2">
                  {subject.description}
                </p>

              </div>

            ))}

          </div>

        </div>

        <div>

          <h3 className="font-semibold text-cyan-300 mb-4">
            Class 12
          </h3>

          <div className="space-y-4">

            {stream.subjectsClass12?.map((subject) => (

              <div
                key={subject.name}
                className="rounded-xl bg-white/[0.05] p-4"
              >

                <h4 className="font-semibold text-white">
                  {subject.name}
                </h4>

                <p className="text-slate-400 text-sm mt-2">
                  {subject.description}
                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  );

}

