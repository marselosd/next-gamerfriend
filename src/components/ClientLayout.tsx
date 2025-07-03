'use client'

import Providers from "@/app/Providers";
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <Providers>
      <Header />
        {children}
      <Footer />
    </Providers>
    </>
  )
}