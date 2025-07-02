'use client';

import { GamePayloadReturn } from "@/types/interfaces/interfaces";
import ButtonFavorite from "./ButtonFavorite";

export default function PageGame({ game }: { game: GamePayloadReturn }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Imagem */}
        <div className="flex justify-center items-start">
          <img
            src={game.img}
            alt={game.titulo}
            className="w-full max-w-sm rounded-xl shadow-lg object-cover"
          />
        </div>

        {/* Informações */}
        <div className="flex flex-col justify-start space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-[#6667AB]">
            {game.titulo}
            <ButtonFavorite gameId={game.idJogo}/>
          </h1>


          <p className="text-base md:text-lg text-gray-700">{game.descricao}</p>

          <div>
            <span className="font-semibold">🎮 Ano de Lançamento:</span>{" "}
            {game.anoLancamento}
          </div>

          <div>
            <span className="font-semibold">🏢 Produtora:</span>{" "}
            {game.produtora}
          </div>

          <div>
            <span className="font-semibold">📚 Gêneros:</span>{" "}
            {game.genero.join(", ")}
          </div>

          <div>
            <span className="font-semibold">🕹️ Plataformas:</span>{" "}
            {game.plataformas.join(", ")}
          </div>

          <div className="mt-4 flex items-center gap-2">
            <span className="font-semibold">⭐ Média:</span>
            <span className="text-yellow-600 font-bold text-lg">
              {game.avgRating?.toFixed(1) || "-"}
            </span>
          </div>

          <div>
            <span className="font-semibold">👥 Total de Avaliações:</span>{" "}
            {game.totalRating || "-"}
          </div>
        </div>
      </div>
    </div>
  );
}
