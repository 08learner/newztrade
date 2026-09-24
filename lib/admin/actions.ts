"use server"

// Server actions for the NewzTrade article admin (/admin).
// Every mutating action re-checks the Supabase Auth session; RLS on
// public.articles additionally restricts writes to the authenticated role.

import { revalidatePath } from "next/cache"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import type { Category } from "@/lib/data"

export type ActionResult = { ok: true } | { ok: false; error: string }

export interface ArticleInput {
  slug: string
  title: string
  excerpt: string
  body: string
  category: Category
  source: string
  author: string
  image: string
  readMinutes: number
  featured: boolean
  status: "draft" | "published"
}

const CATEGORIES: Category[] = ["Stocks", "Crypto", "Forex", "NEPSE", "Analysis", "Commodities"]

async function requireEditor() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return { supabase, user }
}

/** Revalidate every public surface that renders article content. */
function revalidateSite() {
  revalidatePath("/", "layout")
}

export async function signInWithPassword(
  email: string,
  password: string
): Promise<ActionResult> {
  if (!email.trim() || !password) return { ok: false, error: "Enter your email and password." }
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  })
  if (error) return { ok: false, error: "Sign-in failed. Check your email and password." }
  revalidateSite()
  return { ok: true }
}

export async function signOut(): Promise<ActionResult> {
  const supabase = await createSupabaseServerClient()
  await supabase.auth.signOut()
  revalidateSite()
  return { ok: true }
}

export async function saveArticle(input: ArticleInput): Promise<ActionResult> {
  const { supabase, user } = await requireEditor()
  if (!user) return { ok: false, error: "You are not signed in." }

  const slug = input.slug.trim().toLowerCase()
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return { ok: false, error: "Slug must be lowercase letters, numbers and hyphens (e.g. nepse-rallies-again)." }
  }
  if (!input.title.trim()) return { ok: false, error: "Title is required." }
  if (!input.excerpt.trim()) return { ok: false, error: "Excerpt is required." }
  if (!input.body.trim()) return { ok: false, error: "Body is required." }
  if (!CATEGORIES.includes(input.category)) return { ok: false, error: "Choose a valid category." }

  const readMinutes =
    Number.isFinite(input.readMinutes) && input.readMinutes > 0
      ? Math.round(input.readMinutes)
      : Math.max(1, Math.round(input.body.trim().split(/\s+/).length / 200))

  // Load the existing row so edits keep their original published date and
  // sort position; new articles publish 'now' and never hijack the homepage
  // hero (which takes the lowest sort_order).
  const { data: existing } = await supabase
    .from("articles")
    .select("published_at, sort_order")
    .eq("slug", slug)
    .maybeSingle()

  const row = {
    slug,
    title: input.title.trim(),
    excerpt: input.excerpt.trim(),
    body: input.body,
    category: input.category,
    source: input.source.trim() || "NewzTrade Desk",
    author: input.author.trim() || "NewzTrade Desk",
    image: input.image.trim(),
    read_minutes: readMinutes,
    featured: Boolean(input.featured),
    status: input.status === "draft" ? "draft" : "published",
    published_at: existing?.published_at ?? new Date().toISOString(),
    sort_order: existing?.sort_order ?? 1000,
  }

  const { error } = await supabase.from("articles").upsert(row, { onConflict: "slug" })
  if (error) return { ok: false, error: `Could not save: ${error.message}` }
  revalidateSite()
  return { ok: true }
}

const IMAGE_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
}
const MAX_IMAGE_BYTES = 5 * 1024 * 1024

export type UploadResult = { ok: true; url: string } | { ok: false; error: string }

/** Upload one article hero image picked in the editor to the public
 *  'article-images' Storage bucket. Only the signed-in editor may upload
 *  (session check here + storage.objects INSERT policy on authenticated). */
export async function uploadArticleImage(formData: FormData): Promise<UploadResult> {
  const { supabase, user } = await requireEditor()
  if (!user) return { ok: false, error: "You are not signed in." }

  const file = formData.get("file")
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Choose an image file to upload." }
  }
  const ext = IMAGE_MIME[file.type]
  if (!ext) {
    return { ok: false, error: "Use a JPEG, PNG, WebP, GIF or AVIF image." }
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return { ok: false, error: "Image is too large — keep it under 5 MB." }
  }

  const path = `articles/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const { error } = await supabase.storage.from("article-images").upload(path, file, {
    contentType: file.type,
    upsert: false,
  })
  if (error) return { ok: false, error: `Upload failed: ${error.message}` }

  const {
    data: { publicUrl },
  } = supabase.storage.from("article-images").getPublicUrl(path)
  return { ok: true, url: publicUrl }
}

export async function deleteArticle(slug: string): Promise<ActionResult> {
  const { supabase, user } = await requireEditor()
  if (!user) return { ok: false, error: "You are not signed in." }
  const { error } = await supabase.from("articles").delete().eq("slug", slug)
  if (error) return { ok: false, error: `Could not delete: ${error.message}` }
  revalidateSite()
  return { ok: true }
}

export async function setArticleStatus(
  slug: string,
  status: "draft" | "published"
): Promise<ActionResult> {
  const { supabase, user } = await requireEditor()
  if (!user) return { ok: false, error: "You are not signed in." }
  const { error } = await supabase.from("articles").update({ status }).eq("slug", slug)
  if (error) return { ok: false, error: `Could not update status: ${error.message}` }
  revalidateSite()
  return { ok: true }
}
