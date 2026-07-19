import React from "react";

export default function RightSidebar({ career }) {
  if (!career) return null;

  return (
    <aside className="space-y-6">

      <section className="rounded-[28px] border border-emerald-400/20 bg-emerald-400/10 p-6">

        <p className="text-sm text-emerald-300">

Recommended Career

</p>

<h2 className="mt-3 text-3xl font-black">

{career.title}

</h2>

<p className="mt-2">

{career.matchScore}% Match

</p>

</section>

<section className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">

<h2 className="text-xl font-black">

Degrees

</h2>

<div className="space-y-3 mt-5">

{career.degrees?.map(degree=>(

<div
key={degree}
className="rounded-xl bg-black/25 p-3"
>

{degree}

</div>

))}

</div>

</section>

<section className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">

<h2 className="text-xl font-black">

Entrance Exams

</h2>

<div className="space-y-3 mt-5">

{career.entranceExams?.map(exam=>(

<div
key={exam}
className="rounded-xl bg-black/25 p-3"
>

{exam}

</div>

))}

</div>

</section>

</aside>
  );
}



