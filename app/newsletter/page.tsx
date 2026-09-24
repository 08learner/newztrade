import type { Metadata } from "next"
import Link from "next/link"
import { getCurrentDigests } from "@/lib/content"
import { Header } from "@/components/newztrade/Header"
import { Footer } from "@/components/newztrade/Footer"
import { Newsletter } from "@/components/newztrade/Newsletter"
import { Mail, Clock, Globe, Landmark } from "lucide-react"

export const metadata: Metadata = {
  title: "Newsletter — The Daily Market Brief",
  description:
    "One concise email each morning: global markets overnight, NEPSE at open, and the three stories that matter. Free forever.",
}

const perks = [
  {
    icon: Clock,
    title: "Before the bell",
    text: "Delivered every morning before NEPSE opens at 11:00 NPT.",
  },
  {
    icon: Globe,
    title: "Global overnight wrap",
    text: "What Wall Street, Asia and crypto did while you slept.",
  },
  {
    icon: Landmark,
    title: "NEPSE at open",
    text: "The setup for the Kathmandu session in a few short lines.",
  },
]

export default async function NewsletterPage() {
  const digests = await getCurrentDigests()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 pt-12">
        <div className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-up">
            <Mail className="size-4" /> Newsletter
          </p>
          <h1 className="mt-3 font-serif text-3xl sm:text-4xl font-bold tracking-tight">
            The daily market brief
          </h1>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Skip the noise. One short email with the moves and stories that
            actually matter for traders in Nepal and beyond.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
          {perks.map((p) => (
            <div
              key={p.title}
              className="rounded-xl border border-border bg-card p-5 text-center"
            >
              <span className="mx-auto grid size-10 place-items-center rounded-full bg-up-soft text-up">
                <p.icon className="size-4" />
              </span>
              <h2 className="mt-3 font-semibold">{p.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>

        {digests.length > 0 && (
          <section className="mx-auto mt-12 max-w-3xl">
            <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 border-foreground pb-3 mb-4">
              A taste of the brief
            </h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Our daily digests show exactly what lands in your inbox. Read the
              latest:
            </p>
            <ul className="space-y-3">
              {digests.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/daily/${d.slug}`}
                    className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-foreground"
                  >
                    <span className="font-semibold group-hover:underline">
                      {d.title}
                    </span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      Read →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
      <div className="mt-14">
        <Newsletter />
      </div>
      <Footer />
    </div>
  )
}
