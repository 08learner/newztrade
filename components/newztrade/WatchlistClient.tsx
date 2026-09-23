"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { instruments, type Instrument } from "@/lib/data"
import { ArrowDownRight, ArrowUpRight, Star, StarOff } from "lucide-react"

const STORAGE_KEY = "nz-watchlist"

function loadWatchlist(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return ["nepse-index", "nabil-bank", "bitcoin"]
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((s) => typeof s === "string") : []
  } catch {
    return []
  }
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

export function WatchlistClient() {
  const [slugs, setSlugs] = useState<string[] | null>(null)

  useEffect(() => {
    setSlugs(loadWatchlist())
  }, [])

  const toggle = (slug: string) => {
    if (!slugs) return
    const next = slugs.includes(slug)
      ? slugs.filter((s) => s !== slug)
      : [...slugs, slug]
    setSlugs(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {}
  }

  if (!slugs) return null

  const saved = slugs
    .map((slug) => instruments.find((i) => i.slug === slug))
    .filter((i): i is Instrument => Boolean(i))
  const suggestions = instruments.filter((i) => !slugs.includes(i.slug))

  return (
    <div className="mt-10">
      {saved.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center">
          <Star className="mx-auto size-8 text-muted-foreground" />
          <h2 className="mt-3 font-serif text-xl font-bold">
            Your watchlist is empty
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Star any instrument below to start tracking it here.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                <th className="px-4 py-3">Symbol</th>
                <th className="hidden px-4 py-3 sm:table-cell">Market</th>
                <th className="px-4 py-3 text-right">Price</th>
                <th className="px-4 py-3 text-right">Change</th>
                <th className="px-4 py-3 text-right">
                  <span className="sr-only">Remove</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {saved.map((i) => (
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
                  <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">
                    {i.market}
                  </td>
                  <td className="px-4 py-3 text-right font-ticker">{i.price}</td>
                  <td className="px-4 py-3 text-right">
                    <ChangePill pct={i.changePct} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => toggle(i.slug)}
                      aria-label={`Remove ${i.symbol} from watchlist`}
                      className="text-muted-foreground hover:text-down transition-colors"
                    >
                      <StarOff className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h2 className="mt-12 text-sm font-bold uppercase tracking-widest border-b-2 border-foreground pb-3 mb-6">
        Add instruments
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {suggestions.map((i) => (
          <div
            key={i.slug}
            className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card p-4"
          >
            <Link href={`/instrument/${i.slug}`} className="group min-w-0">
              <span className="font-ticker font-semibold group-hover:text-up transition-colors">
                {i.symbol}
              </span>
              <span className="block truncate text-xs text-muted-foreground">
                {i.name}
              </span>
            </Link>
            <div className="flex items-center gap-3 shrink-0">
              <ChangePill pct={i.changePct} />
              <button
                type="button"
                onClick={() => toggle(i.slug)}
                aria-label={`Add ${i.symbol} to watchlist`}
                className="grid size-8 place-items-center rounded-full border border-border text-muted-foreground hover:text-up hover:border-up/40 transition-colors"
              >
                <Star className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-10 text-xs text-muted-foreground">
        Prices shown are illustrative demo content, not investment advice. Your
        watchlist never leaves this device.
      </p>
    </div>
  )
}
