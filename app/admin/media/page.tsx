import type { Metadata } from "next"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import AdminLogin from "@/components/newztrade/admin/AdminLogin"
import AdminMediaLibrary from "@/components/newztrade/admin/AdminMediaLibrary"
import { listArticleImages, type ArticleImage } from "@/lib/admin/actions"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Media library — NewzTrade Admin",
  robots: { index: false, follow: false },
}

export default async function AdminMediaPage() {
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

  const result = await listArticleImages()
  const images: ArticleImage[] = result.ok ? result.images : []

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <AdminMediaLibrary
        images={images}
        email={user.email ?? "editor"}
        loadError={result.ok ? null : result.error}
      />
    </main>
  )
}
