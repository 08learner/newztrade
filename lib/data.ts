// Shared demo data layer for NewzTrade — shaped like a future Supabase source
// (articles table + quotes table), so a real backend can replace this file later.

export type Category = "Stocks" | "Crypto" | "Forex" | "NEPSE" | "Analysis" | "Commodities"

export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  body: string
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
  body: `Equity markets across the world climbed on Monday after a string of central-bank officials hinted that the pace of rate increases may slow in the coming quarters.\n\nIn New York, the S&P 500 added to a three-week winning streak as technology and financial shares led the advance. European indices followed Asia higher, with London's FTSE 100 touching its best level since early August.\n\nTraders parsed remarks from Federal Reserve speakers who emphasized that inflation data, while still above target, has cooled enough to justify a more measured approach. Bond yields slipped, and the dollar softened against a basket of major currencies.\n\nIn Kathmandu, the Nepal Stock Exchange posted one of its strongest weekly closes in months. Banking names dominated turnover while hydropower shares gave back some recent gains.\n\nAnalysts say the next few sessions will hinge on fresh inflation prints and any guidance from major central banks. For now, risk appetite appears intact.`,
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
    body: `The Nepal Stock Exchange opened the week with commercial banks firmly in the driver's seat. By mid-morning, lenders accounted for nearly half of the total market turnover.\n\nNabil Bank and NIC Asia stood out on the buyer side, helped by expectations of stable net interest margins and improving deposit flows. The banking rally came as investors trimmed exposure to hydropower counters after a mixed bag of quarterly results.\n\nHydropower developers that had run up sharply over the past month saw profit-taking, with several stocks falling to their lower circuit limits. Analysts described the rotation as a healthy correction within a broader sideways trend.\n\nBroader market breadth was positive, with more advancers than decliners. Total turnover crossed NPR 8 billion, signaling steady participation from domestic institutions.\n\nLooking ahead, traders will watch this week's monetary policy signals from Nepal Rastra Bank for clues on liquidity and provisioning norms.`,
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
    body: `Bitcoin broke above $117,000 for the first time in weeks as spot exchange-traded funds absorbed record inflows. The rally extended into Ethereum and smaller tokens, lifting the total market capitalization of digital assets to fresh highs.\n\nSpot Bitcoin ETFs recorded their largest weekly inflow since June, according to data from major fund issuers. Institutional allocations continued to dominate flows, while leveraged futures open interest rose more modestly.\n\nAnalysts said the move was driven by renewed optimism around regulatory clarity and improving macro liquidity. Ethereum followed Bitcoin higher, and Solana outperformed most large-cap alternatives.\n\nThe latest inflows bring total assets under management in spot Bitcoin products to a new record. Some strategists cautioned that short-term sentiment is becoming stretched, though longer-term holders remain net buyers.\n\nThe next catalyst for crypto markets will likely be any fresh commentary from U.S. regulators and the path of the dollar over the rest of the quarter.`,
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
    body: `The Nepali rupee held steady near 137.60 per U.S. dollar on Monday, supported by a seasonal pickup in remittance inflows and improving foreign exchange reserves.\n\nWorkers' remittances, a key source of dollars for the economy, rose compared with the same month last year, giving the central bank more room to manage import bills and debt payments.\n\nForex dealers said the currency pair is likely to stay in a narrow band in the near term, barring a sharp move in the Indian rupee to which the Nepali rupee is pegged.\n\nImproving reserves have also reduced pressure on import financing. Economists noted that a stable exchange rate is helping anchor inflation expectations after a volatile period last year.\n\nFor importers and borrowers with dollar liabilities, the calm spell offers a window to hedge exposures before any potential volatility returns.`,
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
    body: `Gold slipped below $3,400 an ounce on Friday as investors locked in profits following a six-week rally that had pushed bullion to successive record highs.\n\nThe pullback was modest in percentage terms and came on light trading volume, suggesting position squaring rather than a change in the broader uptrend. Spot gold settled near $3,388, while silver and platinum also eased.\n\nCentral banks remain the most consistent buyers of physical gold, with several emerging-market monetary authorities adding to reserves in recent months. That underlying demand is one reason analysts think any correction may be shallow.\n\nA softer dollar and still-elevated geopolitical risk are also providing a floor, traders said. Many have raised year-end price targets, though they warn that a rapid run-up often invites short-term profit taking.\n\nFor long-term holders, the current range is seen as a healthy consolidation within a structural bull market.`,
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
    body: `Nepal Rastra Bank is widely expected to keep policy rates unchanged at its first-quarter monetary review, but the accompanying statement will be closely parsed for shifts in tone on credit growth and bad-loan provisioning.\n\nHeadline inflation has cooled from last year's peaks, giving the central bank some room to focus on financial stability rather than immediate tightening. Credit growth, however, has slowed more than policymakers would like.\n\nThe debate among economists centers on whether NRB will nudge banks toward higher loan-loss provisions, especially for exposures to sectors that saw rapid credit expansion in recent years. Such a move could tighten credit conditions even without a rate hike.\n\nCommercial banks have argued that provisioning rules should remain stable to avoid choking productive lending. Meanwhile, smaller borrowers say credit is already hard to access outside the largest institutions.\n\nWhatever the outcome, the review is likely to set the tone for bank earnings, liquidity and the NEPSE index through the rest of the quarter.`,
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
    body: `Earnings season is noisy. Every headline screams "beat" or "miss" against analyst estimates, but the headline earnings-per-share number is often the least informative figure for where a stock goes next.\n\nStart with margins. A company that beats EPS by cutting costs is telling a very different story from one that beats by raising prices and expanding market share. Gross margin and operating margin trends reveal whether the business is getting stronger or simply leaner.\n\nSecond, watch cash flow. Accounting earnings can be managed; cash is harder to fake. Free cash flow growth, capital discipline and working-capital trends tell you if a business is converting profits into real money.\n\nThird, follow buyback and dividend signals. A management team that raises guidance while expanding buybacks is usually more confident than one that beats EPS but keeps the full-year forecast unchanged.\n\nFor investors, the goal is to look past the headline and read the body language of the business. The numbers that matter are rarely the ones in the press release's first paragraph.`,
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
    body: `Wall Street's artificial-intelligence spending boom is accelerating. The largest technology companies raised full-year capital-expenditure guidance again this quarter, extending a rally that has added trillions of dollars in market value.\n\nData-center demand is the primary driver. Cloud providers are racing to deploy more powerful chips and expand power and cooling capacity to train and serve the next generation of AI models.\n\nChipmakers and component suppliers have been the clearest beneficiaries, with order books stretching well into next year. Investors are also bidding up utilities and energy companies expected to power new facilities.\n\nNot everyone is convinced the spending is efficient. Some analysts warn that returns on these massive investments may take longer than the market expects, and that valuations already price in years of growth.\n\nFor now, the momentum remains strong. The next test will be whether revenue from AI services starts to match the scale of the infrastructure being built.`,
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

