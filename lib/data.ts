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
  {
    id: "a-009",
    slug: "yen-weakens-boj-holds",
    title: "Yen Weakens Past 147 per Dollar as Bank of Japan Holds Steady",
    excerpt:
      "The Japanese yen slid after the BoJ kept its policy stance unchanged, disappointing traders who had positioned for a hawkish surprise.",
    category: "Forex",
    source: "NewzTrade Desk",
    author: "Sagar Thapa",
    publishedAt: "2026-09-19T09:40:00Z",
    readMinutes: 4,
    body: `The Japanese yen weakened past 147 per U.S. dollar on Friday after the Bank of Japan kept its monetary policy unchanged, disappointing traders who had positioned for a more hawkish signal.\n\nThe central bank maintained its current rate settings and offered little fresh guidance on the timing of any future adjustments, sending the dollar-yen pair to its strongest level in three weeks.\n\nAnalysts said the yen's slide also reflects a broader firming of the U.S. dollar, which has found support from resilient economic data and cautious commentary from Federal Reserve officials.\n\nFor Asian currencies — including the Nepali rupee, which tracks the Indian rupee — a stronger dollar adds mild pressure, though record remittance inflows have cushioned the impact in Kathmandu.\n\nTraders now turn to next week's U.S. inflation data for the next major cue on currency direction.`,
    image: IMG.forex,
  },
  {
    id: "a-010",
    slug: "oil-climbs-supply-cuts",
    title: "Oil Climbs Past $82 as Supply Cuts Tighten the Global Market",
    excerpt:
      "Brent crude rose for a fourth straight session as extended production cuts and falling U.S. inventories tightened supply expectations.",
    category: "Commodities",
    source: "NewzTrade Desk",
    author: "Rabin Adhikari",
    publishedAt: "2026-09-19T07:15:00Z",
    readMinutes: 4,
    body: `Brent crude rose for a fourth consecutive session, climbing past $82 a barrel as extended production cuts by major exporters tightened expectations for global supply.\n\nU.S. crude inventories fell more than analysts expected last week, adding to evidence that the market is drawing down stockpiles at a steady pace.\n\nEnergy shares outperformed broader indices, while airlines and transport stocks lagged on concerns that higher fuel costs will squeeze margins into year-end.\n\nAnalysts cautioned that demand uncertainty — particularly from slower industrial activity in parts of Asia — could cap gains, but most see a firm floor under prices while cuts remain in place.\n\nFor import-dependent economies like Nepal, sustained oil strength feeds directly into the trade balance and inflation outlook.`,
    image: IMG.gold,
  },
  {
    id: "a-011",
    slug: "ethereum-staking-institutional-interest",
    title: "Ethereum Staking Yields Draw Fresh Institutional Interest",
    excerpt:
      "Ether's staking yields are attracting a new wave of institutional allocators, tightening liquid supply and supporting prices above $4,500.",
    category: "Crypto",
    source: "NewzTrade Desk",
    author: "Maya Gurung",
    publishedAt: "2026-09-18T22:30:00Z",
    readMinutes: 5,
    body: `Ethereum held above $4,500 this week as staking yields attracted a fresh wave of institutional interest, tightening the supply of ether available on exchanges.\n\nThe share of total ether supply locked in staking contracts reached a new high, according to network data, as asset managers launched products that pass staking rewards through to investors.\n\nAnalysts say the trend is reshaping how institutions value ether — less as a speculative token and more as a yield-bearing network asset, drawing comparisons to dividend-paying equities.\n\nCritics note that staking concentration among a handful of large providers remains a structural risk, and that yields compress as more supply is locked.\n\nStill, with exchange balances at multi-year lows, the supply picture continues to favor holders heading into the final quarter.`,
    image: IMG.crypto,
  },
  {
    id: "a-012",
    slug: "nepse-banking-dividends-falling-rates",
    title: "The Case for NEPSE's Banking Dividends in a Falling-Rate Cycle",
    excerpt:
      "If rates keep easing, Nepal's commercial banks may become the market's most reliable income trade — but the risks are real.",
    category: "Analysis",
    source: "NewzTrade Analysis",
    author: "Anish Shrestha",
    publishedAt: "2026-09-18T14:20:00Z",
    readMinutes: 7,
    body: `Every NEPSE cycle has its income trade, and in a falling-rate environment, commercial-bank dividends tend to take that role. The logic is straightforward: as deposit rates fall, the relative appeal of a stable 12–15% cash dividend yield rises.\n\nNepal's largest banks have rebuilt capital buffers after a difficult provisioning cycle, and loan growth — while slower than regulators would like — is steady. That combination supports dividend capacity even if margins compress.\n\nThe risks deserve equal weight. Loan-loss provisioning norms are under review at Nepal Rastra Bank, and any tightening would hit earnings directly. Hydropower-led retail enthusiasm also periodically drains liquidity from bank counters.\n\nHistory suggests that bank stocks on NEPSE outperform in the twelve months following the peak of a rate cycle. Whether that pattern repeats depends on credit quality data due in the coming quarter.\n\nFor income-focused investors, the sector's current valuations price in more pessimism than the fundamentals seem to justify — but position sizing matters more than conviction.`,
    image: IMG.bank,
  },
  {
    id: "a-013",
    slug: "small-caps-join-rally",
    title: "Small-Caps Join the Rally as Market Breadth Improves Worldwide",
    excerpt:
      "The rally is broadening beyond mega-cap technology: small-cap indices in the U.S., India and frontier markets are hitting multi-month highs.",
    category: "Stocks",
    source: "NewzTrade Desk",
    author: "Rabin Adhikari",
    publishedAt: "2026-09-18T11:00:00Z",
    readMinutes: 4,
    body: `The global equity rally is broadening. After months of leadership from a handful of mega-cap technology names, small-cap indices across the U.S., India and several frontier markets have climbed to multi-month highs.\n\nMarket strategists view improving breadth as a healthy signal: rallies supported by a wide base of advancing stocks tend to last longer than those driven by a narrow leadership group.\n\nIn the U.S., the Russell 2000 outperformed the S&P 500 for a third straight week. In India, mid- and small-cap indices continue to attract record domestic fund inflows.\n\nOn NEPSE, the same rotation is visible: microfinance and development-bank counters have joined commercial banks in the turnover leaders after spending much of the year out of favor.\n\nThe test for the broadening trade comes with the next round of earnings, where smaller companies must prove they can pass through costs as effectively as their larger peers.`,
    image: IMG.stocks,
  },
  {
    id: "a-014",
    slug: "nepse-hydropower-ipo-pipeline",
    title: "Hydropower IPOs Dominate NEPSE Pipeline as Applications Surge",
    excerpt:
      "More than a dozen hydropower companies are queued for public offerings, testing the market's appetite after a mixed year for the sector.",
    category: "NEPSE",
    source: "NewzTrade Nepal",
    author: "Prerana Karki",
    publishedAt: "2026-09-17T08:50:00Z",
    readMinutes: 5,
    body: `Nepal's primary market is bracing for its busiest stretch in years. More than a dozen hydropower companies have offerings in the regulatory pipeline, according to filings, alongside several microfinance and insurance applicants.\n\nThe wave tests investor appetite at a delicate moment: hydropower counters have underperformed the broader NEPSE index this quarter as early-listed names posted uneven generation numbers.\n\nIssue managers argue the sector's long-term case is intact — domestic electricity demand keeps growing, and export agreements with India provide revenue visibility that few other Nepali industries can match.\n\nSkeptics counter that oversubscribed IPOs tell investors little about post-listing performance, and that several recent listings now trade below their offer prices.\n\nFor retail investors, the practical guidance remains unchanged: read the power purchase agreement terms, check the debt load, and size the allotment expectation realistically.`,
    image: IMG.nepse,
  },
  {
    id: "a-015",
    slug: "nepal-forex-reserves-record",
    title: "Remittance Surge Lifts Nepal's Foreign Exchange Reserves to a Record",
    excerpt:
      "Reserves now cover more than a year of imports, strengthening the rupee's stability and giving the central bank rare policy room.",
    category: "Forex",
    source: "NewzTrade Nepal",
    author: "Sagar Thapa",
    publishedAt: "2026-09-16T13:35:00Z",
    readMinutes: 4,
    body: `Nepal's foreign exchange reserves climbed to a record high in the latest reporting month, powered by a sustained surge in worker remittances and a recovery in tourism receipts.\n\nReserves now cover well over a year of merchandise imports — a level of external strength that few economies in the region can match, and a dramatic reversal from the anxiety of three years ago.\n\nThe cushion matters beyond optics. It anchors the rupee's peg to the Indian currency, keeps import financing orderly, and gives Nepal Rastra Bank room to support growth without immediately fearing a balance-of-payments squeeze.\n\nEconomists caution that remittance dependence carries its own risks, noting that the inflows reflect labor exports rather than domestic productivity gains.\n\nFor markets, the reserves milestone is one more pillar supporting the rupee's recent stability near 137.6 per U.S. dollar.`,
    image: IMG.forex,
  },
  {
    id: "a-016",
    slug: "silver-outpaces-gold",
    title: "Silver Quietly Outpaces Gold as Industrial Demand Builds",
    excerpt:
      "Silver's dual role as a monetary and industrial metal is paying off: solar and electronics demand is tightening supply just as investors pile in.",
    category: "Commodities",
    source: "NewzTrade Desk",
    author: "Rabin Adhikari",
    publishedAt: "2026-09-16T09:25:00Z",
    readMinutes: 4,
    body: `While gold's retreat from record highs grabbed headlines, silver has been the steadier performer — outpacing its yellow rival over the past month on the back of tightening industrial demand.\n\nSilver's dual identity is working in its favor. It trades as a monetary metal alongside gold, but more than half of annual consumption now comes from industrial uses, led by solar panels and electronics.\n\nSolar installations continue to grow at double-digit rates globally, and each new generation of panels uses more silver per unit of capacity, according to industry estimates.\n\nThe gold-silver ratio, a favorite gauge of precious-metals traders, has narrowed from extreme levels, though it remains above its long-run average — a gap some analysts see as further upside for silver.\n\nPhysical dealers in Kathmandu report steady retail demand for silver alongside the traditional appetite for gold, a trend that tends to track festival-season buying.`,
    image: IMG.gold,
  },
  {
    id: "a-017",
    slug: "solana-leads-altcoin-rebound",
    title: "Solana Leads Altcoin Rebound as On-Chain Activity Hits New Highs",
    excerpt:
      "Solana outperformed major tokens this week as network activity and decentralized exchange volumes reached record levels.",
    category: "Crypto",
    source: "NewzTrade Desk",
    author: "Maya Gurung",
    publishedAt: "2026-09-15T16:10:00Z",
    readMinutes: 4,
    body: `Solana led a broad altcoin rebound this week, outpacing bitcoin and ether as activity on its network reached record levels.\n\nDaily active addresses and decentralized exchange volumes on the network both hit all-time highs, data shows, driven by a mix of payments applications, memecoin trading and new consumer apps.\n\nThe token's rise has revived a familiar debate: whether Solana's throughput advantages can translate into durable fee revenue, or whether activity spikes will fade as they have in past cycles.\n\nFund flows suggest growing institutional comfort. Several asset managers have filed for Solana-based products, following the path blazed by bitcoin and ether funds.\n\nTraders caution that altcoin rallies historically amplify both directions of the bitcoin cycle — a relationship worth remembering if the market's leader stumbles.`,
    image: IMG.crypto,
  },
  {
    id: "a-018",
    slug: "soft-dollar-remittance-economies",
    title: "Reading the Dollar: What a Soft USD Means for Remittance Economies",
    excerpt:
      "A weaker dollar quietly reshapes the economics of remittance-dependent countries — mostly for the better, with a few catches.",
    category: "Analysis",
    source: "NewzTrade Analysis",
    author: "Maya Gurung",
    publishedAt: "2026-09-15T10:05:00Z",
    readMinutes: 6,
    body: `When the dollar softens, the headlines focus on Wall Street. But for remittance-dependent economies like Nepal, the exchange rate is not a financial abstraction — it is household income.\n\nThe mechanics are worth understanding. Most remittances to Nepal are earned in Gulf currencies and other dollar-linked units, then converted into rupees. A weaker dollar against the Indian rupee — the anchor of Nepal's peg — typically means fewer rupees per dollar remitted, trimming recipients' purchasing power.\n\nThe offsetting benefits are real. Dollar-priced imports, above all fuel, become cheaper in local-currency terms, easing inflation for the very same households.\n\nFor the central bank, a soft-dollar period is an opportunity: reserves accumulate more comfortably, and the pressure to defend the peg recedes.\n\nThe broader lesson for readers is that currency moves are distributional events. Every tick in USD/NPR quietly rearranges who gains and who loses across the economy.`,
    image: IMG.analysis,
  },
  {
    id: "a-019",
    slug: "nabil-bank-q4-earnings",
    title: "Nabil Bank Posts Steady Quarter as Loan Growth Returns",
    excerpt:
      "Nepal's largest commercial bank reported stable margins and improving credit demand, reinforcing its position at the top of NEPSE turnover tables.",
    category: "NEPSE",
    source: "NewzTrade Nepal",
    author: "Prerana Karki",
    publishedAt: "2026-09-14T12:40:00Z",
    readMinutes: 5,
    body: `Nabil Bank, Nepal's largest commercial lender by market value, reported a steady quarter marked by returning loan growth and stable net interest margins.\n\nThe results landed amid a broader rotation into banking stocks on NEPSE, where Nabil consistently ranks among the turnover leaders. Its non-performing loan ratio ticked down for a second consecutive quarter.\n\nManagement struck a cautiously optimistic tone on the call, pointing to improving demand from trade and housing borrowers while acknowledging that provisioning norms under discussion at the central bank remain a watch item.\n\nThe bank's dividend track record continues to anchor its appeal among income-focused retail investors, who make up an unusually large share of NEPSE's participant base.\n\nAnalysts covering the stock say the key variables for the coming quarters are deposit pricing and the pace of credit recovery rather than any single earnings print.`,
    image: IMG.nepse,
  },
  {
    id: "a-020",
    slug: "tesla-deliveries-miss",
    title: "Tesla Slips After Deliveries Miss as EV Competition Intensifies",
    excerpt:
      "The EV maker's quarterly deliveries fell short of expectations, dragging the stock while rivals reported record electric-vehicle sales.",
    category: "Stocks",
    source: "NewzTrade Desk",
    author: "Rabin Adhikari",
    publishedAt: "2026-09-14T08:20:00Z",
    readMinutes: 4,
    body: `Tesla shares slipped after quarterly vehicle deliveries came in below analyst expectations, extending a volatile stretch for one of the market's most closely watched stocks.\n\nThe miss arrives as competition in electric vehicles intensifies across every major market. Chinese manufacturers continue to gain share on price, while legacy automakers' newer models are finally reaching meaningful volumes.\n\nBulls argue the delivery number matters less than it once did, pointing to the company's energy-storage growth and autonomy ambitions as the real long-term story.\n\nSkeptics counter that the core car business still funds everything else, and that margin trends there — not future promises — should anchor the valuation.\n\nThe stock remains among the most traded names globally, and its swings continue to ripple through the indices it anchors.`,
    image: IMG.stocks,
  },
  {
    id: "a-021",
    slug: "euro-dollar-rate-path",
    title: "Euro Edges Higher as Rate Paths Diverge Across the Atlantic",
    excerpt:
      "The euro firmed toward 1.17 per dollar as traders priced a slower U.S. easing cycle than Europe's, narrowing the transatlantic rate gap.",
    category: "Forex",
    source: "NewzTrade Desk",
    author: "Sagar Thapa",
    publishedAt: "2026-09-13T14:55:00Z",
    readMinutes: 4,
    body: `The euro edged higher against the dollar, firming toward 1.17 as traders adjusted to diverging rate expectations between the Federal Reserve and the European Central Bank.\n\nMoney markets now price a slower pace of easing in the United States than in the euro area, a narrowing of the transatlantic rate gap that has historically supported the single currency.\n\nThe move remains modest by recent standards. Volatility in the pair sits near multi-year lows, reflecting conviction on both sides that central banks will move gradually and predictably.\n\nFor emerging and frontier currencies, a stable euro-dollar removes one source of imported volatility — a quiet benefit for pegs like the rupee's link to the Indian currency.\n\nThe next test for the pair arrives with European inflation data at the end of the month.`,
    image: IMG.forex,
  },
  {
    id: "a-022",
    slug: "beginners-guide-nepse-first-trade",
    title: "A Beginner's Guide to Your First NEPSE Trade",
    excerpt:
      "From MeroShare to your first buy order: the practical steps, costs and mistakes every new investor in Nepal should know.",
    category: "Analysis",
    source: "NewzTrade Analysis",
    author: "Prerana Karki",
    publishedAt: "2026-09-12T09:30:00Z",
    readMinutes: 9,
    body: `More Nepalis than ever are entering the stock market. If you're about to place your first trade on NEPSE, here is the path — and the potholes.\n\nThe setup is simple: open a bank account, get a MeroShare login for IPO applications, then open a broker account with a trading management system (TMS) link. The entire process now takes days, not weeks.\n\nYour first decision is not which stock to buy — it is how much to risk. A common rule: only invest money you will not need for at least a year, and start small enough that a 20% drawdown is a lesson, not a crisis.\n\nBeginners on NEPSE make predictable mistakes: chasing stocks after upper circuits, averaging down on falling hydropower counters, and ignoring dividend history in favor of rumors.\n\nThe boring alternative works better. Start with established, liquid names — the commercial banks that dominate turnover — learn how the order book behaves, and only then explore the market's more volatile corners.`,
    image: IMG.analysis,
  },
]

