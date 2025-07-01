'use client';
import React, { useState } from "react";
import CardShareFav from "../commonCard/CardShareFav";
import { getTranslations } from "@/locales";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetGamesQuery } from "./gamesApi";
import { GamePayloadReturn } from "@/types/interfaces/interfaces";

export default function GamesContent() {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );
  const { cardGames } = getTranslations(currentLanguage);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(21);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const { data, error, isLoading } = useGetGamesQuery({
    page,
    size,
    search: searchTerm,
    sort: sortOrder,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setSize(21);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
    setPage(1);
    setSize(21);
  };

  return (
    <div className="bg-white min-h-screen text-gray-800 px-4 py-6">
      {/* Filtros */}
      <section className="flex flex-col sm:flex-row items-center gap-3 mb-6">
        <form onSubmit={handleSearch} className="flex gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Buscar por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#6667AB]"
          />
        </form>

        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="border border-gray-300 rounded-md px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6667AB]"
        >
          <option value="">Ordenar por...</option>
          <option value="original_release_date:desc">Mais Recentes</option>
          <option value="name:asc">Nome (A-Z)</option>
          <option value="name:desc">Nome (Z-A)</option>
        </select>
      </section>

      {/* Grid de jogos dentro de uma caixa */}
      <section className="bg-white border border-gray-200 shadow-md rounded-lg px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading && <p>Carregando jogos...</p>}
          {error && <p className="text-red-500">Erro ao carregar jogos</p>}
          {!isLoading &&
            !error &&
            data?.map((game: GamePayloadReturn) => (
              <CardShareFav
                key={game.id}
                id={game.id}
                cardName={cardGames.title}
                tittle={game.titulo}
                img={{
                  image: game.img,
                  alt: game.titulo,
                }}
              >
                {game.descricao}
              </CardShareFav>
            ))}
        </div>
      </section>

      {/* Paginação */}
      <section className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-[#6667AB] text-white rounded-md disabled:opacity-50 hover:bg-[#57599c] transition-colors"
        >
          Anterior
        </button>
        <span className="text-sm font-medium">Página {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={!data?.length || data.length < 20}
          className="px-4 py-2 bg-[#6667AB] text-white rounded-md disabled:opacity-50 hover:bg-[#57599c] transition-colors"
        >
          Próximo
        </button>
      </section>
    </div>
  );
}