export const allArticles = [featuredArticle, ...articles]

export function getArticleBySlug(slug: string): Article | undefined {
  return allArticles.find((a) => a.slug === slug)
}

export function getArticlesByCategory(category: Category): Article[] {
  return allArticles
    .filter((a) => a.category === category)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export const categoryInfo = {
  markets: {
    label: "Markets",
    tagline: "The biggest moves across stocks, crypto, forex, commodities and NEPSE.",
    image: IMG.hero,
  },
  stocks: {
    label: "Stocks",
    tagline: "Equities, indices and the companies moving markets.",
    image: IMG.stocks,
  },
  crypto: {
    label: "Crypto",
    tagline: "Bitcoin, Ethereum and the digital asset economy.",
    image: IMG.crypto,
  },
  forex: {
    label: "Forex",
    tagline: "Currencies, central banks and the global exchange picture.",
    image: IMG.forex,
  },
  nepse: {
    label: "NEPSE",
    tagline: "Nepal Stock Exchange news, movers and market snapshots.",
    image: IMG.nepse,
  },
  analysis: {
    label: "Analysis",
    tagline: "Deeper reads on trends, earnings and market strategy.",
    image: IMG.analysis,
  },
  commodities: {
    label: "Commodities",
    tagline: "Gold, oil and the raw materials shaping trade.",
    image: IMG.gold,
  },
} as const

export const categorySlugs = Object.keys(categoryInfo)

export function isValidCategory(slug: string): slug is keyof typeof categoryInfo {
  return categorySlugs.includes(slug)
}
