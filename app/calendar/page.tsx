import type { Metadata } from "next"
import type { MarketEventType } from "@/lib/data"
import { getMarketEvents } from "@/lib/content"
import { Header } from "@/components/newztrade/Header"
import { Footer } from "@/components/newztrade/Footer"
import { CalendarDays, Landmark, PartyPopper, TrendingUp, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Market Calendar — Earnings, Holidays & Events",
  description:
    "Upcoming market events: NEPSE holidays, earnings dates, central-bank decisions and IPO windows that move markets in Nepal and worldwide.",
}

const typeStyle: Record<
  MarketEventType,
  { icon: typeof TrendingUp; classes: string }
> = {
  Earnings: {
    icon: TrendingUp,
    classes: "bg-up-soft text-up",
  },
  Holiday: {
    icon: PartyPopper,
    classes: "bg-down-soft text-down",
  },
  Macro: {
    icon: Landmark,
    classes: "bg-muted text-muted-foreground",
  },
  IPO: {
    icon: FileText,
    classes: "bg-muted text-foreground",
  },
}

function formatEventDate(iso: string): { day: string; month: string; dow: string } {
  const d = new Date(`${iso}T00:00:00Z`)
  return {
    day: String(d.getUTCDate()),
    month: d.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" }),
    dow: d.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" }),
  }
}

export default async function CalendarPage() {
  const marketEvents = await getMarketEvents()
  const sorted = [...marketEvents].sort((a, b) => a.date.localeCompare(b.date))
  const today = new Date().toISOString().slice(0, 10)
  const upcoming = sorted.filter((e) => e.date >= today)
  const featured = upcoming[0]
  const rest = upcoming.slice(1)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="max-w-2xl">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-up">
            <CalendarDays className="size-4" /> Market Calendar
          </p>
          <h1 className="mt-3 font-serif text-3xl sm:text-4xl font-bold tracking-tight">
            Dates that move markets
          </h1>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Upcoming earnings, NEPSE holidays, central-bank decisions and IPO
            windows — in one place.
          </p>
        </div>

        {featured && (
          <div className="mt-10 rounded-xl border-2 border-foreground bg-card p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-widest text-up">
              Next up
            </p>
            <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
              <div className="flex items-baseline gap-2 shrink-0">
                <span className="font-serif text-5xl font-bold">
                  {formatEventDate(featured.date).day}
                </span>
                <span className="text-lg text-muted-foreground">
                  {formatEventDate(featured.date).month}{" "}
                  {formatEventDate(featured.date).dow}
                </span>
              </div>
              <div>
                <h2 className="font-serif text-2xl font-bold tracking-tight">
                  {featured.title}
                </h2>
                <p className="mt-1 text-muted-foreground">{featured.description}</p>
                <EventBadge type={featured.type} className="mt-3" />
              </div>
            </div>
          </div>
        )}

        <ol className="mt-10 space-y-3">
          {rest.map((e) => {
            const d = formatEventDate(e.date)
            return (
              <li
                key={`${e.date}-${e.title}`}
                className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 sm:p-5"
              >
                <div className="grid w-14 shrink-0 place-items-center rounded-lg bg-muted py-2 text-center">
                  <span className="font-serif text-xl font-bold leading-none">
                    {d.day}
                  </span>
                  <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {d.month}
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold">{e.title}</h3>
                    <EventBadge type={e.type} />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    {e.description}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>

        <p className="mt-10 text-xs text-muted-foreground">
          Dates shown are illustrative demo content and may change. Always confirm
          with official exchange and company notices.
        </p>
      </main>
      <Footer />
    </div>
  )
}

function EventBadge({ type, className = "" }: { type: MarketEventType; className?: string }) {
  const style = typeStyle[type]
  const Icon = style.icon
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${style.classes} ${className}`}
    >
      <Icon className="size-3" />
      {type}
    </span>
  )
}
