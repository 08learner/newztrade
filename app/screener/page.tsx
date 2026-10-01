import type { Metadata } from "next"
import { Header } from "@/components/newztrade/Header"
import { Footer } from "@/components/newztrade/Footer"
import { ScreenerClient } from "@/components/newztrade/ScreenerClient"
import { getInstruments } from "@/lib/content"
import { SlidersHorizontal } from "lucide-react"

export const metadata: Metadata = {
  title: "Stock Screener — Filter NEPSE & Global Instruments",
  description:
    "Screen NEPSE stocks, global indices, crypto, forex pairs and commodities by market, direction and daily change. Star instruments to save them to your watchlist.",
}

export default async function ScreenerPage() {
  const instruments = await getInstruments()
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="max-w-2xl">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-up">
            <SlidersHorizontal className="size-4" /> Stock Screener
          </p>
          <h1 className="mt-3 font-serif text-3xl sm:text-4xl font-bold tracking-tight">
            Find instruments that match your rules
          </h1>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Filter every instrument NewzTrade tracks by market, direction and
            price. Star a row to save it to your watchlist.
          </p>
        </div>
        <ScreenerClient instruments={instruments} />
      </main>
      <Footer />
    </div>
  )
}
