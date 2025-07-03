"use client";
import React, { useState } from "react";
import GameCard from "../commonCard/GameCard";
import { useGetGamesQuery } from "./gamesApi";
import { GamePayloadReturn } from "@/types/interfaces/interfaces";

export default function PageAllGames() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(21);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  const { data, error, isLoading } = useGetGamesQuery({
    page,
    size,
    filter: filter,
    search: search,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(0);
    setSize(21);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
    setPage(0);
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
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#6667AB]"
          />
        </form>

        <select
          value={filter}
          onChange={handleSortChange}
          className="border border-gray-300 rounded-md px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6667AB]"
        >
          <option value="">Ordenar por...</option>
          <option value="anoLancamento">Mais Antigos</option>
          <option value="titulo">Nome (A-Z)</option>
          <option value="avgRating">Nota (Média)</option>
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
              <GameCard
                id={String(game.idJogo)}
                cardName={String(game.anoLancamento)}
                tittle={game.titulo}
                key={game.idJogo}
                img={{
                  image: game.img,
                  alt: game.titulo,
                }}
                avgRating={game.avgRating}
              >
                {game.descricao}
              </GameCard>
            ))}
        </div>
      </section>

      {/* Paginação */}
      <section className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          disabled={page === 0}
          className="px-4 py-2 bg-[#6667AB] text-white rounded-md disabled:opacity-50 hover:bg-[#57599c] transition-colors"
        >
          Anterior
        </button>
        <span className="text-sm font-medium">Página {page + 1}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={!data?.length || data.length < size}
          className="px-4 py-2 bg-[#6667AB] text-white rounded-md disabled:opacity-50 hover:bg-[#57599c] transition-colors"
        >
          Próximo
        </button>
      </section>
    </div>
  );
}
