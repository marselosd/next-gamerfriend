'use client';

import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { fetchFavorites } from "@/redux/thunk/favoritesThunk";
import CardShare from "../commonCard/CardShare";
import { GamePayloadReturn } from "@/types/interfaces/interfaces";

export default function ProfileContent() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const favorites = useAppSelector(state => state.auth.items);
  const [favoritesData, setFavoritesData] = useState<GamePayloadReturn[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.email) {
      dispatch(fetchFavorites());
    }
  }, [user, dispatch]);

  useEffect(() => {
    async function loadFavoritesData() {
      if (favorites.length === 0) {
        setFavoritesData([]);
        return;
      }
      setLoading(true);
      try {
        const gamesData = await Promise.all(
          favorites.map(async (guid: string) => {
            const resGame = await fetch(`/api/giantbomb/game/${guid}`);
            const dataGame = await resGame.json();
            return dataGame.results;
          })
        );
        setFavoritesData(gamesData);
      } catch (error) {
        console.error("Erro ao carregar dados dos favoritos:", error);
      } finally {
        setLoading(false);
      }
    }
    loadFavoritesData();
  }, [favorites]);

  const renderMessage = (text: string) => (
    <div className="flex justify-center items-center h-64">
      <div className="bg-[#6667AB] text-white p-6 rounded-lg shadow-md text-center max-w-md w-full">
        <p className="text-lg font-medium">{text}</p>
      </div>
    </div>
  );

  if (!user) return renderMessage("Faça login para ver seus favoritos.");
  if (loading) return renderMessage("Carregando favoritos...");
  if (favorites.length === 0) return renderMessage("Nenhum favorito salvo.");

  return (
    <section className="px-4 py-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-[#4A4B83] mb-6 text-center">Seus Jogos Favoritos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {favoritesData.map(game => (
          <CardShare
            key={game.id}
            id={game.id}
            cardName="Favorito"
            tittle={game.titulo}
            img={game.img}
          >
            {game.descricao}
          </CardShare>
        ))}
      </div>
    </section>
  );
}
