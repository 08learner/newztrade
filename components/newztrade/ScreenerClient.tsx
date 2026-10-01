"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import type { Instrument } from "@/lib/data"
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronsUpDown,
  Search,
  Star,
} from "lucide-react"

const STORAGE_KEY = "nz-watchlist"

function loadWatchlist(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((s) => typeof s === "string") : []
  } catch {
    return []
  }
}

function priceValue(price: string): number {
  const n = Number.parseFloat(price.replace(/,/g, ""))
  return Number.isFinite(n) ? n : 0
}

function ChangePill({ pct }: { pct: number }) {
  const up = pct >= 0
  const Icon = up ? ArrowUpRight : ArrowDownRight
  return (
    <span
      className={`inline-flex items-center gap-0.5 font-ticker text-sm font-semibold ${
        up ? "text-up" : "text-down"
      }`}
    >
      <Icon className="size-3.5" />
      {up ? "+" : ""}
      {pct.toFixed(2)}%
    </span>
  )
}

type Direction = "all" | "gainers" | "losers"
type SortKey = "symbol" | "price" | "changePct"

const directionOptions: { value: Direction; label: string }[] = [
  { value: "all", label: "All" },
  { value: "gainers", label: "Gainers" },
  { value: "losers", label: "Losers" },
]

export function ScreenerClient({ instruments }: { instruments: Instrument[] }) {
  const [query, setQuery] = useState("")
  const [market, setMarket] = useState("All")
  const [direction, setDirection] = useState<Direction>("all")
  const [sortKey, setSortKey] = useState<SortKey>("changePct")
  const [sortDesc, setSortDesc] = useState(true)
  const [starred, setStarred] = useState<string[]>([])

  useEffect(() => {
    setStarred(loadWatchlist())
  }, [])

  const toggleStar = (slug: string) => {
    setStarred((prev) => {
      const next = prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : [...prev, slug]
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {}
      return next
    })
  }

  const markets = useMemo(
    () => ["All", ...Array.from(new Set(instruments.map((i) => i.market)))],
    [instruments]
  )

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    const filtered = instruments.filter((i) => {
      if (market !== "All" && i.market !== market) return false
      if (direction === "gainers" && i.changePct < 0) return false
      if (direction === "losers" && i.changePct >= 0) return false
      if (q && !`${i.symbol} ${i.name}`.toLowerCase().includes(q)) return false
      return true
    })
    return [...filtered].sort((a, b) => {
      let cmp = 0
      if (sortKey === "symbol") cmp = a.symbol.localeCompare(b.symbol)
      else if (sortKey === "price") cmp = priceValue(a.price) - priceValue(b.price)
      else cmp = a.changePct - b.changePct
      return sortDesc ? -cmp : cmp
    })
  }, [instruments, query, market, direction, sortKey, sortDesc])

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDesc((d) => !d)
    } else {
      setSortKey(key)
      setSortDesc(key !== "symbol")
    }
  }

  const resetFilters = () => {
    setQuery("")
    setMarket("All")
    setDirection("all")
  }

  const hasFilters = query.trim() !== "" || market !== "All" || direction !== "all"

  const sortHeader = (key: SortKey, label: string) => {
    const active = sortKey === key
    return (
      <button
        type="button"
        onClick={() => toggleSort(key)}
        aria-label={`Sort by ${label}`}
        className={`inline-flex items-center gap-1 uppercase tracking-widest transition-colors hover:text-foreground ${
          active ? "text-foreground" : ""
        }`}
      >
        {label}
        {active ? (
          sortDesc ? (
            <ArrowDownRight className="size-3" />
          ) : (
            <ArrowUpRight className="size-3" />
          )
        ) : (
          <ChevronsUpDown className="size-3 opacity-50" />
        )}
      </button>
    )
  }

  return (
    <div className="mt-10">
      <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <label className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <span className="sr-only">Search instruments</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by symbol or name…"
              className="w-full rounded-lg border border-border bg-background py-2.5 pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-foreground/40"
            />
          </label>
          <div
            className="flex items-center gap-1 self-start rounded-lg border border-border bg-background p-1"
            role="group"
            aria-label="Direction filter"
          >
            {directionOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setDirection(opt.value)}
                aria-pressed={direction === opt.value}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                  direction === opt.value
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="Market filter">
          {markets.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMarket(m)}
              aria-pressed={market === m}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                market === m
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="font-ticker font-semibold text-foreground">
            {results.length}
          </span>{" "}
          of {instruments.length} instruments
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="text-xs font-semibold text-up hover:underline"
          >
            Reset filters
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <div className="mt-4 rounded-xl border border-dashed border-border bg-card p-10 text-center">
          <Search className="mx-auto size-8 text-muted-foreground" />
          <h2 className="mt-3 font-serif text-xl font-bold">No matches</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            No instruments match these filters. Try widening your search.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 rounded-lg bg-foreground px-4 py-2 text-xs font-semibold text-background"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="mt-4 overflow-hidden rounded-xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                <th className="px-4 py-3">{sortHeader("symbol", "Symbol")}</th>
                <th className="hidden px-4 py-3 sm:table-cell">Market</th>
                <th className="px-4 py-3 text-right">
                  <span className="inline-flex justify-end">{sortHeader("price", "Price")}</span>
                </th>
                <th className="px-4 py-3 text-right">
                  <span className="inline-flex justify-end">{sortHeader("changePct", "Change")}</span>
                </th>
                <th className="px-4 py-3 text-right">
                  <span className="sr-only">Watchlist</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {results.map((i) => {
                const isStarred = starred.includes(i.slug)
                return (
                  <tr
                    key={i.slug}
                    className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <Link href={`/instrument/${i.slug}`} className="group">
                        <span className="font-ticker font-semibold group-hover:text-up transition-colors">
                          {i.symbol}
                        </span>
                        <span className="block text-xs text-muted-foreground">
                          {i.name}
                        </span>
                      </Link>
                    </td>
                    <td className="hidden px-4 py-3 sm:table-cell">
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
                        {i.market}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-ticker">{i.price}</td>
                    <td className="px-4 py-3 text-right">
                      <ChangePill pct={i.changePct} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => toggleStar(i.slug)}
                        aria-label={
                          isStarred
                            ? `Remove ${i.symbol} from watchlist`
                            : `Add ${i.symbol} to watchlist`
                        }
                        aria-pressed={isStarred}
                        className={`transition-colors ${
                          isStarred
                            ? "text-up"
                            : "text-muted-foreground hover:text-up"
                        }`}
                      >
                        <Star className={`size-4 ${isStarred ? "fill-current" : ""}`} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-10 text-xs text-muted-foreground">
        Prices shown are illustrative demo content, not investment advice. Starred
        instruments are saved to your watchlist on this device.
      </p>
    </div>
  )
}
