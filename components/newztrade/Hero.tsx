import Image from "next/image"
import { articles, featuredArticle, timeAgo } from "@/lib/data"
import { ArrowUpRight, Clock } from "lucide-react"

export function Hero() {
  const sideStories = articles.slice(0, 3)
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-8 pb-12">
      <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        {/* Featured story */}
        <article className="group cursor-pointer">
          <div className="relative overflow-hidden rounded-xl aspect-[16/9] bg-muted">
            <Image
              src={featuredArticle.image}
              alt={featuredArticle.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <span className="absolute top-4 left-4 rounded-full bg-up px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
              {featuredArticle.category}
            </span>
          </div>
          <div className="mt-5 max-w-3xl">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.15] tracking-tight group-hover:underline decoration-up decoration-2 underline-offset-4">
              {featuredArticle.title}
            </h1>
            <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed">
              {featuredArticle.excerpt}
            </p>
            <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">{featuredArticle.author}</span>
              <span aria-hidden>·</span>
              <span className="flex items-center gap-1">
                <Clock className="size-3" /> {timeAgo(featuredArticle.publishedAt)}
              </span>
              <span aria-hidden>·</span>
              <span>{featuredArticle.readMinutes} min read</span>
            </div>
          </div>
        </article>

        {/* Top stories rail */}
        <aside className="flex flex-col">
          <h2 className="flex items-center justify-between border-b-2 border-foreground pb-3 text-sm font-bold uppercase tracking-widest">
            Top Stories
          </h2>
          <ol className="flex-1 divide-y divide-border">
            {sideStories.map((a, i) => (
              <li key={a.id} className="group flex gap-4 py-4 cursor-pointer">
                <span className="font-serif text-3xl font-bold text-border group-hover:text-up transition-colors leading-none pt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-up">
                    {a.category}
                  </span>
                  <h3 className="mt-1 font-serif text-[17px] font-semibold leading-snug group-hover:underline underline-offset-2">
                    {a.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-muted-foreground">{timeAgo(a.publishedAt)}</p>
                </div>
              </li>
            ))}
          </ol>
          <button className="mt-2 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-up hover:gap-2.5 transition-all">
            View all markets news <ArrowUpRight className="size-4" />
          </button>
        </aside>
      </div>
    </section>
  )
}
