import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { formatDate } from "@/lib/data"
import {
  getArticles,
  getArticleBySlugAsync,
  getArticlesByCategoryAsync,
} from "@/lib/content"
import { Header } from "@/components/newztrade/Header"
import { Footer } from "@/components/newztrade/Footer"
import { ArticleCard } from "@/components/newztrade/ArticleCard"
import { NotFoundBlock } from "@/components/newztrade/NotFoundBlock"
import { ReadingProgress } from "@/components/newztrade/ReadingProgress"
import { BackToTop } from "@/components/newztrade/BackToTop"
import { TrendingRail } from "@/components/newztrade/TrendingRail"
import { ArrowLeft, Clock } from "lucide-react"

export async function generateStaticParams() {
  const articles = await getArticles()
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlugAsync(slug)
  if (!article) return { title: "Not found — NewzTrade" }
  return {
    title: `${article.title} — NewzTrade`,
    description: article.excerpt,
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getArticleBySlugAsync(slug)

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <NotFoundBlock
          title="Story not found"
          message="We couldn't find that article. It may have been moved or removed."
        />
        <Footer />
      </div>
    )
  }

  let related = (await getArticlesByCategoryAsync(article.category))
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3)

  if (related.length < 3) {
    const more = (await getArticles()).filter(
      (a) => a.slug !== article.slug && !related.some((r) => r.slug === a.slug)
    )
    related = [...related, ...more.slice(0, 3 - related.length)]
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    author: { "@type": "Person", name: article.author },
    publisher: { "@type": "Organization", name: "NewzTrade" },
    image: `https://newztrade.com${article.image}`,
    articleSection: article.category,
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgress />
      <Header />
      <main>
        <article className="mx-auto max-w-7xl px-4 sm:px-6 pt-8 pb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" /> NewzTrade
          </Link>

          <div className="mt-6 relative overflow-hidden rounded-xl aspect-[16/9] bg-muted">
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <span className="absolute top-4 left-4 rounded-full bg-up px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
              {article.category}
            </span>
          </div>

          <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_320px] items-start">
          <div className="mx-auto w-full max-w-3xl lg:mx-0">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              {article.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{article.author}</span>
              <span aria-hidden>·</span>
              <span>{article.source}</span>
              <span aria-hidden>·</span>
              <span>{formatDate(article.publishedAt)}</span>
              <span aria-hidden>·</span>
              <span className="flex items-center gap-1">
                <Clock className="size-4" /> {article.readMinutes} min read
              </span>
            </div>

            <p className="mt-8 text-xl sm:text-2xl text-muted-foreground leading-relaxed font-serif">
              {article.excerpt}
            </p>

            <div className="mt-10">
              {article.body.split("\n\n").map((paragraph, i) => (
                <p
                  key={i}
                  className="mt-6 text-lg leading-relaxed text-foreground first:mt-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <TrendingRail
            excludeSlug={article.slug}
            className="lg:sticky lg:top-24"
          />
          </div>
        </article>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-16">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 border-foreground pb-3 mb-8">
            More from NewzTrade
          </h2>
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      </main>
      <BackToTop />
      <Footer />
    </div>
  )
}
