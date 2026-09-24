"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import type { NepseCompany } from "@/lib/content"
import { Search, TrendingUp, TrendingDown } from "lucide-react"

export interface DirectoryQuote {
  ltp: number
  changePct: number
  volume: number
}

function formatNpr(value: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function NepseDirectory({
  companies,
  quotes,
  fetchedAt,
  instrumentHrefs,
}: {
  companies: NepseCompany[]
  /** Plain-object form of the live snapshot Map (serializable). */
  quotes: Record<string, DirectoryQuote>
  fetchedAt: string | null
  /** symbol -> /instrument/[slug] for curated pages that exist. */
  instrumentHrefs: Record<string, string>
}) {
  const [query, setQuery] = useState("")
  const [sector, setSector] = useState("all")

  const sectors = useMemo(() => {
    const counts = new Map<string, number>()
    for (const c of companies) counts.set(c.sectorName, (counts.get(c.sectorName) ?? 0) + 1)
    return [...counts.entries()].sort((a, b) => b[1] - a[1])
  }, [companies])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return companies.filter((c) => {
      if (sector !== "all" && c.sectorName !== sector) return false
      if (!q) return true
      return (
        c.symbol.toLowerCase().includes(q) || c.companyName.toLowerCase().includes(q)
      )
    })
  }, [companies, query, sector])

  const grouped = useMemo(() => {
    const groups = new Map<string, NepseCompany[]>()
    for (const c of filtered) {
      const list = groups.get(c.sectorName) ?? []
      list.push(c)
      groups.set(c.sectorName, list)
    }
    // Keep the same sector ordering as the filter dropdown.
    return sectors
      .map(([name]) => [name, groups.get(name)] as const)
      .filter((entry): entry is readonly [string, NepseCompany[]] => Boolean(entry[1]?.length))
  }, [filtered, sectors])

  const liveCount = useMemo(
    () => filtered.filter((c) => quotes[c.symbol]).length,
    [filtered, quotes]
  )

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <span className="sr-only">Search NEPSE companies</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search symbol or company — e.g. NABIL, hydro, Sanima…"
            className="h-11 w-full rounded-lg border border-border bg-background pl-9 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:border-up focus:ring-2 focus:ring-up/20 transition"
          />
        </label>
        <label className="sm:w-64">
          <span className="sr-only">Filter by sector</span>
          <select
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-up focus:ring-2 focus:ring-up/20 transition"
          >
            <option value="all">All sectors ({companies.length})</option>
            {sectors.map(([name, count]) => (
              <option key={name} value={name}>
                {name} ({count})
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        {filtered.length} securities
        {fetchedAt
          ? ` · ${liveCount} traded in the latest session · unofficial best-effort data via NEPSE, updated ${new Date(fetchedAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}`
          : " · live prices temporarily unavailable (unofficial feed) — symbols and sectors remain complete"}
        . Not investment advice.
      </p>

      <div className="mt-6 space-y-10">
        {grouped.map(([sectorName, list]) => (
          <section key={sectorName}>
            <div className="flex items-baseline justify-between gap-2 border-b-2 border-foreground pb-3 mb-4">
              <h3 className="text-sm font-bold uppercase tracking-widest">{sectorName}</h3>
              <span className="text-xs text-muted-foreground">{list.length}</span>
            </div>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="px-4 py-3 font-semibold">Symbol</th>
                    <th className="px-4 py-3 font-semibold">Company</th>
                    <th className="px-4 py-3 text-right font-semibold">LTP (NPR)</th>
                    <th className="px-4 py-3 text-right font-semibold">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((c) => {
                    const q = quotes[c.symbol]
                    const up = (q?.changePct ?? 0) >= 0
                    const href = instrumentHrefs[c.symbol]
                    return (
                      <tr
                        key={c.symbol}
                        className="border-b border-border last:border-0 hover:bg-muted/40"
                      >
                        <td className="px-4 py-2.5 font-mono font-semibold">
                          {href ? (
                            <Link href={href} className="hover:underline">
                              {c.symbol}
                            </Link>
                          ) : (
                            c.symbol
                          )}
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          {c.companyName}
                          {c.instrumentType !== "Equity" && (
                            <span className="ml-2 rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide">
                              {c.instrumentType === "Mutual Funds"
                                ? "Fund"
                                : c.instrumentType === "Non-Convertible Debentures"
                                  ? "Debenture"
                                  : c.instrumentType === "Preference Shares"
                                    ? "Pref."
                                    : c.instrumentType}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-2.5 text-right font-ticker tabular-nums font-medium">
                          {q ? (
                            formatNpr(q.ltp)
                          ) : (
                            <span className="text-xs text-muted-foreground">
                              not traded
                            </span>
                          )}
                        </td>
                        <td
                          className={`px-4 py-2.5 text-right font-ticker tabular-nums font-semibold ${
                            q ? (up ? "text-up" : "text-down") : "text-muted-foreground"
                          }`}
                        >
                          {q ? (
                            <span className="inline-flex items-center justify-end gap-1">
                              {up ? (
                                <TrendingUp className="size-3.5" />
                              ) : (
                                <TrendingDown className="size-3.5" />
                              )}
                              {up ? "+" : ""}
                              {q.changePct.toFixed(2)}%
                            </span>
                          ) : (
                            "—"
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </section>
        ))}
        {grouped.length === 0 && (
          <p className="py-10 text-center text-sm text-muted-foreground">
            No companies match “{query}”.
          </p>
        )}
      </div>
    </div>
  )
}
