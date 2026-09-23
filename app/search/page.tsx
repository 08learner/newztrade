import Link from "next/link"
import type { Metadata } from "next"
import { searchAll } from "@/lib/data"
import { digests } from "@/lib/digest"
import { Header } from "@/components/newztrade/Header"
import { Footer } from "@/components/newztrade/Footer"
import { ArticleCard } from "@/components/newztrade/ArticleCard"
import { ArrowDownRight, ArrowUpRight, Search as SearchIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "Search",
  description: "Search NewzTrade articles, instruments, digests and guides.",
  robots: { index: false },
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q = "" } = await searchParams
  const query = q.trim()
  const results = searchAll(query)
  const digestMatches = query
    ? digests.filter((d) => {
        const hay = `${d.title} ${d.summary.join(" ")} ${d.keywords.join(" ")}`.toLowerCase()
        return hay.includes(query.toLowerCase())
      })
    : []
  const total =
    results.articles.length +
    results.instruments.length +
    results.glossary.length +
    digestMatches.length

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-up">
          <SearchIcon className="size-4" /> Search
        </p>
        <h1 className="mt-3 font-serif text-3xl sm:text-4xl font-bold tracking-tight">
          {query ? (
            <>
              Results for <span className="text-up">“{query}”</span>
            </>
          ) : (
            "Search NewzTrade"
          )}
        </h1>

        <form action="/search" method="get" className="mt-6 max-w-xl">
          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 focus-within:border-foreground/40 transition-colors">
            <SearchIcon className="size-4 text-muted-foreground shrink-0" />
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Try “NEPSE”, “Nabil”, “Bitcoin”…"
              aria-label="Search query"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-foreground px-4 py-1.5 text-xs font-semibold text-background hover:opacity-90 transition-opacity"
            >
              Search
            </button>
          </div>
        </form>

        {query && total === 0 && (
          <div className="mt-12 rounded-xl border border-dashed border-border bg-card p-10 text-center">
            <h2 className="font-serif text-xl font-bold">No matches found</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a different keyword — a company symbol, a market, or a topic like
              “dividend”.
            </p>
          </div>
        )}

        {results.instruments.length > 0 && (
          <section className="mt-12">
            <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 border-foreground pb-3 mb-6">
              Instruments
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {results.instruments.map((i) => {
                const up = i.changePct >= 0
                const Icon = up ? ArrowUpRight : ArrowDownRight
                return (
                  <Link
                    key={i.slug}
                    href={`/instrument/${i.slug}`}
                    className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-foreground/30"
                  >
                    <div className="min-w-0">
                      <span className="font-ticker font-semibold">{i.symbol}</span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {i.name}
                      </span>
                    </div>
                    <span
                      className={`inline-flex items-center gap-0.5 shrink-0 font-ticker text-sm font-semibold ${
                        up ? "text-up" : "text-down"
                      }`}
                    >
                      <Icon className="size-3.5" />
                      {up ? "+" : ""}
                      {i.changePct.toFixed(2)}%
                    </span>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {results.articles.length > 0 && (
          <section className="mt-12">
            <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 border-foreground pb-3 mb-6">
              Articles
            </h2>
            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {results.articles.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </section>
        )}

        {digestMatches.length > 0 && (
          <section className="mt-12">
            <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 border-foreground pb-3 mb-6">
              Daily Digests
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {digestMatches.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/daily/${d.slug}`}
                    className="block rounded-lg border border-border bg-card p-4 transition-colors hover:border-foreground/30"
                  >
                    <span className="text-[11px] font-bold uppercase tracking-widest text-up">
                      {d.kind === "nepse-today" ? "NEPSE Today" : "Market Wrap"}
                    </span>
                    <h3 className="mt-1 font-serif text-lg font-bold leading-snug">
                      {d.title}
                    </h3>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {d.dateLabel}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {results.glossary.length > 0 && (
          <section className="mt-12">
            <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 border-foreground pb-3 mb-6">
              Learn
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {results.glossary.map((t) => (
                <Link
                  key={t.slug}
                  href={`/learn/${t.slug}`}
                  className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-foreground/30"
                >
                  <h3 className="font-semibold">{t.term}</h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {t.definition}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}
