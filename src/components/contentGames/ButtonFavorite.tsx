'use client';

import { IconButton } from "@mui/material";
import { FaStar, FaRegStar } from "react-icons/fa";
import {
  useGetFavoriteQuery,
  useToggleFavoriteMutation,
} from "./favoriteApi";

interface FavoriteButtonProps {
  gameId: number;
}

export default function FavoriteButton({ gameId }: FavoriteButtonProps) {
  // Obtém o status atual do favorito da API
  const {
    data: favoriteData,
    isLoading: isLoadingFavorite,
    refetch,
  } = useGetFavoriteQuery({ id: gameId });

  // Mutation para alternar favorito
  const [toggleFavorite, { isLoading: isToggling }] = useToggleFavoriteMutation();

  const isFavorite = favoriteData?.favorito === true;

  // Lida com o clique no botão
  const handleToggleFavorite = async () => {
    try {
      await toggleFavorite({
        idJogo: gameId,
        favorito: !isFavorite, // inverte o valor atual
      }).unwrap();
      refetch(); // atualiza o status do favorito após a alteração
    } catch (error) {
      console.error("Erro ao alternar favorito:", error);
    }
  };

  // Se ainda está carregando, não renderiza nada
  if (isLoadingFavorite) return null;

  return (
    <IconButton
      aria-label="favorite"
      onClick={handleToggleFavorite}
      disabled={isToggling}
      sx={{ "&:hover": { color: "gold" } }}
    >
      {isFavorite ? <FaStar color="gold" /> : <FaRegStar />}
    </IconButton>
  );
}
