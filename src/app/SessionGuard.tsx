'use client';
import { useAppSelector } from '@/redux/hooks';

export default function SessionGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAppSelector((state) => state.auth);

  if (loading) return <p>Carregando sessão...</p>;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-800">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 shadow-md max-w-md w-full text-center">
          <div className="text-4xl mb-2">🔒</div>
          <h2 className="text-xl font-semibold text-red-600 mb-2">Acesso restrito</h2>
          <p className="text-sm text-gray-700 mb-4">
            Você precisa estar logado para acessar a aplicaçao.
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

  return <>{children}</>;
}