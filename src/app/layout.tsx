import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import ClientLayout from '@/components/ClientLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next-GamerFriend | Track your games',
  description: 'Track, rate and discover new games with Next-GamerFriend',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
