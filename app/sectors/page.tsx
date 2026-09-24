import type { Metadata } from "next"
import Link from "next/link"
import { getInstruments, getNepseCompanies } from "@/lib/content"
import type { Instrument } from "@/lib/data"
import { getNepsePriceSnapshot } from "@/lib/nepse"
import { NepseDirectory, type DirectoryQuote } from "@/components/newztrade/NepseDirectory"
import { Header } from "@/components/newztrade/Header"
import { Footer } from "@/components/newztrade/Footer"
import { LayoutGrid, TrendingUp, TrendingDown } from "lucide-react"

// Live NEPSE prices refresh at most every 5 minutes (cached upstream).
export const revalidate = 300

export const metadata: Metadata = {
  title: "Sectors — Market Performance by Group",
  description:
    "Sector-by-sector market performance: NEPSE banks, hydropower and insurers, plus global indices, crypto, forex and commodities tracked on NewzTrade.",
}

// NEPSE is intentionally absent: its full 649-security directory renders in
// its own section below instead of the 3 curated rows.
const sectorOrder: Instrument["market"][] = [
  "Index",
  "Stocks",
  "Crypto",
  "Forex",
  "Commodities",
  "Analysis",
]

const sectorLabels: Record<string, { label: string; blurb: string }> = {
  Index: { label: "Benchmark Indices", blurb: "The headline gauges for Nepal and world markets." },
  NEPSE: { label: "NEPSE Companies", blurb: "Listed names on the Nepal Stock Exchange." },
  Stocks: { label: "Global Stocks", blurb: "Major international equities." },
  Crypto: { label: "Crypto", blurb: "Digital assets and tokens." },
  Forex: { label: "Forex", blurb: "Currency pairs that matter to Nepal." },
  Commodities: { label: "Commodities", blurb: "Metals, energy and raw materials." },
  Analysis: { label: "Analysis", blurb: "Analytical instruments and composites." },
}

export default async function SectorsPage() {
  const [instruments, nepseCompanies, snapshot] = await Promise.all([
    getInstruments(),
    getNepseCompanies(),
    getNepsePriceSnapshot(),
  ])

  const directoryQuotes: Record<string, DirectoryQuote> = {}
  if (snapshot) {
    for (const [symbol, q] of snapshot.quotes) {
      directoryQuotes[symbol] = {
        ltp: q.ltp,
        changePct: q.changePct,
        volume: q.volume,
      }
    }
  }
  const instrumentHrefs: Record<string, string> = {}
  for (const i of instruments) {
    if (i.market === "NEPSE") instrumentHrefs[i.symbol] = `/instrument/${i.slug}`
  }

  const groups = sectorOrder
    .map((market) => ({
      market,
      items: instruments.filter((i) => i.market === market),
    }))
    .filter((g) => g.items.length > 0)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="max-w-2xl">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-up">
            <LayoutGrid className="size-4" /> Sectors
          </p>
          <h1 className="mt-3 font-serif text-3xl sm:text-4xl font-bold tracking-tight">
            Performance by sector
          </h1>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            The complete NEPSE listed-company directory with live prices, plus
            every global instrument NewzTrade tracks, grouped by market.
          </p>
        </div>

        <section className="mt-10">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 border-foreground pb-3 mb-4">
            NEPSE — Full Listed Directory
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Every security listed on the Nepal Stock Exchange — all commercial
            banks, hydropower, insurance, microfinance and more — with real
            last-traded prices for symbols that traded in the latest session.
          </p>
          {nepseCompanies.length > 0 ? (
            <NepseDirectory
              companies={nepseCompanies}
              quotes={directoryQuotes}
              fetchedAt={snapshot?.fetchedAt ?? null}
              instrumentHrefs={instrumentHrefs}
            />
          ) : (
            <p className="text-sm text-muted-foreground">
              The NEPSE directory is temporarily unavailable.
            </p>
          )}
        </section>

        <div className="mt-14 space-y-12">
          {groups.map((g) => {
            const meta = sectorLabels[g.market] ?? { label: g.market, blurb: "" }
            const avg =
              g.items.reduce((sum, i) => sum + i.changePct, 0) / g.items.length
            const positive = avg >= 0
            return (
              <section key={g.market}>
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-foreground pb-3 mb-4">
                  <h2 className="text-sm font-bold uppercase tracking-widest">
                    {meta.label}
                  </h2>
                  <span
                    className={`flex items-center gap-1 text-sm font-semibold ${positive ? "text-up" : "text-down"}`}
                  >
                    {positive ? (
                      <TrendingUp className="size-4" />
                    ) : (
                      <TrendingDown className="size-4" />
                    )}
                    {positive ? "+" : ""}
                    {avg.toFixed(2)}% avg
                  </span>
                </div>
                <p className="mb-4 text-sm text-muted-foreground">{meta.blurb}</p>
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full min-w-[480px] text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                        <th className="px-4 py-3 font-semibold">Symbol</th>
                        <th className="px-4 py-3 font-semibold">Name</th>
                        <th className="px-4 py-3 text-right font-semibold">Last</th>
                        <th className="px-4 py-3 text-right font-semibold">Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      {g.items.map((i) => {
                        const up = i.changePct >= 0
                        return (
                          <tr
                            key={i.slug}
                            className="border-b border-border last:border-0 hover:bg-muted/40"
                          >
                            <td className="px-4 py-3 font-mono font-semibold">
                              <Link
                                href={`/instrument/${i.slug}`}
                                className="hover:underline"
                              >
                                {i.symbol}
                              </Link>
                            </td>
                            <td className="px-4 py-3 text-muted-foreground">
                              {i.name}
                            </td>
                            <td className="px-4 py-3 text-right font-medium">
                              {i.price}
                            </td>
                            <td
                              className={`px-4 py-3 text-right font-semibold ${up ? "text-up" : "text-down"}`}
                            >
                              {up ? "+" : ""}
                              {i.changePct.toFixed(2)}%
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </section>
            )
          })}
        </div>

        <p className="mt-10 text-xs text-muted-foreground">
          Prices shown are illustrative demo content. Group averages are simple
          unweighted means of the instruments tracked on this site.
        </p>
      </main>
      <Footer />
    </div>
  )
}
