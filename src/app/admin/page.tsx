'use client';

import React, { useEffect, useState } from 'react';

interface Jogo {
  idJogo?: number;
  titulo: string;
  anoLancamento: number;
  genero: string[];
  plataformas: string[];
  produtora: string;
  img: string;
  descricao: string;
}

const BASE_URL = "https://apigamefriends.onrender.com";

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [jogos, setJogos] = useState<Jogo[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [form, setForm] = useState<Jogo>({
    titulo: '',
    anoLancamento: new Date().getFullYear(),
    genero: [],
    plataformas: [],
    produtora: '',
    img: '',
    descricao: '',
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (token) loadJogos();
    }, 400);
    return () => clearTimeout(timer);
  }, [search, page, token]);

  const loadJogos = async () => {
    if (!token || !BASE_URL) {
      setError('Usuário não autenticado ou URL não definida');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        size: '21',
      });
      if (search) params.set('search', search);

      const res = await fetch(`${BASE_URL}/jogos?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) throw new Error(`Erro ${res.status}: ${res.statusText}`);

      const data = await res.json();
      setJogos(data);
    } catch (err) {
      console.log(err);
      setError('Erro ao carregar jogos');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'anoLancamento' ? Number(value) : value,
    }));
  };

  const handleArrayChange = (name: keyof Jogo, value: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: value.split(',').map((v) => v.trim()),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token || !BASE_URL) {
      setError('Usuário não autenticado ou URL não definida');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const url = editId ? `${BASE_URL}/jogos/${editId}` : `${BASE_URL}/jogos`;
      const method = editId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error(`Erro ao salvar: ${res.statusText}`);

      setForm({
        titulo: '',
        anoLancamento: new Date().getFullYear(),
        genero: [],
        plataformas: [],
        produtora: '',
        img: '',
        descricao: '',
      });
      setEditId(null);
      await loadJogos();
    } catch (err) {
      console.log(err);
      setError('Erro desconhecido ao salvar jogo');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (jogo: Jogo) => {
    setEditId(jogo.idJogo ?? null);
    setForm({ ...jogo });
  };

  const handleDelete = async (id: number) => {
    if (!token || !BASE_URL) {
      setError('Usuário não autenticado ou URL não definida');
      return;
    }

    if (!confirm('Tem certeza que deseja deletar este jogo?')) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BASE_URL}/jogos/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Erro ao deletar');

      await loadJogos();
    } catch (err) {
      console.log(err);
      setError('Erro ao deletar jogo');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold text-red-600">
          Você precisa estar logado para acessar esta página.
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Painel de Administração de Jogos</h1>

        {error && <p className="mb-4 text-red-600">{error}</p>}

        <div className="flex items-center gap-2 mb-6">
          <input
            type="text"
            placeholder="Buscar por título..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            className="border border-gray-300 p-2 rounded w-full"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
            >
              Limpar
            </button>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 mb-10 bg-gray-50 p-6 rounded-lg shadow-md"
        >
          <input
            name="titulo"
            placeholder="Título"
            value={form.titulo}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded"
            required
            disabled={loading}
          />
          <input
            name="anoLancamento"
            type="number"
            placeholder="Ano de Lançamento"
            value={form.anoLancamento}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded"
            required
            disabled={loading}
          />
          <input
            name="genero"
            placeholder="Gêneros (separados por vírgula)"
            value={form.genero.join(', ')}
            onChange={(e) => handleArrayChange('genero', e.target.value)}
            className="border border-gray-300 p-2 rounded"
            disabled={loading}
          />
          <input
            name="plataformas"
            placeholder="Plataformas (separadas por vírgula)"
            value={form.plataformas.join(', ')}
            onChange={(e) => handleArrayChange('plataformas', e.target.value)}
            className="border border-gray-300 p-2 rounded"
            disabled={loading}
          />
          <input
            name="produtora"
            placeholder="Produtora"
            value={form.produtora}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded"
            disabled={loading}
          />
          <input
            name="img"
            placeholder="URL da Imagem"
            value={form.img}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded"
            disabled={loading}
          />
          <textarea
            name="descricao"
            placeholder="Descrição"
            value={form.descricao}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded"
            disabled={loading}
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-50 transition"
            disabled={loading}
          >
            {editId ? 'Atualizar Jogo' : 'Adicionar Jogo'}
          </button>
        </form>

        <h2 className="text-2xl font-semibold mb-4">Jogos Cadastrados</h2>

        {loading && <p className="text-gray-600">Carregando...</p>}

        <ul className="space-y-4">
          {jogos.map((jogo) => (
            <li
              key={jogo.idJogo}
              className="border border-gray-300 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition flex flex-col md:flex-row md:items-center md:justify-between"
            >
              <div>
                <h3 className="text-xl font-bold text-gray-800">{jogo.titulo}</h3>
                <p className="text-sm text-gray-700 mb-2">{jogo.descricao}</p>
                <p className="text-xs text-gray-500">
                  Ano: {jogo.anoLancamento} | Gêneros: {jogo.genero.join(', ')} | Plataformas:{' '}
                  {jogo.plataformas.join(', ')} | Produtora: {jogo.produtora}
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex gap-2">
                <button
                  onClick={() => handleEdit(jogo)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  disabled={loading}
                >
                  Editar
                </button>
                <button
                  onClick={() => jogo.idJogo && handleDelete(jogo.idJogo)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  disabled={loading}
                >
                  Deletar
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Paginação */}
        <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="text-sm text-gray-600">Página {page + 1}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
}