// ---------------------------------------------------------------------------
// Instruments registry — keyword-targeted market entities. When Supabase
// connects, this becomes a table; pages read only through these helpers.
// ---------------------------------------------------------------------------

export interface Instrument {
  slug: string
  symbol: string
  name: string
  market: Category | "Index"
  price: string
  changePct: number
  blurb: string
  keywords: string[]
}

export const instruments: Instrument[] = [
  {
    slug: "nepse-index",
    symbol: "NEPSE",
    name: "NEPSE Index",
    market: "Index",
    price: "2,684.12",
    changePct: 0.84,
    blurb:
      "The NEPSE Index tracks all companies listed on the Nepal Stock Exchange in Kathmandu. It is the primary benchmark for the Nepali share market, covering banking, hydropower, insurance and finance sectors. Today's NEPSE index level, turnover, and advancers/decliners are updated with each trading session.",
    keywords: ["NEPSE", "Nepal Stock Exchange", "nepse index today", "nepal share market"],
  },
  {
    slug: "nabil-bank",
    symbol: "NABIL",
    name: "Nabil Bank Ltd.",
    market: "NEPSE",
    price: "512.00",
    changePct: 3.94,
    blurb:
      "Nabil Bank (NABIL) is Nepal's largest commercial bank by market value and a consistent leader of NEPSE daily turnover. The Nabil Bank share price is among the most watched quotes on the Nepal Stock Exchange, known for its steady dividend history and institutional following.",
    keywords: ["Nabil Bank", "NABIL share price", "nabil bank share price today", "NEPSE banking"],
  },
  {
    slug: "upper-tamakoshi",
    symbol: "UPPER",
    name: "Upper Tamakoshi Hydropower",
    market: "NEPSE",
    price: "318.50",
    changePct: 3.41,
    blurb:
      "Upper Tamakoshi Hydropower (UPPER) operates one of Nepal's largest hydropower plants. The UPPER share price is a bellwether for the hydropower sector on NEPSE, a sector that draws heavy retail participation in the Nepali share market.",
    keywords: ["Upper Tamakoshi", "UPPER share price", "hydropower stocks NEPSE"],
  },
  {
    slug: "hidcl",
    symbol: "HIDCL",
    name: "Hydroelectricity Investment & Development Co.",
    market: "NEPSE",
    price: "188.20",
    changePct: -2.66,
    blurb:
      "Hydroelectricity Investment and Development Company (HIDCL) finances hydropower projects across Nepal. The HIDCL share price tracks investor sentiment toward hydropower financing on the Nepal Stock Exchange.",
    keywords: ["HIDCL", "HIDCL share price", "hydropower investment Nepal"],
  },
  {
    slug: "sp-500",
    symbol: "S&P 500",
    name: "S&P 500 Index",
    market: "Index",
    price: "6,412.30",
    changePct: 0.42,
    blurb:
      "The S&P 500 is the benchmark index of 500 large U.S. companies and the most followed equity gauge in the world. The S&P 500 level today reflects the combined direction of American large-cap stocks across every major sector.",
    keywords: ["S&P 500", "S&P 500 today", "US stock market", "sp500 index"],
  },
  {
    slug: "nasdaq",
    symbol: "NASDAQ",
    name: "Nasdaq Composite",
    market: "Index",
    price: "21,385.77",
    changePct: 0.71,
    blurb:
      "The Nasdaq Composite tracks more than 3,000 companies listed on the Nasdaq exchange, weighted toward technology. The Nasdaq level today is the market's quickest read on the direction of U.S. tech stocks.",
    keywords: ["Nasdaq", "Nasdaq today", "tech stocks", "nasdaq composite"],
  },
  {
    slug: "nifty-50",
    symbol: "NIFTY 50",
    name: "Nifty 50 Index",
    market: "Index",
    price: "24,812.55",
    changePct: -0.18,
    blurb:
      "The Nifty 50 is the flagship index of India's National Stock Exchange, tracking 50 of the country's largest companies. The Nifty 50 today matters to Nepali investors because the rupee's peg to the Indian currency ties the two economies closely together.",
    keywords: ["Nifty 50", "Nifty today", "India stock market", "NSE index"],
  },
  {
    slug: "ftse-100",
    symbol: "FTSE 100",
    name: "FTSE 100 Index",
    market: "Index",
    price: "8,942.61",
    changePct: 0.22,
    blurb:
      "The FTSE 100 tracks the 100 largest companies on the London Stock Exchange. The FTSE 100 today is the benchmark for UK-listed equities and a widely watched gauge for global investors.",
    keywords: ["FTSE 100", "FTSE today", "UK stock market", "London stocks"],
  },
  {
    slug: "bitcoin",
    symbol: "BTC/USD",
    name: "Bitcoin",
    market: "Crypto",
    price: "117,420",
    changePct: 2.36,
    blurb:
      "Bitcoin (BTC) is the largest cryptocurrency by market value. The Bitcoin price today in USD is the most tracked quote in digital assets, moving on ETF flows, macro liquidity and sentiment across global crypto markets.",
    keywords: ["Bitcoin", "bitcoin price today", "BTC USD", "btc price"],
  },
  {
    slug: "ethereum",
    symbol: "ETH/USD",
    name: "Ethereum",
    market: "Crypto",
    price: "4,512.08",
    changePct: 1.12,
    blurb:
      "Ethereum (ETH) powers the largest smart-contract network in crypto. The Ethereum price today reflects staking yields, network activity and institutional adoption across the digital-asset economy.",
    keywords: ["Ethereum", "ethereum price today", "ETH USD", "eth price"],
  },
  {
    slug: "solana",
    symbol: "SOL/USD",
    name: "Solana",
    market: "Crypto",
    price: "214.60",
    changePct: 2.45,
    blurb:
      "Solana (SOL) is a high-throughput blockchain known for fast, low-cost transactions. The Solana price today moves with on-chain activity, decentralized exchange volumes and growing institutional product interest.",
    keywords: ["Solana", "solana price today", "SOL USD", "sol price"],
  },
  {
    slug: "gold",
    symbol: "XAU/USD",
    name: "Gold Spot",
    market: "Commodities",
    price: "3,388.40",
    changePct: -0.27,
    blurb:
      "Gold spot (XAU/USD) is the global benchmark price for an ounce of gold. The gold price today moves with central-bank buying, real interest rates and safe-haven demand — closely watched in Nepal, where gold is both an investment and a cultural store of value.",
    keywords: ["gold price today", "XAU USD", "gold spot price", "gold rate"],
  },
  {
    slug: "brent-crude",
    symbol: "BRENT",
    name: "Brent Crude Oil",
    market: "Commodities",
    price: "82.14",
    changePct: 1.05,
    blurb:
      "Brent crude is the global benchmark for oil prices. The Brent crude price today drives fuel costs worldwide and feeds directly into the import bills and inflation outlook of oil-importing economies like Nepal.",
    keywords: ["Brent crude", "oil price today", "crude oil price", "brent price"],
  },
  {
    slug: "usd-npr",
    symbol: "USD/NPR",
    name: "US Dollar to Nepali Rupee",
    market: "Forex",
    price: "137.62",
    changePct: -0.05,
    blurb:
      "USD/NPR is the exchange rate between the US dollar and the Nepali rupee. The dollar to rupee rate today matters to every household receiving remittances, every importer, and every traveler — making it Nepal's most searched currency quote.",
    keywords: ["USD to NPR", "dollar rate in nepal today", "usd npr exchange rate", "aaja ko dollar rate"],
  },
  {
    slug: "eur-usd",
    symbol: "EUR/USD",
    name: "Euro to US Dollar",
    market: "Forex",
    price: "1.1684",
    changePct: 0.09,
    blurb:
      "EUR/USD is the most traded currency pair in the world. The euro to dollar rate today reflects the interest-rate gap between the European Central Bank and the Federal Reserve.",
    keywords: ["EUR USD", "euro to dollar", "eurusd today", "euro dollar rate"],
  },
  {
    slug: "usd-jpy",
    symbol: "USD/JPY",
    name: "US Dollar to Japanese Yen",
    market: "Forex",
    price: "147.30",
    changePct: -0.33,
    blurb:
      "USD/JPY tracks the dollar against the Japanese yen. The dollar-yen rate today is among the most liquid forex quotes globally and a sensitive gauge of Bank of Japan policy expectations.",
    keywords: ["USD JPY", "dollar to yen", "usdjpy today", "yen rate"],
  },
  {
    slug: "nvidia",
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    market: "Stocks",
    price: "182.44",
    changePct: 2.87,
    blurb:
      "NVIDIA (NVDA) designs the chips powering the global AI buildout. The NVIDIA share price today is one of the most traded quotes in the world and a proxy for sentiment toward artificial-intelligence investment.",
    keywords: ["NVIDIA", "NVDA stock price", "nvidia share price today", "NVDA stock"],
  },
  {
    slug: "tesla",
    symbol: "TSLA",
    name: "Tesla Inc.",
    market: "Stocks",
    price: "241.03",
    changePct: -1.92,
    blurb:
      "Tesla (TSLA) is the world's most watched electric-vehicle maker. The Tesla share price today swings on delivery numbers, margins and the company's energy and autonomy ambitions.",
    keywords: ["Tesla", "TSLA stock price", "tesla share price today", "TSLA stock"],
  },
]

