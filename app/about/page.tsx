import type { Metadata } from "next"
import { StaticPageShell, StaticSection } from "@/components/newztrade/StaticPageShell"

export const metadata: Metadata = {
  title: "About — NewzTrade",
  description:
    "NewzTrade is an independent trading news publication covering global stocks, crypto, forex, commodities and Nepal's NEPSE market.",
}

export default function AboutPage() {
  return (
    <StaticPageShell
      title="About NewzTrade"
      intro="Trading news for everyone — from first-time readers to active traders."
    >
      <StaticSection heading="What we do">
        <p>
          NewzTrade is an independent financial news publication. We cover global markets —
          stocks, crypto, forex and commodities — alongside dedicated reporting on the Nepal
          Stock Exchange (NEPSE), one of the least-covered but fastest-growing retail markets
          in South Asia.
        </p>
        <p>
          Our goal is simple: clear, fast, honest market coverage without jargon walls. Every
          story is written to be useful whether you check prices once a week or trade every
          session.
        </p>
      </StaticSection>
      <StaticSection heading="Our coverage">
        <p>
          Alongside daily news, we publish auto-generated market digests — <strong>NEPSE
          Today</strong> and the <strong>Market Wrap</strong> — that summarize index levels,
          turnover, gainers and losers in a consistent format, every trading day.
        </p>
        <p>
          Coverage spans five sections: Stocks, Crypto, Forex, NEPSE and Analysis, with
          commodities reporting folded into the broader markets stream.
        </p>
      </StaticSection>
      <StaticSection heading="Editorial standards">
        <p>
          Market data shown on NewzTrade is illustrative demonstration content while our data
          integrations are completed. Nothing on this site is investment advice. We correct
          factual errors promptly and label analysis clearly as opinion.
        </p>
      </StaticSection>
      <StaticSection heading="Independence">
        <p>
          NewzTrade earns revenue through advertising. Advertisers do not influence our
          coverage, and sponsored content is always labeled.
        </p>
      </StaticSection>
    </StaticPageShell>
  )
}
