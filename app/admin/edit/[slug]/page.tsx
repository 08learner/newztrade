import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import ArticleEditor, { type EditableArticle } from "@/components/newztrade/admin/ArticleEditor"
import type { Category } from "@/lib/data"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Edit Story — NewzTrade Admin",
  robots: { index: false, follow: false },
}

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/admin")

  if (slug === "new") {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-10">
        <ArticleEditor article={null} />
      </main>
    )
  }

  const { data, error } = await supabase
    .from("articles")
    .select("slug, title, excerpt, body, category, source, author, image, read_minutes, featured, status")
    .eq("slug", slug)
    .maybeSingle()

  if (error || !data) notFound()

  const article: EditableArticle = {
    slug: data.slug as string,
    title: data.title as string,
    excerpt: data.excerpt as string,
    body: data.body as string,
    category: data.category as Category,
    source: data.source as string,
    author: data.author as string,
    image: data.image as string,
    readMinutes: data.read_minutes as number,
    featured: Boolean(data.featured),
    status: (data.status === "draft" ? "draft" : "published") as "draft" | "published",
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <ArticleEditor article={article} />
    </main>
  )
}
