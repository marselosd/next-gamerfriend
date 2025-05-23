import { CommonCardProp } from "@/types/interfaces/interfaces";
import React from "react";
import CommonFavorite from "../commonFavorite/CommonFavorite";
import CommonShare from "../commonShare/CommonShare";
import CommonCard from "./CommonCard";

export default function CardShareFav({ cardName, tittle, children, img, id}: CommonCardProp) {
    return(
        <>
        <div>
            <CommonCard cardName={cardName} tittle={tittle}img={img}>
                {children}
                <CommonFavorite itemId={id ? id : ""} />
                <CommonShare shareUrl={img ? `${window.location.origin}/${img.image}` : window.location.href} />
            </CommonCard>
        </div>
        </>
    );
}