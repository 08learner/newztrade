import Image from "next/image"
import Link from "next/link"
import { Article, timeAgo } from "@/lib/data"
import { Clock } from "lucide-react"

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group cursor-pointer">
      <Link href={`/news/${article.slug}`} className="block">
        <div className="relative overflow-hidden rounded-lg aspect-[16/10] bg-muted">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
        <div className="mt-4">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider">
            <span className="text-up">{article.category}</span>
            <span className="text-muted-foreground/60" aria-hidden>
              /
            </span>
            <span className="text-muted-foreground font-medium normal-case tracking-normal">
              {article.source}
            </span>
          </div>
          <h3 className="mt-2 font-serif text-xl font-semibold leading-snug group-hover:underline decoration-up/60 underline-offset-4">
            {article.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {article.excerpt}
          </p>
          <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="size-3" />
            {timeAgo(article.publishedAt)} · {article.readMinutes} min read
          </p>
        </div>
      </Link>
    </article>
  )
}
