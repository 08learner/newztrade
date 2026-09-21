import Link from "next/link"
import type { Metadata } from "next"
import {
  getInstrumentBySlug,
  getRelatedArticles,
  instruments,
  numericPrice,
  sparklinePoints,
} from "@/lib/data"
import { Header } from "@/components/newztrade/Header"
import { Footer } from "@/components/newztrade/Footer"
import { ArticleCard } from "@/components/newztrade/ArticleCard"
import { NotFoundBlock } from "@/components/newztrade/NotFoundBlock"
import { ArrowLeft, TrendingDown, TrendingUp } from "lucide-react"

export async function generateStaticParams() {
  return instruments.map((i) => ({ symbol: i.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ symbol: string }>
}): Promise<Metadata> {
  const { symbol } = await params
  const instrument = getInstrumentBySlug(symbol)
  if (!instrument) return { title: "Instrument not found — NewzTrade" }
  const title = `${instrument.name} (${instrument.symbol}) Price Today — NewzTrade`
  return {
    title,
    description: instrument.blurb,
    keywords: instrument.keywords,
    openGraph: { title, description: instrument.blurb, type: "article" },
  }
}

function Sparkline({ points, up }: { points: number[]; up: boolean }) {
  const min = Math.min(...points)
  const max = Math.max(...points)
  const range = max - min || 1
  const width = 560
  const height = 160
  const step = width / (points.length - 1)
  const path = points
    .map(
      (p, i) =>
        `${i === 0 ? "M" : "L"}${(i * step).toFixed(1)},${(
          height -
          ((p - min) / range) * (height - 16) -
          8
        ).toFixed(1)}`
    )
    .join(" ")
  const color = up ? "#0a8a4a" : "#d4303e"
  const fillId = `spark-fill-${up ? "up" : "down"}`
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-40"
      role="img"
      aria-label="30-period price sparkline"
    >
      <defs>
        <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${path} L${width},${height} L0,${height} Z`} fill={`url(#${fillId})`} />
      <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  )
}

export default async function InstrumentPage({
  params,
}: {
  params: Promise<{ symbol: string }>
}) {
  const { symbol } = await params
  const instrument = getInstrumentBySlug(symbol)

  if (!instrument) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <NotFoundBlock
          title="Instrument not found"
          message="We couldn't find that market instrument. Browse the movers on the homepage."
        />
        <Footer />
      </div>
    )
  }

  const up = instrument.changePct >= 0
  const points = sparklinePoints(instrument.slug, numericPrice(instrument.price))
  const related = getRelatedArticles(instrument).slice(0, 3)
  const Icon = up ? TrendingUp : TrendingDown

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: `${instrument.name} (${instrument.symbol})`,
    description: instrument.blurb,
    provider: { "@type": "Organization", name: "NewzTrade" },
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 pt-8 pb-16">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" /> NewzTrade
        </Link>

        {/* Price header */}
        <div className="mt-6 border-b-2 border-foreground pb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-up">
            {instrument.market}
          </p>
          <h1 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
            {instrument.name} Share Price Today
          </h1>
          <div className="mt-4 flex items-end gap-4">
            <span className="font-ticker text-4xl sm:text-5xl font-semibold tabular-nums tracking-tight">
              {instrument.price}
            </span>
            <span
              className={`flex items-center gap-1.5 pb-1.5 font-ticker text-xl tabular-nums ${
                up ? "text-up" : "text-down"
              }`}
            >
              <Icon className="size-6" />
              {up ? "+" : ""}
              {instrument.changePct.toFixed(2)}%
            </span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {instrument.symbol} · Illustrative demo quote · Not investment advice
          </p>
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_360px] items-start">
          <div>
            {/* Sparkline */}
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 border-foreground pb-3 mb-6">
                30-Day Trend
              </h2>
              <div className="rounded-xl border border-border bg-card p-5">
                <Sparkline points={points} up={up} />
                <div className="mt-2 flex justify-between text-xs text-muted-foreground font-ticker tabular-nums">
                  <span>Low {Math.min(...points).toLocaleString()}</span>
                  <span>High {Math.max(...points).toLocaleString()}</span>
                </div>
              </div>
            </section>

            {/* About / SEO copy */}
            <section className="mt-12">
              <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 border-foreground pb-3 mb-6">
                About {instrument.name}
              </h2>
              <p className="text-lg leading-relaxed text-foreground">{instrument.blurb}</p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Follow {instrument.symbol} coverage on NewzTrade for daily movement, sector
                context, and related market stories. Quotes on this page are illustrative demo
                data while live market feeds are being connected.
              </p>
            </section>
          </div>

          {/* Related stories */}
          <aside>
            <h3 className="text-sm font-bold uppercase tracking-widest border-b-2 border-foreground pb-3 mb-6">
              Related News
            </h3>
            {related.length > 0 ? (
              <div className="space-y-8">
                {related.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No related stories yet — check back after the next digest.
              </p>
            )}
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  )
}
