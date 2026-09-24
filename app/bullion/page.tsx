import type { Metadata } from "next"
import Link from "next/link"
import { getInstruments, getArticlesByCategoryAsync } from "@/lib/content"
import { Header } from "@/components/newztrade/Header"
import { Footer } from "@/components/newztrade/Footer"
import { ArticleCard } from "@/components/newztrade/ArticleCard"
import { Gem, TrendingUp, TrendingDown } from "lucide-react"

export const metadata: Metadata = {
  title: "Gold & Silver — Bullion Prices for Nepal",
  description:
    "Gold and silver prices in context: global spot benchmarks, what drives bullion in Nepal, and the latest precious-metals coverage.",
}

export default async function BullionPage() {
  const [instruments, commoditiesArticles] = await Promise.all([
    getInstruments(),
    getArticlesByCategoryAsync("Commodities"),
  ])
  const metals = instruments.filter(
    (i) =>
      i.market === "Commodities" &&
      /gold|silver|xau|xag/i.test(`${i.symbol} ${i.name}`)
  )
  const coverage = commoditiesArticles.slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="max-w-2xl">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-up">
            <Gem className="size-4" /> Gold &amp; Silver
          </p>
          <h1 className="mt-3 font-serif text-3xl sm:text-4xl font-bold tracking-tight">
            Bullion prices in focus
          </h1>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Gold is Nepal&apos;s favorite store of value — from wedding seasons
            to safe-haven flows. Track the global benchmarks and the local
            drivers in one place.
          </p>
        </div>

        <section className="mt-10">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 border-foreground pb-3 mb-4">
            Precious metals board
          </h2>
          {metals.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {metals.map((m) => {
                const up = m.changePct >= 0
                return (
                  <Link
                    key={m.slug}
                    href={`/instrument/${m.slug}`}
                    className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-foreground"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-sm font-semibold text-muted-foreground">
                        {m.symbol}
                      </span>
                      <span
                        className={`flex items-center gap-1 text-sm font-semibold ${up ? "text-up" : "text-down"}`}
                      >
                        {up ? (
                          <TrendingUp className="size-4" />
                        ) : (
                          <TrendingDown className="size-4" />
                        )}
                        {up ? "+" : ""}
                        {m.changePct.toFixed(2)}%
                      </span>
                    </div>
                    <h3 className="mt-2 font-serif text-xl font-bold tracking-tight group-hover:underline">
                      {m.name}
                    </h3>
                    <p className="mt-1 font-serif text-3xl font-bold">{m.price}</p>
                    <p className="mt-3 text-sm text-muted-foreground line-clamp-3">
                      {m.blurb}
                    </p>
                  </Link>
                )
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No precious-metals instruments are currently tracked.
            </p>
          )}
        </section>

        {coverage.length > 0 && (
          <section className="mt-12">
            <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 border-foreground pb-3 mb-6">
              Commodities coverage
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {coverage.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </section>
        )}

        <div className="mt-12 rounded-xl border border-border bg-muted/50 p-6 text-sm text-muted-foreground leading-relaxed">
          <p className="font-semibold text-foreground">
            How gold is priced in Nepal
          </p>
          <p className="mt-2">
            Local gold prices are set daily by the Federation of Nepal Gold and
            Silver Dealers&apos; Association, based on the global spot price,
            the USD/NPR rate, and import duties. Hallmark (24K) and traditional
            (tejabi) gold are quoted separately per tola (≈11.66 g).
          </p>
          <p className="mt-2 text-xs">
            Prices shown are illustrative demo content. Verify official rates
            before buying or selling.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
