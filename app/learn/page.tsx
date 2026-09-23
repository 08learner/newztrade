import Link from "next/link"
import type { Metadata } from "next"
import { getGlossaryTerms } from "@/lib/content"
import { Header } from "@/components/newztrade/Header"
import { Footer } from "@/components/newztrade/Footer"
import { GraduationCap } from "lucide-react"

export const metadata: Metadata = {
  title: "Learn — Trading Basics & Glossary",
  description:
    "Plain-language explainers for traders and investors: what NEPSE is, how dividends work, P/E ratios, circuit breakers, IPOs and more.",
}

export default async function LearnPage() {
  const glossaryTerms = await getGlossaryTerms()
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="max-w-2xl">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-up">
            <GraduationCap className="size-4" /> NewzTrade Learn
          </p>
          <h1 className="mt-3 font-serif text-3xl sm:text-4xl font-bold tracking-tight">
            Trading basics, in plain language
          </h1>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Short, honest explainers for the terms every investor runs into — with
            special attention to how things work on Nepal's NEPSE market.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {glossaryTerms.map((t) => (
            <Link
              key={t.slug}
              href={`/learn/${t.slug}`}
              className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-foreground/30"
            >
              <h2 className="font-serif text-xl font-bold tracking-tight group-hover:text-up transition-colors">
                {t.term}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {t.definition}
              </p>
              <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-widest text-up">
                Read explainer →
              </span>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
