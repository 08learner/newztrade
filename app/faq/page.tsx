import type { Metadata } from "next"
import Link from "next/link"
import { StaticPageShell, StaticSection } from "@/components/newztrade/StaticPageShell"

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions",
  description:
    "Answers to common questions about NewzTrade: what we cover, how NEPSE coverage works, market data, the watchlist and the newsletter.",
}

const faqs = [
  {
    q: "What is NewzTrade?",
    a: "NewzTrade is a trading news website covering global stocks, crypto, forex and commodities, with a dedicated focus on Nepal's NEPSE market — a combination you won't find on most finance sites.",
  },
  {
    q: "Is the market data on NewzTrade real-time?",
    a: "No. Prices, quotes and dates shown on this site are illustrative demo content for layout and editorial purposes. Always verify live prices with your broker or the official exchange before trading.",
  },
  {
    q: "Do I need an account to use the site?",
    a: "No. Every page is public. The watchlist saves your selected instruments privately on your own device — nothing is uploaded or tracked.",
  },
  {
    q: "What is NEPSE?",
    a: "NEPSE is the Nepal Stock Exchange in Kathmandu, the country's only stock exchange. It trades Sunday through Thursday, 11:00–15:00 Nepal time. Our Learn section has a full explainer.",
  },
  {
    q: "How does the watchlist work?",
    a: "Star any instrument — NEPSE stocks, indices, crypto, forex or commodities — and it appears on your Watchlist page. Data is stored in your browser's local storage only.",
  },
  {
    q: "Is the newsletter free?",
    a: "Yes, the daily market brief is free. The signup is currently in preview mode; full delivery begins when the service launches.",
  },
  {
    q: "Is anything on this site investment advice?",
    a: "No. All content is for information and education only. Markets carry risk; consult a licensed advisor before making investment decisions.",
  },
  {
    q: "Can I advertise on NewzTrade?",
    a: "We plan to offer advertising once readership grows. See the Advertise page for the formats we intend to support and how to register interest.",
  },
]

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
}

export default function FaqPage() {
  return (
    <StaticPageShell
      title="Frequently asked questions"
      intro="Quick answers about NewzTrade, our NEPSE coverage, market data and tools."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <StaticSection heading="Questions & answers">
        <dl className="space-y-6">
          {faqs.map((f) => (
            <div
              key={f.q}
              className="rounded-xl border border-border bg-card p-5"
            >
              <dt className="font-semibold">{f.q}</dt>
              <dd className="mt-2 text-muted-foreground leading-relaxed">
                {f.a}
              </dd>
            </div>
          ))}
        </dl>
      </StaticSection>

      <StaticSection heading="Still curious?">
        <p>
          Browse the{" "}
          <Link href="/learn" className="font-medium text-up hover:underline">
            Learn explainers
          </Link>{" "}
          for plain-language trading basics, or reach out via the{" "}
          <Link href="/contact" className="font-medium text-up hover:underline">
            contact page
          </Link>
          .
        </p>
      </StaticSection>
    </StaticPageShell>
  )
}
