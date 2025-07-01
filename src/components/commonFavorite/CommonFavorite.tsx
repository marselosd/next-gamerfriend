'use client';
import React from "react";
import { IconButton } from "@mui/material";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toggleFavorite } from "@/redux/thunk/favoritesThunk";

interface Props {
  itemId: number;
};

export default function CommonFavorite({itemId} : Props) {
    const dispatch = useAppDispatch();
    const favorites = useAppSelector(state => state.auth.items);

    const isFavorite = favorites.includes(String(itemId));

    const handleToggleFavorite = () => {
        dispatch(toggleFavorite(String(itemId)));
    };

    return (
        <>
        <IconButton aria-label="favorite" onClick={handleToggleFavorite}>
            {isFavorite ? <FaStar color="gold" /> : <FaRegStar />}
        </IconButton>
        </>
    );
}