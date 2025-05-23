import GamesContent from "@/components/gamesContent/GamesContent";
import React from "react";

export default function Games() {
    return(
        <>
        <section className="flex flex-col md:flex-row justify-center items-stretch gap-3 px-3 py-5">
            <GamesContent/>
        </section>
        </>
    );
}