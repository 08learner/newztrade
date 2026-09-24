import type { Metadata } from "next"
import Link from "next/link"
import { getArticles, getMarketEvents } from "@/lib/content"
import { Header } from "@/components/newztrade/Header"
import { Footer } from "@/components/newztrade/Footer"
import { Coins, TrendingUp } from "lucide-react"

export const metadata: Metadata = {
  title: "Dividend Tracker — NEPSE & Global Payouts",
  description:
    "Track dividend announcements, book-closure dates and payout seasons for NEPSE-listed companies and global dividend payers.",
}

const DIVIDEND_KEYWORDS = ["dividend", "payout", "book closure", "bonus share"]

export default async function DividendsPage() {
  const [articles, events] = await Promise.all([
    getArticles(),
    getMarketEvents(),
  ])
  const dividendArticles = articles
    .filter((a) => {
      const text = `${a.title} ${a.excerpt}`.toLowerCase()
      return DIVIDEND_KEYWORDS.some((k) => text.includes(k))
    })
    .slice(0, 6)
  const earningsEvents = [...events]
    .filter((e) => e.type === "Earnings")
    .sort((a, b) => a.date.localeCompare(b.date))

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="max-w-2xl">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-up">
            <Coins className="size-4" /> Dividend Tracker
          </p>
          <h1 className="mt-3 font-serif text-3xl sm:text-4xl font-bold tracking-tight">
            Dividends and payout season
          </h1>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Dividend announcements, bonus-share proposals and the earnings
            dates that set them — for NEPSE investors and global income
            portfolios.
          </p>
        </div>

        <section className="mt-10">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 border-foreground pb-3 mb-4">
            Earnings dates to watch
          </h2>
          {earningsEvents.length > 0 ? (
            <ol className="space-y-3">
              {earningsEvents.map((e) => (
                <li
                  key={`${e.date}-${e.title}`}
                  className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 sm:p-5"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-up-soft text-up">
                    <TrendingUp className="size-4" />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">{e.title}</h3>
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {e.date}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      {e.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-sm text-muted-foreground">
              No earnings dates in the current calendar.
            </p>
          )}
        </section>

        <section className="mt-12">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 border-foreground pb-3 mb-6">
            Dividend coverage
          </h2>
          {dividendArticles.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {dividendArticles.map((a) => (
                <Link
                  key={a.slug}
                  href={`/news/${a.slug}`}
                  className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-foreground"
                >
                  <p className="text-[11px] font-bold uppercase tracking-widest text-up">
                    {a.category}
                  </p>
                  <h3 className="mt-2 font-semibold leading-snug group-hover:underline">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                    {a.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No dividend stories yet — new coverage appears here as it is
              published.
            </p>
          )}
        </section>

        <div className="mt-12 rounded-xl border border-border bg-muted/50 p-6 text-sm text-muted-foreground leading-relaxed">
          <p className="font-semibold text-foreground">
            Cash vs. bonus shares on NEPSE
          </p>
          <p className="mt-2">
            Nepali companies commonly distribute both cash dividends and bonus
            shares. Bonus shares increase your holding but are taxable at
            distribution, while cash dividends are credited after book closure.
            New to dividends? Start with{" "}
            <Link
              href="/learn/dividend"
              className="font-medium text-up hover:underline"
            >
              What is a dividend?
            </Link>
          </p>
          <p className="mt-2 text-xs">
            Dates and coverage shown are illustrative demo content, not
            investment advice.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
