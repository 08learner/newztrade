// Server-only module — imported only by async server components/pages.
import { Nepse } from "@writeshh/nepse-sdk"

// ---------------------------------------------------------------------------
// Best-effort live NEPSE market data.
//
// Uses the unofficial community SDK (@writeshh/nepse-sdk), which talks to
// nepalstock.com.np's own API and handles its WASM token handshake. NEPSE has
// no official public feed: this data is real but unofficial, and the endpoint
// can rate-limit, geo-block, or change without notice. Every consumer must
// therefore tolerate `null` and label prices as unofficial/best-effort.
// ---------------------------------------------------------------------------

export interface NepseLiveQuote {
  symbol: string
  ltp: number // last traded price
  changePct: number
  previousClose: number
  volume: number
}

export interface NepsePriceSnapshot {
  quotes: Map<string, NepseLiveQuote>
  /** ISO timestamp of when the snapshot was fetched. */
  fetchedAt: string
}

const PRICE_TTL_MS = 5 * 60 * 1000 // 5 minutes
const FAILURE_BACKOFF_MS = 15 * 60 * 1000 // don't hammer NEPSE after a failure

interface CacheEntry {
  snapshot: NepsePriceSnapshot | null
  expiresAt: number
}

// Persist across module reloads within one server process (dev HMR safe).
const globalCache = globalThis as unknown as { __nepsePriceCache?: CacheEntry }

function getClient(): Nepse {
  const g = globalThis as unknown as { __nepseClient?: Nepse }
  if (!g.__nepseClient) {
    g.__nepseClient = new Nepse({
      timeoutMs: 20_000,
      concurrency: 3, // NEPSE drops connections at 4+
      maxRetries: 2,
    })
  }
  return g.__nepseClient
}

/**
 * One-call snapshot of every symbol traded on NEPSE in the latest session.
 * Returns `null` when the unofficial feed is unreachable — callers must
 * degrade gracefully. Symbols absent from the map simply did not trade.
 */
export async function getNepsePriceSnapshot(): Promise<NepsePriceSnapshot | null> {
  const now = Date.now()
  const cached = globalCache.__nepsePriceCache
  if (cached && cached.expiresAt > now) return cached.snapshot

  try {
    const rows = await getClient().getPriceVolume()
    const quotes = new Map<string, NepseLiveQuote>()
    for (const r of rows) {
      if (!r.symbol || typeof r.lastTradedPrice !== "number") continue
      quotes.set(r.symbol, {
        symbol: r.symbol,
        ltp: r.lastTradedPrice,
        changePct: Number(r.percentageChange ?? 0),
        previousClose: Number(r.previousClose ?? 0),
        volume: Number(r.totalTradeQuantity ?? 0),
      })
    }
    const snapshot: NepsePriceSnapshot = {
      quotes,
      fetchedAt: new Date().toISOString(),
    }
    globalCache.__nepsePriceCache = { snapshot, expiresAt: now + PRICE_TTL_MS }
    return snapshot
  } catch {
    // Back off longer after a failure; keep serving whatever is cached next
    // time by storing an empty-but-expired entry is avoided — store null.
    globalCache.__nepsePriceCache = {
      snapshot: null,
      expiresAt: now + FAILURE_BACKOFF_MS,
    }
    return null
  }
}

/** Format an NPR price the way NEPSE quotes it (no currency symbol needed). */
export function formatNpr(value: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}
