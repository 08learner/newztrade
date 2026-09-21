// Daily digest generator — derives dated market digest pages from the shared
// demo source (lib/data.ts). When Supabase is connected, this module becomes
// the read adapter over a digests table; page code must not change.

import {
  allArticles,
  movers,
  nepseSnapshot,
  tickerQuotes,
  type Article,
  type Quote,
} from "./data"

export interface Digest {
  slug: string
  kind: "nepse-today" | "market-wrap"
  title: string
  dateLabel: string
  publishedAt: string
  summary: string[]
  quotes: Quote[]
  stories: Article[]
  keywords: string[]
}

const DAY_MS = 86_400_000

// Anchor the "publishing calendar" to the newest story date so generated
// digests stay consistent with the demo content.
const latestArticleMs = Math.max(
  ...allArticles.map((a) => new Date(a.publishedAt).getTime())
)

function dateLabelFor(ms: number): string {
  return new Date(ms).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

function directionWord(pct: number): string {
  if (pct > 0.5) return "climbed"
  if (pct > 0) return "edged higher"
  if (pct < -0.5) return "fell sharply"
  if (pct < 0) return "slipped"
  return "was flat"
}

function buildNepseToday(dateMs: number): Digest {
  const dateLabel = dateLabelFor(dateMs)
  const up = nepseSnapshot.changePct >= 0
  const usdNpr = tickerQuotes.find((q) => q.symbol === "USD/NPR")!
  const summary = [
    `The NEPSE Index ${directionWord(nepseSnapshot.changePct)} ${
      up ? "to" : "to"
    } ${nepseSnapshot.index} on ${dateLabel}, a move of ${up ? "+" : ""}${nepseSnapshot.changePct.toFixed(
      2
    )}% on turnover of ${nepseSnapshot.turnover}.`,
    `Market breadth was ${nepseSnapshot.advancers > nepseSnapshot.decliners ? "positive" : "negative"}: ${nepseSnapshot.advancers} stocks advanced against ${nepseSnapshot.decliners} decliners, with ${nepseSnapshot.unchanged} unchanged.`,
    `Among individual names, ${movers.gainers[0].name} (${movers.gainers[0].symbol}) led gainers at ${movers.gainers[0].price} (${up ? "+" : ""}${movers.gainers[0].changePct.toFixed(2)}%), while ${movers.losers[0].name} (${movers.losers[0].symbol}) paced decliners at ${movers.losers[0].price} (${movers.losers[0].changePct.toFixed(2)}%).`,
    `The Nepali rupee traded at ${usdNpr.price} per US dollar (${usdNpr.changePct >= 0 ? "+" : ""}${usdNpr.changePct.toFixed(2)}%). Traders are watching liquidity signals from Nepal Rastra Bank and sector rotation between banking and hydropower counters.`,
  ]
  return {
    slug: `nepse-today-${new Date(dateMs).toISOString().slice(0, 10)}`,
    kind: "nepse-today",
    title: `NEPSE Today: Index ${up ? "Rises" : "Falls"} to ${nepseSnapshot.index}`,
    dateLabel,
    publishedAt: new Date(dateMs).toISOString(),
    summary,
    quotes: tickerQuotes.filter((q) => ["NEPSE", "USD/NPR"].includes(q.symbol)),
    stories: allArticles.filter((a) => a.category === "NEPSE"),
    keywords: [
      "NEPSE today",
      "Nepal Stock Exchange",
      "NEPSE index",
      "NEPSE market summary",
      "Nepali share market",
    ],
  }
}

function buildMarketWrap(dateMs: number): Digest {
  const dateLabel = dateLabelFor(dateMs)
  const spx = tickerQuotes.find((q) => q.symbol === "S&P 500")!
  const btc = tickerQuotes.find((q) => q.symbol === "BTC/USD")!
  const gold = tickerQuotes.find((q) => q.symbol === "XAU/USD")!
  const oil = tickerQuotes.find((q) => q.symbol === "BRENT")!
  const summary = [
    `Global markets ${spx.changePct >= 0 ? "advanced" : "retreated"} on ${dateLabel}. The S&P 500 ${directionWord(spx.changePct)} to ${spx.price} (${spx.changePct >= 0 ? "+" : ""}${spx.changePct.toFixed(2)}%), while the Nasdaq ${directionWord(tickerQuotes.find((q) => q.symbol === "NASDAQ")!.changePct)} to ${tickerQuotes.find((q) => q.symbol === "NASDAQ")!.price}.`,
    `Bitcoin ${directionWord(btc.changePct)} to ${btc.price} (${btc.changePct >= 0 ? "+" : ""}${btc.changePct.toFixed(2)}%), leading digital assets ${btc.changePct >= 0 ? "higher" : "lower"}.`,
    `In commodities, gold ${directionWord(gold.changePct)} to ${gold.price} an ounce and Brent crude ${directionWord(oil.changePct)} to ${oil.price} a barrel.`,
    `In Kathmandu, NEPSE ${directionWord(nepseSnapshot.changePct)} to ${nepseSnapshot.index} on turnover of ${nepseSnapshot.turnover}, with ${nepseSnapshot.advancers} advancers against ${nepseSnapshot.decliners} decliners.`,
  ]
  return {
    slug: `market-wrap-${new Date(dateMs).toISOString().slice(0, 10)}`,
    kind: "market-wrap",
    title: `Market Wrap: Global Stocks ${spx.changePct >= 0 ? "Advance" : "Retreat"}, Bitcoin ${btc.changePct >= 0 ? "Gains" : "Slips"}`,
    dateLabel,
    publishedAt: new Date(dateMs).toISOString(),
    summary,
    quotes: [spx, btc, gold, oil],
    stories: allArticles.slice(0, 4),
    keywords: [
      "market wrap",
      "stock market today",
      "bitcoin price",
      "gold price",
      "global markets",
    ],
  }
}

const RECENT_DAYS = 5

export const digests: Digest[] = Array.from({ length: RECENT_DAYS }, (_, i) => {
  const dateMs = latestArticleMs - i * DAY_MS
  return [buildNepseToday(dateMs), buildMarketWrap(dateMs)]
}).flat()

export const currentDigests = digests.filter(
  (d) => d.publishedAt === new Date(latestArticleMs).toISOString()
)

export function getDigestBySlug(slug: string): Digest | undefined {
  return digests.find((d) => d.slug === slug)
}
