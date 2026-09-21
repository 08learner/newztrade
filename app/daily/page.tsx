import Link from "next/link"
import type { Metadata } from "next"
import { digests } from "@/lib/digest"
import { Header } from "@/components/newztrade/Header"
import { Footer } from "@/components/newztrade/Footer"
import { CalendarDays, ChevronRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Daily Market Digests Archive — NewzTrade",
  description:
    "Every auto-generated NewzTrade daily digest: NEPSE Today summaries and global Market Wraps, archived by date.",
}

export default function DailyArchivePage() {
  const nepseDigests = digests.filter((d) => d.kind === "nepse-today")
  const wrapDigests = digests.filter((d) => d.kind === "market-wrap")

  const groups = [
    { label: "NEPSE Today", items: nepseDigests },
    { label: "Market Wrap", items: wrapDigests },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="border-b-2 border-foreground pb-6">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-up">
            <CalendarDays className="size-4" />
            NewzTrade Daily
          </p>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl font-bold tracking-tight">
            Digest Archive
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Every auto-generated market summary, archived by date — NEPSE Today for the Nepal
            Stock Exchange and the Market Wrap for global stocks, crypto and commodities.
          </p>
        </div>

        <div className="mt-12 grid gap-12 md:grid-cols-2">
          {groups.map((group) => (
            <section key={group.label}>
              <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 border-foreground pb-3 mb-6">
                {group.label}
              </h2>
              <ul className="space-y-1">
                {group.items.map((d) => (
                  <li key={d.slug}>
                    <Link
                      href={`/daily/${d.slug}`}
                      className="group flex items-center justify-between gap-4 rounded-lg px-3 py-3.5 hover:bg-muted transition-colors"
                    >
                      <div>
                        <p className="font-serif text-lg font-semibold leading-snug group-hover:underline underline-offset-2">
                          {d.title}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{d.dateLabel}</p>
                      </div>
                      <ChevronRight className="size-5 shrink-0 text-muted-foreground group-hover:text-up group-hover:translate-x-1 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
