import React from "react";
import SessionGuard from "../SessionGuard";
import PageAllGames from "@/components/contentGames/PageAllGames";

export default function Games() {
  return (
    <main className="bg-white min-h-screen">
    <section className="flex flex-col gap-6 px-4 py-8 max-w-7xl mx-auto">
      <SessionGuard>
        <PageAllGames />
      </SessionGuard>
    </section>
    </main>
  );
}
