'use client';
import React from "react";
import CardShareFav from "../commonCard/CardShareFav";
import { getTranslations } from "@/locales";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function GamesContent() {
    const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage);
    const { cardGames } = getTranslations(currentLanguage);

    return (
        <>
        <CardShareFav 
        cardName={cardGames.title}
        tittle={"Persona 3"} 
        img={{ image: "img/cardGaleria/persona3.jpg", alt: "Persona 3" }}
        id="1"
        >
        {cardGames.desc2} 
        </CardShareFav>

        <CardShareFav 
        cardName={cardGames.title}
        tittle={"Bloodborne"} 
        img={{ image: "img/cardGaleria/bloodborne.jpg", alt: "Bloodborne" }}
        id="2"
        >
        {cardGames.desc} 
        </CardShareFav>
        </>
    );
}