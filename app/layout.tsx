import type { Metadata } from "next"
import { Inter, Newsreader, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" })
const serif = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
})
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-ticker" })

export const metadata: Metadata = {
  title: "NewzTrade — Trading News, Markets & NEPSE",
  description:
    "Clean, fast trading news across stocks, crypto, forex, commodities and Nepal's NEPSE market.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable} ${mono.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}