export function getInstrumentBySlug(slug: string): Instrument | undefined {
  return instruments.find((i) => i.slug === slug)
}

export function getInstrumentBySymbol(symbol: string): Instrument | undefined {
  return instruments.find((i) => i.symbol === symbol)
}

/** Deterministic 30-point sparkline series derived from the instrument slug. */
export function sparklinePoints(slug: string, basePrice: number): number[] {
  let seed = 0
  for (const ch of slug) seed = (seed * 31 + ch.charCodeAt(0)) % 9973
  const points: number[] = []
  let value = basePrice
  for (let i = 0; i < 30; i++) {
    seed = (seed * 1103 + 12345) % 2147483647
    const drift = ((seed % 1000) / 1000 - 0.48) * 0.02
    value = Math.max(value * (1 + drift), basePrice * 0.6)
    points.push(Math.round(value * 100) / 100)
  }
  return points
}

export function numericPrice(price: string): number {
  return Number(price.replace(/,/g, ""))
}

/** Articles whose text mentions the instrument's name or keywords. */
export function getRelatedArticles(instrument: Instrument): Article[] {
  const terms = [
    instrument.name.toLowerCase(),
    instrument.symbol.toLowerCase(),
    ...instrument.keywords.map((k) => k.toLowerCase()),
  ]
  return allArticles.filter((a) => {
    const haystack = `${a.title} ${a.excerpt} ${a.body}`.toLowerCase()
    return terms.some((t) => haystack.includes(t))
  })
}

export const instrumentSlugs = instruments.map((i) => i.slug)

export function isValidInstrument(slug: string): boolean {
  return instrumentSlugs.includes(slug)
}

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
