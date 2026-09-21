import { articles } from "@/lib/data"
import { ArticleCard } from "./ArticleCard"

export function NewsGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-14">
      <div className="flex items-baseline justify-between border-b-2 border-foreground pb-3 mb-8">
        <h2 className="text-sm font-bold uppercase tracking-widest">Latest News</h2>
        <span className="text-xs text-muted-foreground">Updated continuously</span>
      </div>

      <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {articles.slice(3).map((a) => (
          <ArticleCard key={a.id} article={a} />
        ))}
      </div>
    </section>
  )
}
