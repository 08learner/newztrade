import type { Metadata } from "next"
import Link from "next/link"
import { getInstruments, getTickerQuotes } from "@/lib/content"
import { Header } from "@/components/newztrade/Header"
import { Footer } from "@/components/newztrade/Footer"
import { Banknote, ArrowRightLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Currency Rates — NPR Exchange Rates & Forex",
  description:
    "Nepali rupee exchange rates and major forex pairs: USD/NPR, EUR/USD, USD/JPY and more, with the currency stories moving global markets.",
}

export default async function CurrenciesPage() {
  const [instruments, quotes] = await Promise.all([
    getInstruments(),
    getTickerQuotes(),
  ])
  const forexInstruments = instruments.filter((i) => i.market === "Forex")
  const fxQuotes = quotes.filter(
    (q) => q.symbol.includes("/") || q.symbol === "USD/NPR"
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="max-w-2xl">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-up">
            <Banknote className="size-4" /> Currency Rates
          </p>
          <h1 className="mt-3 font-serif text-3xl sm:text-4xl font-bold tracking-tight">
            NPR and the world&apos;s currencies
          </h1>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            The exchange rates that matter most to Nepal — remittance inflows,
            import costs and the major global pairs that set the tone.
          </p>
        </div>

        <section className="mt-10">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 border-foreground pb-3 mb-4">
            Rates board
          </h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[480px] text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-3 font-semibold">Pair</th>
                  <th className="px-4 py-3 font-semibold">Description</th>
                  <th className="px-4 py-3 text-right font-semibold">Rate</th>
                  <th className="px-4 py-3 text-right font-semibold">Change</th>
                </tr>
              </thead>
              <tbody>
                {fxQuotes.map((q) => {
                  const up = q.changePct >= 0
                  return (
                    <tr
                      key={q.symbol}
                      className="border-b border-border last:border-0 hover:bg-muted/40"
                    >
                      <td className="px-4 py-3 font-mono font-semibold">
                        {q.symbol}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{q.name}</td>
                      <td className="px-4 py-3 text-right font-medium">{q.price}</td>
                      <td
                        className={`px-4 py-3 text-right font-semibold ${up ? "text-up" : "text-down"}`}
                      >
                        {up ? "+" : ""}
                        {q.changePct.toFixed(2)}%
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>

        {forexInstruments.length > 0 && (
          <section className="mt-12">
            <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 border-foreground pb-3 mb-6">
              Forex instruments
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {forexInstruments.map((i) => {
                const up = i.changePct >= 0
                return (
                  <Link
                    key={i.slug}
                    href={`/instrument/${i.slug}`}
                    className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-foreground"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-2 font-mono font-semibold">
                        <ArrowRightLeft className="size-4 text-muted-foreground" />
                        {i.symbol}
                      </span>
                      <span
                        className={`text-sm font-semibold ${up ? "text-up" : "text-down"}`}
                      >
                        {up ? "+" : ""}
                        {i.changePct.toFixed(2)}%
                      </span>
                    </div>
                    <h3 className="mt-2 font-semibold group-hover:underline">
                      {i.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                      {i.blurb}
                    </p>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        <div className="mt-12 rounded-xl border border-border bg-muted/50 p-6 text-sm text-muted-foreground leading-relaxed">
          <p className="font-semibold text-foreground">
            Why USD/NPR matters so much
          </p>
          <p className="mt-2">
            Remittances from Nepali workers abroad are one of the country&apos;s
            biggest sources of foreign currency, so the rupee&apos;s peg against
            the Indian rupee and its cross-rate with the US dollar shape
            everything from fuel prices to import bills. Read more in our{" "}
            <Link href="/learn" className="font-medium text-up hover:underline">
              Learn explainers
            </Link>
            .
          </p>
          <p className="mt-2 text-xs">
            Rates shown are illustrative demo content. Check Nepal Rastra Bank
            for official reference rates.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
