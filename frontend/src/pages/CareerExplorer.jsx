import React from "react";

import Sidebar from "../components/layout/Sidebar.jsx";

import Hero from "../components/careerExplorer/Hero.jsx";
import SearchBar from "../components/careerExplorer/SearchBar.jsx";
import CareerCards from "../components/careerExplorer/CareerCards.jsx";
import CareerDetails from "../components/careerExplorer/CareerDetails.jsx";
import Roadmap from "../components/careerExplorer/Roadmap.jsx";
import RightSidebar from "../components/careerExplorer/RightSidebar.jsx";

import useCareers from "../hooks/useCareers.js";

export default function CareerExplorer() {
  const {
  careers,
  filteredCareers,
  selectedCareer,
  setSelectedCareer,
  streamSlug,
  search,
  setSearch,
  loading,
  error,
} = useCareers();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050a18] text-white">
        <Sidebar />

        <main className="lg:ml-[252px] p-8">
          Loading Career Explorer...
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#050a18] text-white">
        <Sidebar />

        <main className="lg:ml-[252px] p-8">
          <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-8">
            {error}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050a18] text-white">
      <Sidebar />

      <main className="lg:ml-[252px] p-6">

        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">

          <div className="space-y-6">

            <Hero
              selectedCareer={selectedCareer}
              streamSlug={streamSlug}
            />

            <SearchBar search={search} setSearch={setSearch} />

            <CareerCards
  careers={filteredCareers}
  selectedCareer={selectedCareer}
  setSelectedCareer={setSelectedCareer}
/>

            <CareerDetails
              career={selectedCareer}
            />

            <Roadmap
              career={selectedCareer}
            />

          </div>

          <RightSidebar
            career={selectedCareer}
          />

        </div>

      </main>

    </div>
  );
}



