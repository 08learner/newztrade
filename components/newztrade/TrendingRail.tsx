import Link from "next/link"
import { getTrendingArticlesAsync } from "@/lib/content"
import { timeAgo } from "@/lib/data"
import { TrendingUp } from "lucide-react"

export async function TrendingRail({
  excludeSlug,
  className = "",
}: {
  excludeSlug?: string
  className?: string
}) {
  const trending = await getTrendingArticlesAsync(excludeSlug, 5)

  return (
    <section aria-label="Most read today" className={className}>
      <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest border-b-2 border-foreground pb-3">
        <TrendingUp className="size-4 text-up" />
        Most Read Today
      </h3>
      <ol className="divide-y divide-border">
        {trending.map((a, i) => (
          <li key={a.slug}>
            <Link href={`/news/${a.slug}`} className="group flex gap-4 py-4">
              <span className="font-serif text-2xl font-bold leading-none text-muted-foreground/50 group-hover:text-up transition-colors tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h4 className="font-serif font-bold leading-snug group-hover:underline decoration-up decoration-2 underline-offset-4">
                  {a.title}
                </h4>
                <p className="mt-1.5 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-semibold text-up">{a.category}</span>
                  <span aria-hidden>·</span>
                  <span>{timeAgo(a.publishedAt)}</span>
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  )
}
