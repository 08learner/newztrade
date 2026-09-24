import type { Metadata } from "next"
import { StaticPageShell, StaticSection } from "@/components/newztrade/StaticPageShell"

export const metadata: Metadata = {
  title: "Editorial Policy — How NewzTrade Reports Markets",
  description:
    "NewzTrade's editorial standards: sourcing, accuracy, corrections, independence from advertisers, and our demo-content disclosure.",
}

export default function EditorialPolicyPage() {
  return (
    <StaticPageShell
      title="Editorial policy"
      intro="The standards behind every story, digest and explainer published on NewzTrade."
    >
      <StaticSection heading="Accuracy first">
        <p>
          We verify market-moving claims against primary sources — exchange
          notices, company filings and central-bank statements — before
          publication. When speed matters, we label developing stories clearly
          and update them as facts are confirmed.
        </p>
      </StaticSection>

      <StaticSection heading="Independence">
        <p>
          Editorial decisions are made by the news desk alone. Advertisers and
          sponsors have no influence over coverage, and any future sponsored
          material will be clearly labeled. Writers may not trade securities
          they are actively covering within a restricted window.
        </p>
      </StaticSection>

      <StaticSection heading="Corrections">
        <p>
          When we get something wrong, we fix it promptly and note the
          correction on the article. Significant errors are acknowledged at the
          top of the story, not quietly edited away.
        </p>
      </StaticSection>

      <StaticSection heading="Not investment advice">
        <p>
          Nothing on NewzTrade is a recommendation to buy or sell any
          security, currency or commodity. Content is for information and
          education only; markets carry risk and readers should consult a
          licensed advisor.
        </p>
      </StaticSection>

      <StaticSection heading="Demo content disclosure">
        <p>
          During this preview phase, articles, quotes, prices, event dates and
          other market data on the site are illustrative demo content that
          shows how the publication will look and read. They do not reflect
          real market levels, and this notice will be removed when live
          reporting begins.
        </p>
      </StaticSection>
    </StaticPageShell>
  )
}
