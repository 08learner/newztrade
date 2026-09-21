import Link from "next/link"
import { currentDigests } from "@/lib/digest"
import { CalendarDays, ChevronRight } from "lucide-react"

export function DailyDigestStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-14">
      <div className="flex items-baseline justify-between border-b-2 border-foreground pb-3 mb-6">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
          <CalendarDays className="size-4 text-up" />
          Daily Digest
        </h2>
        <Link
          href="/daily"
          className="text-xs font-semibold text-up hover:underline underline-offset-4"
        >
          View archive
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {currentDigests.map((d) => (
          <Link
            key={d.slug}
            href={`/daily/${d.slug}`}
            className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-5 py-5 hover:border-up/50 hover:shadow-sm transition-all"
          >
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-up">
                {d.kind === "nepse-today" ? "NEPSE Today" : "Market Wrap"}
              </p>
              <p className="mt-1.5 font-serif text-lg font-semibold leading-snug group-hover:underline underline-offset-2">
                {d.title}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{d.dateLabel}</p>
            </div>
            <ChevronRight className="size-5 shrink-0 text-muted-foreground group-hover:text-up group-hover:translate-x-1 transition-all" />
          </Link>
        ))}
      </div>
    </section>
  )
}
