import type { Metadata } from "next"
import { StaticPageShell, StaticSection } from "@/components/newztrade/StaticPageShell"

export const metadata: Metadata = {
  title: "Privacy Policy — NewzTrade",
  description: "How NewzTrade collects, uses and protects your information.",
}

export default function PrivacyPage() {
  return (
    <StaticPageShell
      title="Privacy Policy"
      intro="Last updated: September 2026. This policy explains what information NewzTrade collects and how we use it."
    >
      <StaticSection heading="Information we collect">
        <p>
          NewzTrade is a read-only news publication. We do not require accounts, and we do not
          collect personal information beyond what your browser provides automatically — such
          as anonymized usage analytics (pages visited, approximate region, device type).
        </p>
      </StaticSection>
      <StaticSection heading="Cookies and advertising">
        <p>
          We use cookies to remember preferences and to support advertising. When advertising
          is enabled, third-party vendors (including Google) may use cookies to serve ads based
          on your prior visits to this or other websites. You can opt out of personalized
          advertising through your ad settings.
        </p>
      </StaticSection>
      <StaticSection heading="What we never do">
        <p>
          We never sell personal information to data brokers, never track you across unrelated
          sites for our own purposes, and never publish reader data.
        </p>
      </StaticSection>
      <StaticSection heading="Changes and contact">
        <p>
          If this policy changes, we will update the date above. Questions can be sent to{" "}
          <a
            href="mailto:privacy@newztrade.com"
            className="font-medium text-up hover:underline underline-offset-4"
          >
            privacy@newztrade.com
          </a>
          .
        </p>
      </StaticSection>
    </StaticPageShell>
  )
}
