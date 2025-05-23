'use client';
import React from "react";
import { IconButton } from "@mui/material";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toggleFavorite } from "./FavoritesSlice";

interface Props {
  itemId: string;
};

export default function CommonFavorite({itemId} : Props) {
    const dispatch = useAppDispatch();
    const isFavorite = useAppSelector(state => state.favorites.items.includes(itemId));

    const handleClick = () => {
        dispatch(toggleFavorite(itemId));
    };

    return (
        <>
        <IconButton aria-label="favorite" onClick={handleClick}>
            {isFavorite ? <FaStar color="gold" /> : <FaRegStar />}
        </IconButton>
        </>
    );
}