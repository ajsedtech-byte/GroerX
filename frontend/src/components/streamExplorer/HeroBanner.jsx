import React from "react";
export default function HeroBanner({ recommended }) {
  if (!recommended) {
    return (
      <div className="p-8 rounded-xl bg-red-500 text-white">
        No recommendation received
      </div>
    );
  }

  return (
    <div className="p-10 rounded-3xl bg-[#1B1744] text-white">
      <h1 className="text-6xl font-bold">
        {recommended.name}
      </h1>

      <p className="mt-6">
        {recommended.shortDescription}
      </p>
    </div>
  );
}

