"use client";

import { useEffect, useState } from "react";

const BASE_URL = "https://apigamefriends.onrender.com";
const ITEMS_PER_PAGE = 6;

interface Jogo {
  idJogo: number;
  titulo: string;
  avgRating: number;
  descricao: string;
  img: string;
  rating?: number;
}

interface Review {
  idJogo: number;
  rating: number;
}

export default function ReviewPage() {
  const [token, setToken] = useState<string | null>(null);
  const [jogosAvaliadosRaw, setJogosAvaliadosRaw] = useState<Review[]>([]);
  const [todosJogos, setTodosJogos] = useState<Jogo[]>([]);
  const [selectedJogo, setSelectedJogo] = useState<Jogo | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [message, setMessage] = useState<string | null>(null);
  const [pageAvaliados, setPageAvaliados] = useState(1);
  const [pageNaoAvaliados, setPageNaoAvaliados] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Cria a lista de jogos avaliados com detalhes completos
  const jogosAvaliados: Jogo[] = jogosAvaliadosRaw.map((review) => {
    const jogoDetalhes = todosJogos.find((j) => j.idJogo === review.idJogo);
    return {
      idJogo: review.idJogo,
      titulo: jogoDetalhes?.titulo ?? `ID ${review.idJogo}`,
      avgRating: jogoDetalhes?.avgRating ?? 0,
      descricao: jogoDetalhes?.descricao ?? "",
      img: jogoDetalhes?.img ?? "",
      rating: review.rating,
    };
  });

  // Jogos que ainda não foram avaliados e filtrados por busca
  const jogosNaoAvaliadosFiltrados = todosJogos.filter(
    (j) =>
      !jogosAvaliados.find((a) => a.idJogo === j.idJogo) &&
      j.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginação
  const jogosAvaliadosPaginados = jogosAvaliados.slice(
    (pageAvaliados - 1) * ITEMS_PER_PAGE,
    pageAvaliados * ITEMS_PER_PAGE
  );

  const jogosNaoAvaliadosPaginados = jogosNaoAvaliadosFiltrados.slice(
    (pageNaoAvaliados - 1) * ITEMS_PER_PAGE,
    pageNaoAvaliados * ITEMS_PER_PAGE
  );

  const totalPaginasAvaliados = Math.ceil(jogosAvaliados.length / ITEMS_PER_PAGE);
  const totalPaginasNaoAvaliados = Math.ceil(jogosNaoAvaliadosFiltrados.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const tk = localStorage.getItem("token");
    setToken(tk);
  }, []);

  useEffect(() => {
    if (token) {
      loadJogosAvaliados();
      loadTodosJogos();
    }
  }, [token]);

  const loadJogosAvaliados = async () => {
    try {
      const res = await fetch(`${BASE_URL}/jogos/usuario/reviews`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Erro ao buscar jogos avaliados");
      const data: Review[] = await res.json();
      setJogosAvaliadosRaw(data);
    } catch (err) {
      console.log(err)
      setMessage("Erro ao carregar avaliações");
    }
  };

  const loadTodosJogos = async () => {
    try {
      const res = await fetch(`${BASE_URL}/jogos?page=0&size=100`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Erro ao buscar jogos");
      const data: Jogo[] = await res.json();
      setTodosJogos(data);
    } catch (err) {
      setMessage("Erro ao carregar jogos");
    }
  };

  const handleReviewSubmit = async () => {
    if (!token || !selectedJogo) return;

    if (rating < 0 || rating > 10) {
      setMessage("A nota deve ser entre 0 e 10.");
      return;
    }

    try {
      const body = { idJogo: selectedJogo.idJogo, rating };
      const existing = jogosAvaliados.find((j) => j.idJogo === selectedJogo.idJogo);

      const res = await fetch(`${BASE_URL}/jogos/review`, {
        method: existing ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error(await res.text());

      setMessage(existing ? "Avaliação atualizada!" : "Avaliação enviada!");
      setSelectedJogo(null);
      setRating(0);
      await loadJogosAvaliados();
    } catch (err) {
      console.log(err);
      setMessage("Erro ao enviar avaliação");
    }
  };

  const Pagination = ({
    page,
    total,
    setPage,
  }: {
    page: number;
    total: number;
    setPage: (p: number) => void;
  }) => (
    <div className="flex justify-center items-center gap-3 mt-4">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        Anterior
      </button>
      <span className="text-sm text-gray-600">
        Página {page} de {total}
      </span>
      <button
        onClick={() => setPage(page + 1)}
        disabled={page === total}
        className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        Próxima
      </button>
    </div>
  );

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-800">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 shadow-md max-w-md w-full text-center">
          <div className="text-4xl mb-2">🔒</div>
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Acesso restrito
          </h2>
          <p className="text-sm text-gray-700 mb-4">
            Você precisa estar logado para acessar suas avaliações de jogos.
          </p>
          <a
            href="/login"
            className="inline-block bg-[#4A4B83] hover:bg-[#353660] text-white px-4 py-2 rounded transition"
          >
            Ir para Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 py-10 max-w-4xl mx-auto text-gray-800">
        <h1 className="text-3xl font-bold text-center mb-8">Minhas Avaliações</h1>

        {message && (
          <p className="text-red-600 text-center mb-4" role="alert">
            {message}
          </p>
        )}

        {/* Avaliados */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Jogos avaliados</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jogosAvaliadosPaginados.map((jogo) => (
              <li
                key={jogo.idJogo}
                className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white flex gap-4 items-start"
              >
                <img
                  src={jogo.img}
                  alt={jogo.titulo}
                  className="w-20 h-28 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-[#4A4B83]">{jogo.titulo}</h3>
                  <p className="text-sm text-gray-700 mt-1">Sua nota: {jogo.rating}</p>
                  <button
                    onClick={() => {
                      setSelectedJogo(jogo);
                      setRating(jogo.rating ?? 0);
                    }}
                    className="mt-3 w-full py-2 rounded bg-[#4A4B83] hover:bg-[#353660] text-white"
                  >
                    Atualizar Avaliação
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {totalPaginasAvaliados > 1 && (
            <Pagination
              page={pageAvaliados}
              total={totalPaginasAvaliados}
              setPage={setPageAvaliados}
            />
          )}
        </section>

        {/* Não avaliados */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Jogos ainda não avaliados</h2>
          <input
            type="text"
            placeholder="Buscar jogo por nome..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPageNaoAvaliados(1);
            }}
            className="mb-4 w-full px-4 py-2 border rounded-md shadow-sm border-gray-300 text-black placeholder:text-gray-700 focus:ring-[#4A4B83] focus:border-[#4A4B83]"
          />
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jogosNaoAvaliadosPaginados.map((jogo) => (
              <li
                key={jogo.idJogo}
                className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white flex gap-4 items-start"
              >
                <img
                  src={jogo.img}
                  alt={jogo.titulo}
                  className="w-20 h-28 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-[#4A4B83]">{jogo.titulo}</h3>
                  <button
                    onClick={() => {
                      const jaAvaliou = jogosAvaliados.find(
                        (j) => j.idJogo === jogo.idJogo
                      );
                      if (jaAvaliou) {
                        setMessage("Você já avaliou este jogo.");
                        return;
                      }
                      setSelectedJogo(jogo);
                      setRating(0);
                    }}
                    className="mt-3 w-full py-2 rounded bg-[#4A4B83] hover:bg-[#353660] text-white"
                  >
                    Avaliar
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {totalPaginasNaoAvaliados > 1 && (
            <Pagination
              page={pageNaoAvaliados}
              total={totalPaginasNaoAvaliados}
              setPage={setPageNaoAvaliados}
            />
          )}
        </section>

        {/* Modal de Avaliação */}
        {selectedJogo && (
          <>
            {/* Fundo escurecido + blur */}
            <div className="fixed inset-0 bg-opacity-90 backdrop-blur-md z-40" />

            {/* Modal centralizado */}
            <div className="fixed inset-0 flex justify-center items-center z-50 p-4">
              <div
                className="bg-white bg-opacity-95 rounded-lg p-6 w-full max-w-md relative shadow-2xl border border-gray-200"
                style={{ backdropFilter: "saturate(180%) blur(10px)" }}
              >
                {/* Botão fechar */}
                <button
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
                  onClick={() => setSelectedJogo(null)}
                  aria-label="Fechar modal"
                >
                  ✕
                </button>

                {/* Título */}
                <h2 className="text-2xl font-extrabold text-[#4A4B83] mb-4 text-center">
                  Avaliar: {selectedJogo.titulo}
                </h2>

                {/* Label e input nota */}
                <label htmlFor="nota" className="text-sm text-gray-700 font-medium">
                  Nota (0 a 10):
                </label>
                <input
                  id="nota"
                  type="number"
                  min={0}
                  max={10}
                  step={0.5}
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm border-gray-300
                    text-black placeholder:text-gray-700 focus:ring-[#4A4B83] focus:border-[#4A4B83]"
                />

                {/* Botões */}
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={handleReviewSubmit}
                    className="bg-[#4A4B83] hover:bg-[#353660] text-white px-5 py-2 rounded font-semibold transition-colors duration-200"
                  >
                    {jogosAvaliados.find((j) => j.idJogo === selectedJogo.idJogo)
                      ? "Atualizar"
                      : "Enviar"}
                  </button>
                  <button
                    onClick={() => setSelectedJogo(null)}
                    className="text-sm text-gray-600 hover:underline font-medium"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
