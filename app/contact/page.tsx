import type { Metadata } from "next"
import { Mail, MapPin } from "lucide-react"
import { StaticPageShell, StaticSection } from "@/components/newztrade/StaticPageShell"

export const metadata: Metadata = {
  title: "Contact — NewzTrade",
  description: "Get in touch with the NewzTrade editorial and business teams.",
}

export default function ContactPage() {
  return (
    <StaticPageShell
      title="Contact"
      intro="Questions, corrections, tips or partnership inquiries — we'd like to hear from you."
    >
      <StaticSection heading="Editorial">
        <p>
          For news tips, corrections, or coverage requests, write to our editorial desk. Please
          include sources where possible; we verify every tip before publishing.
        </p>
        <p className="flex items-center gap-2">
          <Mail className="size-4 text-up" />
          <a
            href="mailto:editorial@newztrade.com"
            className="font-medium text-up hover:underline underline-offset-4"
          >
            editorial@newztrade.com
          </a>
        </p>
      </StaticSection>
      <StaticSection heading="Advertising & partnerships">
        <p>
          NewzTrade is supported by advertising. For sponsorship and partnership inquiries,
          contact our business team.
        </p>
        <p className="flex items-center gap-2">
          <Mail className="size-4 text-up" />
          <a
            href="mailto:ads@newztrade.com"
            className="font-medium text-up hover:underline underline-offset-4"
          >
            ads@newztrade.com
          </a>
        </p>
      </StaticSection>
      <StaticSection heading="Location">
        <p className="flex items-center gap-2">
          <MapPin className="size-4 text-up" />
          Kathmandu, Nepal — with coverage of global markets.
        </p>
      </StaticSection>
    </StaticPageShell>
  )
}
