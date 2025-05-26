'use client'

import { Providers } from '@/components/providers'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import { AuthListener } from '@/app/AuthListener'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <Providers>
      <AuthListener />
      <Header />
        {children}
      <Footer />
    </Providers>
    </>
  )
}