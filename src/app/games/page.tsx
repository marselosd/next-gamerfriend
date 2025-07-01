import GamesContent from "@/components/gamesContent/GamesContent";
import React from "react";

export default function Games() {
  return (
    <main className="bg-white min-h-screen">
    <section className="flex flex-col gap-6 px-4 py-8 max-w-7xl mx-auto">
      <GamesContent />
    </section>
    </main>
  );
}
