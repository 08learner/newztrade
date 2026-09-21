import Link from "next/link"
import { getInstrumentBySymbol, tickerQuotes } from "@/lib/data"
import { TrendingDown, TrendingUp } from "lucide-react"

function TickerItem({
  symbol,
  price,
  changePct,
}: {
  symbol: string
  price: string
  changePct: number
}) {
  const up = changePct >= 0
  const instrument = getInstrumentBySymbol(symbol)
  return (
    <Link
      href={instrument ? `/instrument/${instrument.slug}` : "/"}
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

export function TickerBar() {
  const items = [...tickerQuotes, ...tickerQuotes]
  return (
    <div className="bg-[#101418] overflow-hidden" aria-label="Live market ticker">
      <div className="ticker-track flex w-max">
        {items.map((q, i) => (
          <TickerItem key={`${q.symbol}-${i}`} {...q} />
        ))}
      </div>
    </div>
  )
}
