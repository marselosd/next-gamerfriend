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

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/login"); 
      } else if (user?.roles?.includes("ROLE_ADMIN")) {
        router.replace("/admin");
      }
    }
  }, [loading, user, router]);

  if (loading || !user || user?.roles?.includes("ROLE_ADMIN")) {
    return null;
  }


  return <>{children}</>;
}
