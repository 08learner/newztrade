import Link from "next/link"
import type { Metadata } from "next"
import { digests, getDigestBySlug } from "@/lib/digest"
import { getInstrumentBySymbol } from "@/lib/data"
import { Header } from "@/components/newztrade/Header"
import { Footer } from "@/components/newztrade/Footer"
import { ArticleCard } from "@/components/newztrade/ArticleCard"
import { NotFoundBlock } from "@/components/newztrade/NotFoundBlock"
import { ArrowLeft, CalendarDays, TrendingDown, TrendingUp } from "lucide-react"

export async function generateStaticParams() {
  return digests.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const digest = getDigestBySlug(slug)
  if (!digest) return { title: "Digest not found — NewzTrade" }
  return {
    title: `${digest.title} — NewzTrade Daily`,
    description: digest.summary[0],
    keywords: digest.keywords,
    openGraph: { title: digest.title, description: digest.summary[0], type: "article" },
  }
}

export default async function DailyDigestPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const digest = getDigestBySlug(slug)

  if (!digest) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <NotFoundBlock
          title="Digest not found"
          message="We couldn't find that daily digest. Check the homepage for the latest edition."
        />
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <article className="mx-auto max-w-7xl px-4 sm:px-6 pt-8 pb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" /> NewzTrade
          </Link>

          <div className="mt-6 border-b-2 border-foreground pb-6">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-up">
              <CalendarDays className="size-4" />
              NewzTrade Daily · {digest.kind === "nepse-today" ? "NEPSE Today" : "Market Wrap"}
            </p>
            <h1 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              {digest.title}
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">{digest.dateLabel}</p>
          </div>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_320px] items-start">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 border-foreground pb-3 mb-6">
                Summary
              </h2>
              {digest.summary.map((paragraph, i) => (
                <p
                  key={i}
                  className="mt-5 text-lg leading-relaxed text-foreground first:mt-0"
                >
                  {paragraph}
                </p>
              ))}

              <section className="mt-12">
                <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 border-foreground pb-3 mb-8">
                  Related Stories
                </h2>
                <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
                  {digest.stories.map((a) => (
                    <ArticleCard key={a.slug} article={a} />
                  ))}
                </div>
              </section>
            </div>

            <aside>
              <h3 className="text-sm font-bold uppercase tracking-widest border-b-2 border-foreground pb-3">
                Key Levels
              </h3>
              <div className="mt-4 rounded-xl bg-[#101418] border border-white/10 p-5">
                <ul>
                  {digest.quotes.map((q) => {
                    const up = q.changePct >= 0
                    const Icon = up ? TrendingUp : TrendingDown
                    const instrument = getInstrumentBySymbol(q.symbol)
                    return (
                      <li
                        key={q.symbol}
                        className="flex items-center justify-between gap-3 py-2.5 border-b border-white/10 last:border-0"
                      >
                        <div>
                          {instrument ? (
                            <Link
                              href={`/instrument/${instrument.slug}`}
                              className="text-sm font-semibold text-white hover:text-emerald-400 hover:underline underline-offset-2 transition-colors"
                            >
                              {q.symbol}
                            </Link>
                          ) : (
                            <p className="text-sm font-semibold text-white">{q.symbol}</p>
                          )}
                          <p className="text-xs text-white/50">{q.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-ticker text-sm text-white tabular-nums">{q.price}</p>
                          <p
                            className={`flex items-center justify-end gap-1 font-ticker text-xs tabular-nums ${
                              up ? "text-emerald-400" : "text-red-400"
                            }`}
                          >
                            <Icon className="size-3" />
                            {up ? "+" : ""}
                            {q.changePct.toFixed(2)}%
                          </p>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>

              <h3 className="mt-8 text-sm font-bold uppercase tracking-widest border-b-2 border-foreground pb-3">
                Recent Digests
              </h3>
              <ul className="mt-4 space-y-3">
                {digests
                  .filter((d) => d.slug !== digest.slug)
                  .slice(0, 5)
                  .map((d) => (
                    <li key={d.slug}>
                      <Link
                        href={`/daily/${d.slug}`}
                        className="group block text-sm font-medium hover:text-up transition-colors"
                      >
                        {d.title}
                        <span className="block text-xs text-muted-foreground font-normal mt-0.5">
                          {d.dateLabel}
                        </span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </aside>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
