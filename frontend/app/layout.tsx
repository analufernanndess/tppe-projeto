import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AppProvider } from "@/lib/store"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TechMart - Sua Loja de Tecnologia",
  description: "Os melhores produtos de tecnologia com os melhores preços",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
