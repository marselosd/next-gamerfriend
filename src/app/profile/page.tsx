'use client';

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CardShareFav from "@/components/commonCard/CardShareFav";

export default function FavoritesContent() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [favoritesData, setFavoritesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    async function loadFavorites() {
      setLoading(true);
      try {
        if (!user) return;
        const resFav = await fetch(`/api/favorites?userId=${user.email}`);
        const { favorites: favGuids } = await resFav.json();

        // 2. Para cada guid, buscar dados completos
        const gamesData = await Promise.all(
          favGuids.map(async (guid: string) => {
            const resGame = await fetch(`/api/giantbomb/game/${guid}`);
            const dataGame = await resGame.json();
            return dataGame.results; // conforme retorno da API
          })
        );

        setFavoritesData(gamesData);
      } catch (error) {
        console.error("Erro ao carregar favoritos:", error);
      } finally {
        setLoading(false);
      }
    }

    loadFavorites();
  }, [user]);

  if (!user) return <p>Faça login para ver seus favoritos.</p>;
  if (loading) return <p>Carregando favoritos...</p>;
  if (favoritesData.length === 0) return <p>Nenhum favorito salvo.</p>;

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 py-4">
      {favoritesData.map(game => (
        <CardShareFav
          key={game.guid}
          id={game.guid}
          cardName="Favorito"
          tittle={game.name}
          img={{ image: game.image?.small_url || "", alt: game.name }}
        >
          {game.deck || game.description || "Sem descrição disponível."}
        </CardShareFav>
      ))}
    </section>
  );
}
