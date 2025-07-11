'use client';

import React from 'react';
import { GamePayloadReturn, UserFullPayload } from '@/types/interfaces/interfaces';
import { useGetFavoritosUsuarioQuery } from '../header/userApi';

export default function ProfileContent({ user }: { user: UserFullPayload }) {
  const { data: jogosAvaliados, isLoading: loadingFavoritos, error: errorFavoritos } = useGetFavoritosUsuarioQuery({id: user.idUsuario});

  return (
    <section className="min-h-screen bg-white px-4 py-10 max-w-6xl mx-auto text-gray-800">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-[#4A4B83] mb-2">Perfil de: {user.login}</h1>
        <p className="text-gray-500 text-base">Veja os jogos que {user.login} avaliou</p>
      </div>

      {loadingFavoritos && (
        <p className="text-center text-gray-600">Carregando avaliações...</p>
      )}

      {!loadingFavoritos && jogosAvaliados?.length === 0 && (
        <p className="text-center text-gray-600">Este usuário ainda não avaliou nenhum jogo.</p>
      )}

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {jogosAvaliados?.map((jogo: GamePayloadReturn) => (
          <li
            key={jogo.idJogo}
            className="bg-white border border-gray-200 rounded-2xl shadow hover:shadow-md transition duration-200 overflow-hidden flex flex-col"
          >
            <img
              src={jogo.img}
              alt={jogo.titulo}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-xl font-semibold text-[#4A4B83] mb-2">{jogo.titulo}</h3>
              <p className="text-sm text-gray-600 flex-grow">{jogo.descricao}</p>
              <div className="mt-4">
                <span className="inline-block bg-[#4A4B83] text-white text-sm px-3 py-1 rounded-full">
                  Nota: {jogo.avgRating}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
