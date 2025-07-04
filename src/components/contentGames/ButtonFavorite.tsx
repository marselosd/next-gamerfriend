"use client";

import React, { useState } from "react";
import { IconButton } from "@mui/material";
import { FaStar, FaRegStar } from "react-icons/fa";
import {
  useGetFavoriteQuery,
  useToggleFavoriteMutation,
} from "./favoriteApi";

interface FavoriteButtonProps {
  gameId: number;
}

const BASE_URL = "http://localhost:8080";

export default function FavoriteButton({ gameId }: FavoriteButtonProps) {
  const { data: favoriteData, isLoading, refetch } = useGetFavoriteQuery({
    id: gameId,
  });

  const [toggleFavorite] = useToggleFavoriteMutation();
  const isFavorite = favoriteData?.favorito === true;
  const token = localStorage.getItem("token");

  const [showRatingInput, setShowRatingInput] = useState(false);
  const [ratingInput, setRatingInput] = useState<number>(5);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const sendReviewAndFavorite = async (ratingNumber: number) => {
    try {
      const reviewPayload = {
        idJogo: gameId,
        rating: ratingNumber,
        comentario: "Avaliação automática para favoritar.",
      };

      const reviewRes = await fetch(`${BASE_URL}/jogos/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reviewPayload),
      });

      if (!reviewRes.ok) throw new Error("Erro ao enviar avaliação");

      const favoritePayload = {
        idJogo: gameId,
        favorito: true,
      };

      const favRes = await fetch(`${BASE_URL}/jogos/favoritos`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(favoritePayload),
      });

      if (!favRes.ok) throw new Error("Erro ao favoritar");

      setShowRatingInput(false);
      setErrorMsg(null);
      refetch();
    } catch (err) {
      console.log(err);
      setErrorMsg("Erro ao favoritar com fallback");
    }
  };

  const handleToggleFavorite = async () => {
    try {
      await toggleFavorite({
        idJogo: gameId,
        favorito: !isFavorite,
      }).unwrap();

      setErrorMsg(null);
      refetch();
    } catch (error) {
      // Se falhar, mostra o input embutido para avaliar antes de favoritar
      console.log(error);
      setShowRatingInput(true);
    }
  };

  const handleConfirmRating = () => {
    if (ratingInput < 1 || ratingInput > 10) {
      setErrorMsg("Nota inválida. Use entre 1 e 10.");
      return;
    }

    sendReviewAndFavorite(ratingInput);
  };

  if (isLoading) return null;

  return (
    <div className="flex flex-col items-start gap-2">
      <IconButton
        aria-label="favorite"
        onClick={handleToggleFavorite}
        sx={{ "&:hover": { color: "gold" } }}
      >
        {isFavorite ? <FaStar color="gold" /> : <FaRegStar />}
      </IconButton>

      {showRatingInput && (
        <div className="w-full max-w-sm px-3 py-2 border border-gray-200 rounded-md shadow-sm bg-white">
          <label htmlFor="nota" className="block text-sm text-gray-700 font-medium mb-1">
            Nota (1 a 10):
          </label>
          <input
            id="nota"
            type="number"
            min={1}
            max={10}
            step={0.5}
            value={ratingInput}
            onChange={(e) => setRatingInput(Number(e.target.value))}
            className="block w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-[#4A4B83] focus:border-[#4A4B83]"
          />
          <button
            onClick={handleConfirmRating}
            className="mt-2 w-full bg-[#4A4B83] hover:bg-[#353660] text-white text-sm py-1.5 rounded transition"
          >
            Avaliar e Favoritar
          </button>
          {errorMsg && (
            <p className="text-red-600 text-xs mt-1">{errorMsg}</p>
          )}
        </div>
      )}
    </div>
  );
}
