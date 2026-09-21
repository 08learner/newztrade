import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import {
  categoryInfo,
  isValidCategory,
  allArticles,
  getArticlesByCategory,
  tickerQuotes,
  nepseSnapshot,
  type Category,
} from "@/lib/data"
import { Header } from "@/components/newztrade/Header"
import { Footer } from "@/components/newztrade/Footer"
import { ArticleCard } from "@/components/newztrade/ArticleCard"
import { NotFoundBlock } from "@/components/newztrade/NotFoundBlock"
import { ArrowUpRight, Clock, TrendingDown, TrendingUp } from "lucide-react"

const categoryQuotes: Record<string, string[]> = {
  stocks: ["S&P 500", "NASDAQ", "NIFTY 50", "FTSE 100"],
  crypto: ["BTC/USD", "ETH/USD", "SOL/USD"],
  forex: ["USD/NPR", "EUR/USD", "USD/JPY"],
  commodities: ["XAU/USD", "BRENT"],
  analysis: ["S&P 500", "BTC/USD", "XAU/USD"],
  markets: ["NEPSE", "S&P 500", "BTC/USD", "XAU/USD", "USD/NPR"],
  nepse: [],
}

function QuoteRow({
  q,
}: {
  q: { symbol: string; name: string; price: string; changePct: number }
}) {
  const up = q.changePct >= 0
  const Icon = up ? TrendingUp : TrendingDown
  return (
    <li className="flex items-center justify-between gap-3 py-2.5 border-b border-white/10 last:border-0">
      <div>
        <p className="text-sm font-semibold text-white">{q.symbol}</p>
        <p className="text-xs text-white/50">{q.name}</p>
      </div>
      <div className="text-right">
        <p className="font-ticker text-sm text-white tabular-nums">{q.price}</p>
        <p
          className={`font-ticker text-xs tabular-nums ${
            up ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {up ? "+" : ""}
          {q.changePct.toFixed(2)}%
        </p>
      </div>
    </li>
  )
}

function NepseSnapshot() {
  const up = nepseSnapshot.changePct >= 0
  const Icon = up ? TrendingUp : TrendingDown
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-5 sm:p-6">
      <p className="text-[11px] uppercase tracking-widest text-white/50">NEPSE Index</p>
      <div className="mt-2 flex items-end gap-3">
        <span className="font-ticker text-3xl text-white tabular-nums tracking-tight">
          {nepseSnapshot.index}
        </span>
        <span
          className={`flex items-center gap-1 pb-1 font-ticker text-sm tabular-nums ${
            up ? "text-emerald-400" : "text-red-400"
          }`}
        >
          <Icon className="size-4" />
          {up ? "+" : ""}
          {nepseSnapshot.changePct.toFixed(2)}%
        </span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-white/10 border border-white/10">
        <div className="bg-[#101418] px-3 py-3">
          <p className="text-[10px] uppercase tracking-wider text-white/45">Turnover</p>
          <p className="mt-1 font-ticker text-sm text-white tabular-nums">
            {nepseSnapshot.turnover}
          </p>
        </div>
        <div className="bg-[#101418] px-3 py-3">
          <p className="text-[10px] uppercase tracking-wider text-white/45">Advancers</p>
          <p className="mt-1 font-ticker text-sm text-emerald-400 tabular-nums">
            {nepseSnapshot.advancers}
          </p>
        </div>
        <div className="bg-[#101418] px-3 py-3">
          <p className="text-[10px] uppercase tracking-wider text-white/45">Decliners</p>
          <p className="mt-1 font-ticker text-sm text-red-400 tabular-nums">
            {nepseSnapshot.decliners}
          </p>
        </div>
        <div className="bg-[#101418] px-3 py-3">
          <p className="text-[10px] uppercase tracking-wider text-white/45">Unchanged</p>
          <p className="mt-1 font-ticker text-sm text-white tabular-nums">
            {nepseSnapshot.unchanged}
          </p>
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  return Object.keys(categoryInfo).map((category) => ({ category }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category } = await params
  if (!isValidCategory(category)) return { title: "Not found — NewzTrade" }
  const info = categoryInfo[category]
  return {
    title: `${info.label} News — NewzTrade`,
    description: info.tagline,
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params

  if (!isValidCategory(category)) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <NotFoundBlock
          title="Section not found"
          message="We couldn't find that market section. Try one of the links above."
        />
        <Footer />
      </div>
    )
  }

  const info = categoryInfo[category]
  const isMarkets = info.label === "Markets"
  const stories = isMarkets
    ? allArticles
    : getArticlesByCategory(info.label as Category)
  const featured = stories[0]
  const rest = stories.slice(1)
  const quotes = categoryQuotes[category] || []

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Section hero */}
        <section className="relative bg-[#101418] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-25">
            <Image
              src={info.image}
              alt={info.label}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20">
            <div className="max-w-3xl">
              <Link
                href="/"
                className="inline-flex items-center gap-1 text-xs text-white/60 hover:text-white transition-colors"
              >
                NewzTrade
              </Link>
              <h1 className="mt-3 font-serif text-4xl sm:text-5xl font-bold tracking-tight">
                {info.label}
              </h1>
              <p className="mt-3 text-lg text-white/70 leading-relaxed max-w-xl">
                {info.tagline}
              </p>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
          <div className="grid gap-12 lg:grid-cols-[1fr_320px] items-start">
            <div>
              {featured ? (
                <>
                  <div className="flex items-baseline justify-between border-b-2 border-foreground pb-3 mb-8">
                    <h2 className="text-sm font-bold uppercase tracking-widest">Featured</h2>
                    <span className="text-xs text-muted-foreground">
                      {stories.length} {stories.length === 1 ? "story" : "stories"}
                    </span>
                  </div>
                  <Link
                    href={`/news/${featured.slug}`}
                    className="group block cursor-pointer"
                  >
                    <div className="relative overflow-hidden rounded-xl aspect-[16/9] bg-muted">
                      <Image
                        src={featured.image}
                        alt={featured.title}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <span className="absolute top-4 left-4 rounded-full bg-up px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                        {featured.category}
                      </span>
                    </div>
                    <div className="mt-5 max-w-3xl">
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-tight group-hover:underline decoration-up decoration-2 underline-offset-4">
                        {featured.title}
                      </h3>
                      <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                        {featured.excerpt}
                      </p>
                      <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="size-3" /> {featured.readMinutes} min read
                      </p>
                    </div>
                  </Link>
                </>
              ) : (
                <div className="rounded-xl border border-border bg-card p-12 text-center">
                  <p className="text-muted-foreground">No stories in this section yet.</p>
                  <Link
                    href="/"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-up hover:gap-2 transition-all"
                  >
                    Back to homepage <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              )}

              {rest.length > 0 && (
                <section className="mt-14">
                  <div className="flex items-baseline justify-between border-b-2 border-foreground pb-3 mb-8">
                    <h2 className="text-sm font-bold uppercase tracking-widest">
                      Latest in {info.label}
                    </h2>
                  </div>
                  <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
                    {rest.map((a) => (
                      <ArticleCard key={a.slug} article={a} />
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar snapshot */}
            <aside className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-widest border-b-2 border-foreground pb-3">
                Snapshot
              </h3>
              {category === "nepse" ? (
                <NepseSnapshot />
              ) : (
                <div className="rounded-xl bg-[#101418] border border-white/10 p-5 sm:p-6">
                  <p className="text-[11px] uppercase tracking-widest text-white/50 mb-3">
                    {isMarkets ? "Global markets" : `${info.label} watchlist`}
                  </p>
                  {quotes.length > 0 ? (
                    <ul>
                      {quotes.map((symbol) => {
                        const q = tickerQuotes.find((t) => t.symbol === symbol)
                        return q ? <QuoteRow key={symbol} q={q} /> : null
                      })}
                    </ul>
                  ) : (
                    <p className="text-sm text-white/60">
                      No watchlist data for this section.
                    </p>
                  )}
                </div>
              )}
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
