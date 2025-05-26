import React from "react";
import CardSection from "@/components/homeContent/CardSection";
import HeroSection from "@/components/homeContent/HeroSection";

export default function Main() {
    return(
        <>
        <section className="flex flex-col">
            <HeroSection/>
        </section>
        <section>
            <CardSection/>
        </section>
        </>
    );
}