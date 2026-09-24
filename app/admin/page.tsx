import type { Metadata } from "next"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import AdminLogin from "@/components/newztrade/admin/AdminLogin"
import AdminArticleList, { type AdminArticleRow } from "@/components/newztrade/admin/AdminArticleList"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Admin — NewzTrade",
  robots: { index: false, follow: false },
}

export default async function AdminPage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return (
      <main className="mx-auto flex min-h-[60vh] w-full max-w-md flex-col justify-center px-4 py-16">
        <AdminLogin />
      </main>
    )
  }

  const { data, error } = await supabase
    .from("articles")
    .select("slug, title, excerpt, category, author, source, published_at, read_minutes, image, featured, status")
    .order("published_at", { ascending: false })

  const articles = (data ?? []) as unknown as AdminArticleRow[]

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10">
      <AdminArticleList
        articles={articles}
        email={user.email ?? "editor"}
        loadError={error ? "Could not load articles. Try refreshing." : null}
      />
    </main>
  )
}
