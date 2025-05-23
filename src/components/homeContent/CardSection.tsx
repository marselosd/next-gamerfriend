'use client';
import CommonCard from "@/components/commonCard/CommonCard";
import { getTranslations } from "@/locales";
import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";

export default function CardSection() {
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage);
  const { hero_card } = getTranslations(currentLanguage);

  return (
    <>
    <div className="flex flex-col md:flex-row justify-center items-stretch gap-3 px-3 py-5">
        <CommonCard
            cardName={hero_card.cardName}
            tittle={hero_card.cardTittle1}
            children={hero_card.cardChildren1}
        />
        <CommonCard
            cardName={hero_card.cardName}
            tittle={hero_card.cardTittle2}
            children={hero_card.cardChildren2}
        />
        <CommonCard
            cardName={hero_card.cardName}
            tittle={hero_card.cardTittle3}
            children={hero_card.cardChildren3}
        />
    </div>
    </>
  )
}