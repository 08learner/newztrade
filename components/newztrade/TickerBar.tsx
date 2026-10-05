import Link from "next/link"
import { getInstruments, getTickerQuotes } from "@/lib/content"
import type { Quote } from "@/lib/data"
import { TrendingDown, TrendingUp } from "lucide-react"

function TickerItem({
  symbol,
  price,
  changePct,
  href,
}: {
  symbol: string
  price: string
  changePct: number
  href: string
}) {
  const up = changePct >= 0
  return (
    <Link
      href={href}
      className="flex items-center gap-2.5 px-5 py-2 shrink-0 hover:bg-white/5 transition-colors">
      <span className="text-[11px] font-semibold tracking-wide text-white/90 uppercase">
        {symbol}
      </span>
      <span className="font-ticker text-[13px] text-white tabular-nums">{price}</span>
      <span
        className={`flex items-center gap-1 font-ticker text-[12px] tabular-nums ${
          up ? "text-emerald-400" : "text-red-400"
        }`}
      >
        {up ? (
          <TrendingUp className="size-3" strokeWidth={2.5} />
        ) : (
          <TrendingDown className="size-3" strokeWidth={2.5} />
        )}
        {up ? "+" : ""}
        {changePct.toFixed(2)}%
      </span>
    </Link>
  )
}

export async function TickerBar() {
  const [quotes, instruments] = await Promise.all([getTickerQuotes(), getInstruments()])
  const slugBySymbol = new Map(instruments.map((i) => [i.symbol, i.slug]))
  const items: Quote[] = [...quotes, ...quotes]
  return (
    <div className="bg-[#101418] overflow-hidden" aria-label="Live market ticker">
      <div className="ticker-track flex w-max">
        {items.map((q, i) => {
          const slug = slugBySymbol.get(q.symbol)
          return (
            <TickerItem
              key={`${q.symbol}-${i}`}
              {...q}
              href={slug ? `/instrument/${slug}` : "/"}
            />
          )
        })}
      </div>
      <p className="border-t border-white/5 px-4 py-1 text-center text-[10px] tracking-wide text-white/50">
        Markets open Sunday–Thursday, 11:00–15:00 NPT
      </p>
    </div>
  )
}
