import { CardProp } from "@/types/interfaces/interfaces";
import React, { useEffect, useState } from "react";
import CommonShare from "../commonShare/CommonShare";
import CommonCard from "./CommonCard";
import { useAppDispatch } from "@/redux/hooks";
import { setWindowWidth } from "./WindowSlice";

export default function CardShare({ cardName, tittle, children, img, id}: CardProp) {
    const dispatch = useAppDispatch();
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            dispatch(setWindowWidth(window.innerWidth))

            const base = window.location.origin;
            const fullUrl = img ? `${base}/${img.image}` : window.location.href;
            setImageUrl(fullUrl);
        }
    }, [dispatch, img])
    
    return(
        <>
        <div>
            <CommonCard cardName={cardName} tittle={tittle}img={img}>
                {children}
                <br/>
                <CommonShare shareUrl={imageUrl}/>
            </CommonCard>
        </div>
        </>
    );
}