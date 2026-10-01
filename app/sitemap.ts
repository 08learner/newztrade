import type { MetadataRoute } from "next"
import { categorySlugs } from "@/lib/data"
import { getSiteContent } from "@/lib/content"

const BASE_URL = "https://newztrade.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { articles, instruments, glossaryTerms, digests } = await getSiteContent()
  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/daily",
    "/watchlist",
    "/screener",
    "/calendar",
    "/learn",
    "/ipo",
    "/dividends",
    "/sectors",
    "/currencies",
    "/bullion",
    "/market-hours",
    "/faq",
    "/newsletter",
    "/advertise",
    "/editorial-policy",
  ].map(
    (path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
    })
  )

  const categoryRoutes = categorySlugs.map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: new Date(),
  }))

  const articleRoutes = articles.map((a) => ({
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

  const learnRoutes = glossaryTerms.map((t) => ({
    url: `${BASE_URL}/learn/${t.slug}`,
    lastModified: new Date(),
  }))

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...articleRoutes,
    ...digestRoutes,
    ...instrumentRoutes,
    ...learnRoutes,
  ]
}
