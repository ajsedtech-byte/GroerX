import React from "react";
export default function WhyThisStream({ stream }) {
  if (!stream) return null;

  return (
    <div className="bg-slate-800 p-6 rounded-xl text-white">
      <h2 className="text-2xl font-bold">Why This Stream</h2>

      <div className="mt-4 space-y-2">
        {stream.whyRecommended?.map((item) => (
          <p key={item}>✅ {item}</p>
        ))}
      </div>
    </div>
  );
}

