import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/providers'
import './globals.css'
import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next-GamerFriend | Track your games',
  description: 'Track, rate and discover new games with Next-GamerFriend',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
        <Header />
          {children}
        <Footer />
        </Providers>
      </body>
    </html>
  )
}