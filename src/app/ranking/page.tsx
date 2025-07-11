'use client';

import React, { useEffect, useState } from 'react';

interface UsuarioComAvaliacao {
  idUsuario: number;
  login: string;
  email: string;
  roles: string[];
  mediaAvaliacoes: number;
  quantidadeAvaliacoes: number;
}

interface UsuarioPageResponse {
  content: UsuarioComAvaliacao[];
  totalPages: number;
  number: number;
}

const BASE_URL = 'https://apigamefriends.onrender.com';

const estilosTop3 = [
  {
    bg: 'from-yellow-100 to-yellow-50',
    border: 'border-yellow-200',
    badge: 'bg-yellow-400 text-white',
    label: '🥇 Campeão',
  },
  {
    bg: 'from-gray-100 to-gray-50',
    border: 'border-gray-200',
    badge: 'bg-gray-300 text-gray-800',
    label: '🥈 Vice',
  },
  {
    bg: 'from-amber-100 to-amber-50',
    border: 'border-amber-200',
    badge: 'bg-amber-500 text-white',
    label: '🥉 Terceiro',
  },
];

const CardUsuario = ({
  usuario,
  index,
  posicao,
}: {
  usuario: UsuarioComAvaliacao;
  index?: number;
  posicao?: number;
}) => {
  if (index !== undefined) {
    const estilo = estilosTop3[index];
    const orderClass = index === 0 ? 'md:order-2 scale-110 z-10' : index === 1 ? 'md:order-1' : 'md:order-3';

    return (
      <div key={usuario.idUsuario} className={`relative rounded-2xl shadow-xl overflow-hidden ${orderClass}`}>
        {index === 0 && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <svg className="w-12 h-12 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        )}
        <div className={`flex flex-col border-2 bg-gradient-to-b ${estilo.bg} ${estilo.border}`}>
          <div className="p-6 flex-1 text-center">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl font-bold ${estilo.badge}`}>#{index + 1}</div>
            <h3 className="text-xl font-bold text-[#4A4B83]">{usuario.login}</h3>
            <p className="text-gray-600 text-sm truncate" title={usuario.email}>{usuario.email}</p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {[
                { label: 'Avaliações', value: usuario.quantidadeAvaliacoes },
                { label: 'Média', value: `${usuario.mediaAvaliacoes.toFixed(2)}/10` },
              ].map((item, i) => (
                <div key={i} className="bg-white bg-opacity-70 rounded-lg p-3">
                  <p className="text-sm text-gray-600">{item.label}</p>
                  <p className="text-lg font-bold text-[#4A4B83]">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={`py-2 font-medium ${estilo.badge}`}>{estilo.label}</div>
        </div>
      </div>
    );
  }

  return (
    <div key={usuario.idUsuario} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between mb-4">
          <div>
            <span className="text-sm font-semibold text-gray-500">Posição #{posicao}</span>
            <h3 className="text-xl font-bold text-[#4A4B83] mt-1">{usuario.login}</h3>
          </div>
        </div>
        <p className="text-gray-600 text-sm truncate" title={usuario.email}>
          <span className="font-medium">Email:</span> {usuario.email}
        </p>
        <div className="flex justify-between mt-6">
          {[
            { label: 'Avaliações', value: usuario.quantidadeAvaliacoes },
            { label: 'Média', value: `${usuario.mediaAvaliacoes.toFixed(2)}/10` },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <p className="text-sm text-gray-500">{item.label}</p>
              <p className="text-lg font-bold text-[#4A4B83]">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const BotaoPaginacao = ({
  onClick,
  disabled,
  children,
  iconPosition = 'left',
}: {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
  iconPosition?: 'left' | 'right';
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="flex items-center gap-2 bg-[#4A4B83] text-white px-6 py-3 rounded-lg hover:bg-[#3A3B73] transition-colors disabled:opacity-50"
  >
    {iconPosition === 'left' && <ArrowLeft />}
    {children}
    {iconPosition === 'right' && <ArrowRight />}
  </button>
);

const ArrowLeft = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const ArrowRight = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
  </svg>
);

export default function RankingUsuariosPage() {
  const [top3, setTop3] = useState<UsuarioComAvaliacao[]>([]);
  const [outrosUsuarios, setOutrosUsuarios] = useState<UsuarioComAvaliacao[]>([]);
  const [pagina, setPagina] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      setLoading(true);
      setErro(null);
      try {
        const res = await fetch(`${BASE_URL}/usuario/role-usuario?page=${pagina}&size=15&sort=mediaAvaliacoes,desc`);
        if (!res.ok) throw new Error('Erro ao buscar ranking');
        const data: UsuarioPageResponse = await res.json();
        setTop3(pagina === 0 ? data.content.slice(0, 3) : []);
        setOutrosUsuarios(pagina === 0 ? data.content.slice(3) : data.content);
        setTotalPaginas(data.totalPages);
      } catch (e) {
        setErro((e as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsuarios();
  }, [pagina]);

  return (
    <main className="bg-white">
      <section className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-12 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#4A4B83] mb-3">Ranking de Usuários</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">Os melhores avaliadores da nossa comunidade</p>
        </div>

        {loading && <div className="flex justify-center items-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4A4B83]" /></div>}

        {erro && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 max-w-2xl mx-auto"><p>{erro}</p></div>}

        {!loading && top3.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-center text-[#4A4B83] mb-8">Top 3 Melhores Avaliadores</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {top3.map((usuario, i) => <CardUsuario key={usuario.idUsuario} usuario={usuario} index={i} />)}
            </div>
          </div>
        )}

        {!loading && outrosUsuarios.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-center text-[#4A4B83] mb-8">Outros Avaliadores</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {outrosUsuarios.map((usuario, i) => (
                <CardUsuario key={usuario.idUsuario} usuario={usuario} posicao={pagina * 15 + i + (pagina === 0 ? 4 : 1)} />
              ))}
            </div>
          </div>
        )}

        {!loading && outrosUsuarios.length === 0 && !erro && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhum outro usuário encontrado.</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12">
          <BotaoPaginacao onClick={() => setPagina((p) => Math.max(p - 1, 0))} disabled={pagina === 0 || loading}>Anterior</BotaoPaginacao>
          <span className="text-gray-600 font-medium">Página {pagina + 1} de {totalPaginas}</span>
          <BotaoPaginacao onClick={() => setPagina((p) => Math.min(p + 1, totalPaginas - 1))} disabled={pagina >= totalPaginas - 1 || loading} iconPosition="right">Próxima</BotaoPaginacao>
        </div>
      </section>
    </main>
  );
}
