'use client';

import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";

interface JogoAvaliado {
  idJogo: number;
  titulo: string;
  descricao: string;
  img: string;
  rating: number;
}

const BASE_URL = "http://localhost:8080";

export default function ProfileContent() {
  const user = useAppSelector(state => state.auth.user);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [jogosAvaliados, setJogosAvaliados] = useState<JogoAvaliado[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (token && user) {
      loadAvaliacoes();
    }
  }, [token, user]);

  const loadAvaliacoes = async () => {
    setLoading(true);
    try {
      const [resReview, resJogos] = await Promise.all([
        fetch(`${BASE_URL}/jogos/usuario/reviews`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${BASE_URL}/jogos?page=0&size=100`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (!resReview.ok || !resJogos.ok) throw new Error("Erro ao carregar dados");

      const reviews = await resReview.json(); 
      const jogos = await resJogos.json();     
      const avaliados: JogoAvaliado[] = reviews.map((r: any) => {
        const jogo = jogos.find((j: any) => j.idJogo === r.idJogo);
        return {
          idJogo: r.idJogo,
          titulo: jogo?.titulo || `Jogo ID ${r.idJogo}`,
          descricao: jogo?.descricao || '',
          img: jogo?.img || '',
          rating: r.rating,
        };
      });

      setJogosAvaliados(avaliados);
    } catch (err: any) {
      setMessage(err.message || "Erro ao carregar avaliações");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="bg-[#4A4B83] text-white p-6 rounded-lg shadow-md text-center max-w-md w-full">
          <p className="text-lg font-medium">Faça login para acessar seu perfil.</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-white px-4 py-10 max-w-6xl mx-auto text-gray-800">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-[#4A4B83] mb-2">Olá, {user.name} 👋</h1>
        <p className="text-gray-500 text-base">Veja os jogos que você já avaliou</p>
      </div>

      {loading && (
        <p className="text-center text-gray-600">Carregando avaliações...</p>
      )}

      {message && (
        <div className="text-center text-red-600 mb-4">{message}</div>
      )}

      {!loading && jogosAvaliados.length === 0 && (
        <p className="text-center text-gray-600">Você ainda não avaliou nenhum jogo.</p>
      )}

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {jogosAvaliados.map(jogo => (
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
                  Nota: {jogo.rating}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
