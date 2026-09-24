import type { Metadata } from "next"
import Link from "next/link"
import { StaticPageShell, StaticSection } from "@/components/newztrade/StaticPageShell"

export const metadata: Metadata = {
  title: "Advertise — Reach Nepal's Market Audience",
  description:
    "Advertising on NewzTrade: planned formats, audience profile and how to register your interest as we grow toward launch.",
}

export default function AdvertisePage() {
  return (
    <StaticPageShell
      title="Advertise with NewzTrade"
      intro="NewzTrade reaches readers who care about markets — in Nepal and worldwide. Advertising opens once our readership and content library reach a sustainable scale."
    >
      <StaticSection heading="Our audience">
        <p>
          Our readers are active and aspiring traders, NEPSE investors,
          remittance-aware households and finance-curious professionals. They
          come for a rare mix: global market coverage plus dedicated Nepal
          Stock Exchange reporting in plain language.
        </p>
      </StaticSection>

      <StaticSection heading="Planned formats">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <span className="font-semibold">Display placements</span> —
            tasteful, clearly-labeled units on article and section pages.
          </li>
          <li>
            <span className="font-semibold">Newsletter sponsorship</span> — a
            single sponsor slot in the daily market brief.
          </li>
          <li>
            <span className="font-semibold">Sponsored explainers</span> —
            clearly-marked educational content reviewed by our editorial desk.
          </li>
        </ul>
      </StaticSection>

      <StaticSection heading="Our principles">
        <ul className="list-disc space-y-2 pl-5">
          <li>Ads are always labeled and never disguised as news.</li>
          <li>No intrusive pop-ups, autoplay video or misleading creatives.</li>
          <li>Editorial coverage is never for sale.</li>
        </ul>
      </StaticSection>

      <StaticSection heading="Register your interest">
        <p>
          Advertising is not live yet. To be notified when slots open, send us
          a note through the{" "}
          <Link href="/contact" className="font-medium text-up hover:underline">
            contact page
          </Link>{" "}
          with your brand and the formats you&apos;re interested in.
        </p>
      </StaticSection>
    </StaticPageShell>
  )
}
