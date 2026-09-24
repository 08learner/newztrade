import type { Metadata } from "next"
import Link from "next/link"
import { getMarketEvents, getArticlesByCategoryAsync } from "@/lib/content"
import { Header } from "@/components/newztrade/Header"
import { Footer } from "@/components/newztrade/Footer"
import { ArticleCard } from "@/components/newztrade/ArticleCard"
import { Rocket, FileText, CalendarDays } from "lucide-react"

export const metadata: Metadata = {
  title: "IPO Corner — Upcoming & Recent IPOs",
  description:
    "NEPSE IPO corner: upcoming initial public offering windows, recent listings and how to apply, plus IPO news from Nepal and global markets.",
}

export default async function IpoPage() {
  const [events, nepseArticles] = await Promise.all([
    getMarketEvents(),
    getArticlesByCategoryAsync("NEPSE"),
  ])
  const ipoEvents = [...events]
    .filter((e) => e.type === "IPO")
    .sort((a, b) => a.date.localeCompare(b.date))
  const today = new Date().toISOString().slice(0, 10)
  const upcoming = ipoEvents.filter((e) => e.date >= today)
  const recent = ipoEvents.filter((e) => e.date < today)
  const ipoNews = nepseArticles.slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="max-w-2xl">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-up">
            <Rocket className="size-4" /> IPO Corner
          </p>
          <h1 className="mt-3 font-serif text-3xl sm:text-4xl font-bold tracking-tight">
            Upcoming and recent IPOs
          </h1>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Track initial public offering windows on NEPSE and abroad — open
            dates, expected allocations and the stories behind each listing.
          </p>
        </div>

        <section className="mt-10">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 border-foreground pb-3 mb-4">
            Upcoming windows
          </h2>
          {upcoming.length > 0 ? (
            <ol className="grid gap-3 sm:grid-cols-2">
              {upcoming.map((e) => (
                <li
                  key={`${e.date}-${e.title}`}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-up">
                    <CalendarDays className="size-3.5" /> {e.date}
                  </p>
                  <h3 className="mt-2 font-semibold">{e.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    {e.description}
                  </p>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-sm text-muted-foreground">
              No upcoming IPO windows in the current calendar — check back after
              the next regulatory announcements.
            </p>
          )}
        </section>

        {recent.length > 0 && (
          <section className="mt-10">
            <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 border-foreground pb-3 mb-4">
              Recently listed
            </h2>
            <ol className="space-y-3">
              {recent.map((e) => (
                <li
                  key={`${e.date}-${e.title}`}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {e.date}
                  </p>
                  <h3 className="mt-2 font-semibold">{e.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    {e.description}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        )}

        {ipoNews.length > 0 && (
          <section className="mt-12">
            <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 border-foreground pb-3 mb-6">
              NEPSE news for IPO watchers
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {ipoNews.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </section>
        )}

        <div className="mt-12 rounded-xl border border-border bg-muted/50 p-6 text-sm text-muted-foreground leading-relaxed">
          <p className="flex items-center gap-2 font-semibold text-foreground">
            <FileText className="size-4" /> How IPO applications work in Nepal
          </p>
          <p className="mt-2">
            Most NEPSE IPOs are applied through Mero Share with ASBA-enabled
            bank accounts. Retail applicants typically apply for the minimum
            unit, and allotment is done by lottery when issues are
            oversubscribed. Read our{" "}
            <Link href="/learn" className="font-medium text-up hover:underline">
              Learn explainers
            </Link>{" "}
            for step-by-step guides.
          </p>
          <p className="mt-2 text-xs">
            Dates and details shown are illustrative demo content. Always verify
            with the issuing company and CDSC.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
