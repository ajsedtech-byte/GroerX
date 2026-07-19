import React from "react";

export default function Roadmap({ career }) {
  if (!career) return null;

  return (
    <section className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">

      <h2 className="text-2xl font-black text-white">
        Career Roadmap
      </h2>

      <div className="space-y-4 mt-6">

        {career.roadmap?.map((step,index)=>(

<div
key={step}
className="flex gap-4 rounded-2xl bg-black/20 p-4"
>

<div className="h-9 w-9 rounded-full bg-violet-600 flex items-center justify-center">

{index+1}

</div>

<p>{step}</p>

</div>

        ))}

      </div>

    </section>
  );
}



