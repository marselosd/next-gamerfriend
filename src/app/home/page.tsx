import React from "react";
import CardSection from "@/components/contentHome/CardSection";
import HeroSection from "@/components/contentHome/HeroSection";

export default function Main() {
    return (
        <main className="bg-white min-h-screen">
            <section className="flex flex-col">
                <HeroSection />
            </section>
            
            <section className="py-8">
                <CardSection />
            </section>
        </main>
    );
}