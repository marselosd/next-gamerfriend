'use client';
import React, { useState } from "react";
import CardShareFav from "../commonCard/CardShareFav";
import { getTranslations } from "@/locales";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetGamesQuery } from "./gamesApi";
import { GameResult } from "@/types/interfaces/interfaces";

export default function GamesContent() {
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage);
  const { cardGames } = getTranslations(currentLanguage);

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const { data, error, isLoading } = useGetGamesQuery({
    page,
    search: searchTerm,
    sort: sortOrder,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
    setPage(1);
  };

  return (
    <>
      <section className="flex flex-col sm:flex-row items-center gap-3">
        <form onSubmit={handleSearch} className="flex gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Buscar por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 w-full"
          />
        </form>

        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="border border-gray-300 rounded-md px-2 py-1"
        >
          <option value="">Ordenar por...</option>
          <option value="original_release_date:desc">Mais Recentes</option>
          <option value="name:asc">Nome (A-Z)</option>
          <option value="name:desc">Nome (Z-A)</option>
        </select>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading && <p>Carregando jogos...</p>}
        {error && <p className="text-red-500">Erro ao carregar jogos</p>}
        {!isLoading && !error && data?.results?.map((game: GameResult) => (
          <CardShareFav
            key={game.id}
            id={String(game.id)}
            cardName={cardGames.title}
            tittle={game.name}
            img={{
              image: game.image?.small_url || "",
              alt: game.name,
            }}
          >
          </CardShareFav>
        ))}
      </section>

      <section className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-[#6667AB] text-white rounded-md disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="text-sm">Página {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={!data?.results?.length || data.results.length < 20}
          className="px-3 py-1 bg-[#6667AB] text-white rounded-md disabled:opacity-50"
        >
          Próximo
        </button>
      </section>
    </>
  );
}
