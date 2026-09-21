import { movers } from "@/lib/data"
import { TrendingDown, TrendingUp } from "lucide-react"

function MoverTable({
  title,
  tone,
  rows,
}: {
  title: string
  tone: "up" | "down"
  rows: { symbol: string; name: string; price: string; changePct: number }[]
}) {
  const Icon = tone === "up" ? TrendingUp : TrendingDown
  return (
    <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
      <h3
        className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest ${
          tone === "up" ? "text-up" : "text-down"
        }`}
      >
        <Icon className="size-4" strokeWidth={2.5} />
        {title}
      </h3>
      <ul className="mt-4 divide-y divide-border">
        {rows.map((m) => (
          <li key={m.symbol} className="flex items-center justify-between gap-3 py-3">
            <div className="min-w-0">
              <p className="text-sm font-semibold">{m.symbol}</p>
              <p className="text-xs text-muted-foreground truncate">{m.name}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="font-ticker text-sm tabular-nums">{m.price}</p>
              <p
                className={`font-ticker text-xs tabular-nums ${
                  tone === "up" ? "text-up" : "text-down"
                }`}
              >
                {m.changePct > 0 ? "+" : ""}
                {m.changePct.toFixed(2)}%
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Movers() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
      <div className="flex items-baseline justify-between border-b-2 border-foreground pb-3 mb-8">
        <h2 className="text-sm font-bold uppercase tracking-widest">Market Movers</h2>
        <span className="text-xs text-muted-foreground">Across NEPSE & global markets</span>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <MoverTable title="Top Gainers" tone="up" rows={movers.gainers} />
        <MoverTable title="Top Losers" tone="down" rows={movers.losers} />
      </div>
    </section>
  )
}
