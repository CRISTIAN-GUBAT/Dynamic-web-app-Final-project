import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'JSON Placeholder App',
  description: 'A dynamic web application using Next.js and Tailwind CSS',
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
          <div className="min-h-screen">
            <header className="bg-primary text-white p-4 shadow-md">
              <h1 className="text-2xl font-bold">JSON Placeholder App</h1>
            </header>
            <main className="container mx-auto p-4">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}