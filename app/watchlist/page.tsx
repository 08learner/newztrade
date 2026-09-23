import type { Metadata } from "next"
import { Header } from "@/components/newztrade/Header"
import { Footer } from "@/components/newztrade/Footer"
import { WatchlistClient } from "@/components/newztrade/WatchlistClient"
import { Star } from "lucide-react"

export const metadata: Metadata = {
  title: "Watchlist — Track Your Instruments",
  description:
    "Build a personal watchlist of NEPSE stocks, global indices, crypto, forex pairs and commodities, saved on your device.",
}

export default function WatchlistPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="max-w-2xl">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-up">
            <Star className="size-4" /> My Watchlist
          </p>
          <h1 className="mt-3 font-serif text-3xl sm:text-4xl font-bold tracking-tight">
            Your instruments, one view
          </h1>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Star the instruments you follow. Your watchlist is saved privately on
            this device — no account needed.
          </p>
        </div>
        <WatchlistClient />
      </main>
      <Footer />
    </div>
  )
}
