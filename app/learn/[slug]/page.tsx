import Link from "next/link"
import type { Metadata } from "next"
import {
  glossaryTerms,
  glossarySlugs,
  getGlossaryTermBySlug,
  formatDate,
} from "@/lib/data"
import { Header } from "@/components/newztrade/Header"
import { Footer } from "@/components/newztrade/Footer"
import { NotFoundBlock } from "@/components/newztrade/NotFoundBlock"
import { ArrowLeft, GraduationCap } from "lucide-react"

export async function generateStaticParams() {
  return glossarySlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const term = getGlossaryTermBySlug(slug)
  if (!term) return { title: "Not found — NewzTrade" }
  return {
    title: `${term.term} — NewzTrade Learn`,
    description: term.definition,
    keywords: term.keywords,
  }
}

export default async function GlossaryTermPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const term = getGlossaryTermBySlug(slug)

  if (!term) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <NotFoundBlock
          title="Term not found"
          message="We couldn't find that explainer. It may have been moved or removed."
        />
        <Footer />
      </div>
    )
  }

  const related = glossaryTerms.filter((t) => t.slug !== term.slug).slice(0, 3)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term.term,
    description: term.definition,
    inDefinedTermSet: "https://newztrade.com/learn",
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="mx-auto max-w-3xl px-4 sm:px-6 pt-8 pb-16">
        <Link
          href="/learn"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" /> NewzTrade Learn
        </Link>

        <p className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-up">
          <GraduationCap className="size-4" /> Explainer
        </p>
        <h1 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
          {term.term}
        </h1>
        <p className="mt-5 text-xl text-muted-foreground leading-relaxed font-serif">
          {term.definition}
        </p>

        <div className="mt-10">
          {term.body.split("\n\n").map((paragraph, i) => (
            <p
              key={i}
              className="mt-6 text-lg leading-relaxed text-foreground first:mt-0"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <section className="mt-14 border-t border-border pt-8">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 border-foreground pb-3 mb-6">
            Keep learning
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((t) => (
              <Link
                key={t.slug}
                href={`/learn/${t.slug}`}
                className="group rounded-lg border border-border bg-card p-4 transition-colors hover:border-foreground/30"
              >
                <h3 className="font-semibold group-hover:text-up transition-colors">
                  {t.term}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed line-clamp-3">
                  {t.definition}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <p className="mt-10 text-xs text-muted-foreground">
          Educational content only — not investment advice. Updated{" "}
          {formatDate("2026-09-21T00:00:00Z")}.
        </p>
      </main>
      <Footer />
    </div>
  )
}
