import { CardProp } from "@/types/interfaces/interfaces";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setWindowWidth } from "./WindowSlice";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

export default function GameCard({img, id}: CardProp) {
    const dispatch = useAppDispatch();
    const [_, setImageUrl] = useState("");

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
        <Link href={`/games/${id}`} key={id}>
            <Card
            sx={{
                backgroundColor: '#6667AB',
                color: 'white',
                width: 280,
                height: 420,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                boxShadow: 4,
                overflow: 'hidden',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6,
                },
            }}
            >
            {img && (
                <CardMedia
                component="img"
                image={img.image}
                alt={img.alt}
                sx={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top',
                }}
                />
            )}
            </Card>
        </Link>
        </>
    );
}