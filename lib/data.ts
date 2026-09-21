// Shared demo data layer for NewzTrade — shaped like a future Supabase source
// (articles table + quotes table), so a real backend can replace this file later.

export type Category = "Stocks" | "Crypto" | "Forex" | "NEPSE" | "Analysis" | "Commodities"

export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  category: Category
  source: string
  author: string
  publishedAt: string
  readMinutes: number
  image: string
}

export interface Quote {
  symbol: string
  name: string
  price: string
  changePct: number
}

export const IMG = {
  hero: "/images/dc572bdb-4f82-4c2b-bc33-f91722372652.jpg",
  stocks: "/images/ff2c6c99-c24c-4f4a-bda5-08ebc0688d62.jpg",
  crypto: "/images/bc6481e4-fbf5-404e-960c-f38c6a505f29.jpg",
  forex: "/images/fe09f238-1b61-4047-90a6-d342b7dfa1ef.jpg",
  nepse: "/images/47a1014b-f3ad-45af-8da5-4f97376a076d.jpg",
  analysis: "/images/b8930f87-3178-4cb7-b745-ac5e9aa1cb03.jpg",
  gold: "/images/db6dfd9a-c88e-4574-b84a-888166fd49f2.jpg",
  bank: "/images/76ede341-dfd5-4b1d-b25c-8ae8ccb08d1c.jpg",
} as const

export const tickerQuotes: Quote[] = [
  { symbol: "NEPSE", name: "Nepal Stock Exchange", price: "2,684.12", changePct: 0.84 },
  { symbol: "S&P 500", name: "US Large Cap", price: "6,412.30", changePct: 0.42 },
  { symbol: "NASDAQ", name: "US Tech", price: "21,385.77", changePct: 0.71 },
  { symbol: "NIFTY 50", name: "India", price: "24,812.55", changePct: -0.18 },
  { symbol: "BTC/USD", name: "Bitcoin", price: "117,420", changePct: 2.36 },
  { symbol: "ETH/USD", name: "Ethereum", price: "4,512.08", changePct: 1.12 },
  { symbol: "XAU/USD", name: "Gold Spot", price: "3,388.40", changePct: -0.27 },
  { symbol: "EUR/USD", name: "Euro", price: "1.1684", changePct: 0.09 },
  { symbol: "USD/NPR", name: "Nepali Rupee", price: "137.62", changePct: -0.05 },
  { symbol: "USD/JPY", name: "Japanese Yen", price: "147.30", changePct: -0.33 },
  { symbol: "BRENT", name: "Crude Oil", price: "82.14", changePct: 1.05 },
  { symbol: "FTSE 100", name: "UK", price: "8,942.61", changePct: 0.22 },
]

export const featuredArticle: Article = {
  id: "a-001",
  slug: "global-markets-rally-fed-rate-path",
  title: "Global Markets Rally as Central Banks Signal a Slower Path on Rates",
  excerpt:
    "Equities climbed across New York, London and Asian exchanges after policymakers hinted at a pause, while traders in Kathmandu watched NEPSE post its strongest weekly close in months.",
  category: "Stocks",
  source: "NewzTrade Desk",
  author: "Anish Shrestha",
  publishedAt: "2026-09-21T04:30:00Z",
  readMinutes: 6,
  image: IMG.hero,
}

