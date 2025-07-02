'use client';

import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";

interface RequireAdminProviderProps {
  children: ReactNode;
}

export default function RequireAdmin({ children }: RequireAdminProviderProps) {
  const router = useRouter();
  const { user, loading } = useSelector((state: RootState) => state.auth);

  const hasValidRole = user?.roles?.includes("ROLE_USER") || user?.roles?.includes("ROLE_ADMIN");

  useEffect(() => {
    if (!loading) {
      if (!hasValidRole) {
        router.replace("/login");
      } else if (user?.roles?.includes("ROLE_ADMIN")) {
        router.replace("/admin");
      }
    }
  }, [loading, hasValidRole, user, router]);

  if (loading || !hasValidRole || user?.roles?.includes("ROLE_ADMIN")) {
    return null;
  }

  return <>{children}</>;
}