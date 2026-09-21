import type { MetadataRoute } from "next"
import { allArticles, categorySlugs, instruments } from "@/lib/data"
import { digests } from "@/lib/digest"

const BASE_URL = "https://newztrade.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/contact", "/privacy", "/terms", "/daily"].map(
    (path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
    })
  )

  const categoryRoutes = categorySlugs.map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: new Date(),
  }))

  const articleRoutes = allArticles.map((a) => ({
    url: `${BASE_URL}/news/${a.slug}`,
    lastModified: new Date(a.publishedAt),
  }))

  const digestRoutes = digests.map((d) => ({
    url: `${BASE_URL}/daily/${d.slug}`,
    lastModified: new Date(d.publishedAt),
  }))

  const instrumentRoutes = instruments.map((i) => ({
    url: `${BASE_URL}/instrument/${i.slug}`,
    lastModified: new Date(),
  }))

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...articleRoutes,
    ...digestRoutes,
    ...instrumentRoutes,
  ]
}
