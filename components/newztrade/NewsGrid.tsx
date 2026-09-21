import Image from "next/image"
import { articles, timeAgo } from "@/lib/data"
import { Clock } from "lucide-react"

export function NewsGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-14">
      <div className="flex items-baseline justify-between border-b-2 border-foreground pb-3 mb-8">
        <h2 className="text-sm font-bold uppercase tracking-widest">Latest News</h2>
        <span className="text-xs text-muted-foreground">Updated continuously</span>
      </div>

      <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {articles.slice(3).map((a) => (
          <article key={a.id} className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg aspect-[16/10] bg-muted">
              <Image
                src={a.image}
                alt={a.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>
            <div className="mt-4">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider">
                <span className="text-up">{a.category}</span>
                <span className="text-muted-foreground/60" aria-hidden>
                  /
                </span>
                <span className="text-muted-foreground font-medium normal-case tracking-normal">
                  {a.source}
                </span>
              </div>
              <h3 className="mt-2 font-serif text-xl font-semibold leading-snug group-hover:underline decoration-up/60 underline-offset-4">
                {a.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                {a.excerpt}
              </p>
              <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="size-3" />
                {timeAgo(a.publishedAt)} · {a.readMinutes} min read
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
