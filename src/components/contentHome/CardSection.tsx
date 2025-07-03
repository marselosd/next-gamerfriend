'use client';
import TripleInfoCard from "@/components/commonCard/TripleInfoCard";
import { getTranslations } from "@/locales";
import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";

export default function CardSection() {
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage);
  const { hero_card } = getTranslations(currentLanguage);

  return (
    <div className="bg-white py-10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 px-4">
          <TripleInfoCard
            cardName={hero_card.cardName}
            tittle={hero_card.cardTitle1}
            subTitle={hero_card.subTitle1}
            info1={hero_card.info1_1}
            info2={hero_card.info1_2}
            info3={hero_card.info1_3}
            highlight={hero_card.highlight1}
          />

          <TripleInfoCard
            cardName={hero_card.cardName}
            tittle={hero_card.cardTitle2}
            subTitle={hero_card.subTitle2}
            info1={hero_card.info2_1}
            info2={hero_card.info2_2}
            info3={hero_card.info2_3}
            highlight={hero_card.highlight2}
          />

          <TripleInfoCard
            cardName={hero_card.cardName}
            tittle={hero_card.cardTitle3}
            subTitle={hero_card.subTitle3}
            info1={hero_card.info3_1}
            info2={hero_card.info3_2}
            info3={hero_card.info3_3}
            highlight={hero_card.highlight3}
          />
        </div>
      </div>
    </div>
  );
}
