'use client';
import { useAppSelector } from '@/redux/hooks';

export default function SessionGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAppSelector((state) => state.auth);

  if (loading) return <p>Carregando sessão...</p>;

  if (!user) return <p>Você precisa estar logado.</p>;

  return <>{children}</>;
}