export const articles: Article[] = [
  {
    id: "a-002",
    slug: "nepse-banking-sector-q1",
    title: "NEPSE Banks Lead Turnover as Hydropower Stocks Lag in Early Trade",
    excerpt:
      "Commercial banks accounted for nearly half of total turnover on the Nepal Stock Exchange, with investors rotating out of hydropower after a mixed earnings season.",
    category: "NEPSE",
    source: "NewzTrade Nepal",
    author: "Prerana Karki",
    publishedAt: "2026-09-21T03:10:00Z",
    readMinutes: 4,
    image: IMG.nepse,
  },
  {
    id: "a-003",
    slug: "bitcoin-etf-inflows-record",
    title: "Bitcoin Tops $117K as ETF Inflows Hit a Three-Month High",
    excerpt:
      "Spot Bitcoin funds recorded their biggest weekly inflow since June, lifting the broader crypto market and pushing total assets under management to new records.",
    category: "Crypto",
    source: "NewzTrade Desk",
    author: "Maya Gurung",
    publishedAt: "2026-09-21T02:45:00Z",
    readMinutes: 5,
    image: IMG.crypto,
  },
  {
    id: "a-004",
    slug: "dollar-nepali-rupee-outlook",
    title: "Rupee Holds Steady Against the Dollar as Remittance Inflows Rise",
    excerpt:
      "The Nepali rupee traded in a narrow band near 137.6 per dollar, supported by record remittance inflows and improving foreign exchange reserves.",
    category: "Forex",
    source: "NewzTrade Nepal",
    author: "Sagar Thapa",
    publishedAt: "2026-09-20T23:20:00Z",
    readMinutes: 3,
    image: IMG.forex,
  },
  {
    id: "a-005",
    slug: "gold-demand-safe-haven",
    title: "Gold Retreats From Record Highs as Traders Lock in Profits",
    excerpt:
      "Bullion slipped below $3,400 an ounce after a six-week rally, though analysts say central-bank buying keeps the longer-term trend intact.",
    category: "Commodities",
    source: "NewzTrade Desk",
    author: "Rabin Adhikari",
    publishedAt: "2026-09-20T21:05:00Z",
    readMinutes: 4,
    image: IMG.gold,
  },
  {
    id: "a-006",
    slug: "nepal-rastra-bank-policy-preview",
    title: "What to Watch in Nepal Rastra Bank's First-Quarter Monetary Review",
    excerpt:
      "With credit growth cooling and inflation easing, economists expect NRB to hold rates — but the loan-loss provisioning debate is far from settled.",
    category: "NEPSE",
    source: "NewzTrade Analysis",
    author: "Anish Shrestha",
    publishedAt: "2026-09-20T18:40:00Z",
    readMinutes: 7,
    image: IMG.bank,
  },
  {
    id: "a-007",
    slug: "how-to-read-earnings-season",
    title: "Earnings Season Playbook: Three Numbers That Matter More Than EPS",
    excerpt:
      "Headline earnings beats dominate the news, but margin guidance, cash flow and buyback pace tell you far more about where a stock goes next.",
    category: "Analysis",
    source: "NewzTrade Analysis",
    author: "Maya Gurung",
    publishedAt: "2026-09-20T15:30:00Z",
    readMinutes: 8,
    image: IMG.analysis,
  },
  {
    id: "a-008",
    slug: "tech-stocks-ai-spending",
    title: "Wall Street's AI Spending Boom Shows No Sign of Slowing",
    excerpt:
      "Mega-cap technology firms raised capital-expenditure guidance again, extending a rally that has added trillions in market value this year.",
    category: "Stocks",
    source: "NewzTrade Desk",
    author: "Rabin Adhikari",
    publishedAt: "2026-09-20T13:15:00Z",
    readMinutes: 5,
    image: IMG.stocks,
  },
]

export const nepseSnapshot = {
  index: "2,684.12",
  changePct: 0.84,
  turnover: "NPR 8.42B",
  advancers: 142,
  decliners: 68,
  unchanged: 31,
}

export const movers = {
  gainers: [
    { symbol: "NABIL", name: "Nabil Bank", price: "512.00", changePct: 3.94 },
    { symbol: "UPPER", name: "Upper Tamakoshi", price: "318.50", changePct: 3.41 },
    { symbol: "NVDA", name: "NVIDIA Corp", price: "182.44", changePct: 2.87 },
    { symbol: "SOL/USD", name: "Solana", price: "214.60", changePct: 2.45 },
  ],
  losers: [
    { symbol: "HIDCL", name: "Hydroelectricity Inv.", price: "188.20", changePct: -2.66 },
    { symbol: "XAU/USD", name: "Gold Spot", price: "3,388.40", changePct: -0.27 },
    { symbol: "NIFTY", name: "Nifty 50", price: "24,812.55", changePct: -0.18 },
    { symbol: "TSLA", name: "Tesla Inc", price: "241.03", changePct: -1.92 },
  ],
}

export const navItems = ["Markets", "Stocks", "Crypto", "Forex", "NEPSE", "Analysis"] as const

export function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const hours = Math.floor(diffMs / 3_600_000)
  if (hours < 1) return "Just now"
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}
