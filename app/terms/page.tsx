import type { Metadata } from "next"
import { StaticPageShell, StaticSection } from "@/components/newztrade/StaticPageShell"

export const metadata: Metadata = {
  title: "Terms of Use — NewzTrade",
  description: "The terms that govern your use of NewzTrade.",
}

export default function TermsPage() {
  return (
    <StaticPageShell
      title="Terms of Use"
      intro="Last updated: September 2026. By using NewzTrade, you agree to these terms."
    >
      <StaticSection heading="Not investment advice">
        <p>
          NewzTrade provides news and market information for general informational purposes
          only. Nothing on this site constitutes investment, legal, tax or financial advice.
          Market data is illustrative and may be delayed or inaccurate. Always do your own
          research and consult a licensed advisor before making investment decisions.
        </p>
      </StaticSection>
      <StaticSection heading="Content ownership">
        <p>
          Articles, digests, design and branding on NewzTrade are our property and may not be
          republished without permission. Short quotations with attribution and a link are
          welcome.
        </p>
      </StaticSection>
      <StaticSection heading="Acceptable use">
        <p>
          You agree not to scrape the site at disruptive volumes, misrepresent our content, or
          use the site for unlawful purposes.
        </p>
      </StaticSection>
      <StaticSection heading="Liability">
        <p>
          The site is provided "as is" without warranties. To the maximum extent permitted by
          law, NewzTrade is not liable for losses arising from reliance on our content.
        </p>
      </StaticSection>
    </StaticPageShell>
  )
}
