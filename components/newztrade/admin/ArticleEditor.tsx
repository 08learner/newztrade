"use client"

import { useEffect, useRef, useState, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { saveArticle, uploadArticleImage, type ArticleInput } from "@/lib/admin/actions"
import type { Category } from "@/lib/data"

const CATEGORIES: Category[] = ["Stocks", "Crypto", "Forex", "NEPSE", "Analysis", "Commodities"]

export interface EditableArticle extends ArticleInput {}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80)
}

const inputClass =
  "mt-1 w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:focus:border-zinc-300"

export default function ArticleEditor({ article }: { article: EditableArticle | null }) {
  const router = useRouter()
  const isNew = article === null

  const [title, setTitle] = useState(article?.title ?? "")
  const [slug, setSlug] = useState(article?.slug ?? "")
  const [slugTouched, setSlugTouched] = useState(!isNew)
  const [excerpt, setExcerpt] = useState(article?.excerpt ?? "")
  const [body, setBody] = useState(article?.body ?? "")
  const [category, setCategory] = useState<Category>(article?.category ?? "NEPSE")
  const [author, setAuthor] = useState(article?.author ?? "NewzTrade Desk")
  const [source, setSource] = useState(article?.source ?? "NewzTrade Desk")
  const [image, setImage] = useState(article?.image ?? "")
  const [readMinutes, setReadMinutes] = useState(article?.readMinutes ?? 0)
  const [featured, setFeatured] = useState(article?.featured ?? false)
  const [status, setStatus] = useState<"draft" | "published">(article?.status ?? "draft")
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()
  const [uploading, setUploading] = useState(false)
  const [localPreview, setLocalPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    return () => {
      if (localPreview) URL.revokeObjectURL(localPreview)
    }
  }, [localPreview])

  function onImageFilePicked(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ""
    if (!file) return
    setError(null)
    if (localPreview) URL.revokeObjectURL(localPreview)
    setLocalPreview(URL.createObjectURL(file))
    setUploading(true)
    const formData = new FormData()
    formData.append("file", file)
    uploadArticleImage(formData)
      .then((result) => {
        if (!result.ok) {
          setError(result.error)
          if (localPreview) URL.revokeObjectURL(localPreview)
          setLocalPreview(null)
          return
        }
        setImage(result.url)
        if (localPreview) URL.revokeObjectURL(localPreview)
        setLocalPreview(null)
      })
      .catch(() => {
        setError("Upload failed. Check your connection and try again.")
        if (localPreview) URL.revokeObjectURL(localPreview)
        setLocalPreview(null)
      })
      .finally(() => setUploading(false))
  }

  function onTitleChange(value: string) {
    setTitle(value)
    if (!slugTouched) setSlug(slugify(value))
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const input: ArticleInput = {
      slug: slugTouched ? slug : slugify(title),
      title,
      excerpt,
      body,
      category,
      source,
      author,
      image,
      readMinutes,
      featured,
      status,
    }
    startTransition(async () => {
      const result = await saveArticle(input)
      if (!result.ok) {
        setError(result.error)
        return
      }
      router.push("/admin")
      router.refresh()
    })
  }

  const wordCount = body.trim() ? body.trim().split(/\s+/).length : 0
  const effectiveReadMinutes = readMinutes > 0 ? readMinutes : Math.max(1, Math.round(wordCount / 200))
  const previewParagraphs = body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-zinc-500">
            <Link href="/admin" className="underline-offset-2 hover:underline">
              ← Back to stories
            </Link>
          </p>
          <h1 className="mt-1 font-serif text-3xl font-bold">
            {isNew ? "New story" : "Edit story"}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as "draft" | "published")}
              className="rounded-md border border-zinc-300 bg-transparent px-2 py-2 text-sm dark:border-zinc-700"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </label>
          <button
            type="submit"
            disabled={pending || uploading}
            className="rounded-md bg-zinc-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            {pending ? "Saving…" : status === "published" ? "Save & publish" : "Save draft"}
          </button>
        </div>
      </div>

      <div>
      {error && (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {error}
        </p>
      )}

      <div className="mt-6 space-y-5">
        <label className="block text-sm font-medium">
          Title
          <input
            type="text"
            required
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className={inputClass}
            placeholder="NEPSE rallies as banking stocks lead gains"
          />
        </label>

        <label className="block text-sm font-medium">
          Slug <span className="font-normal text-zinc-500">(URL: /news/{slug || "…"})</span>
          <input
            type="text"
            required
            value={slug}
            onChange={(e) => {
              setSlugTouched(true)
              setSlug(e.target.value)
            }}
            className={inputClass}
            placeholder="nepse-rallies-banking-stocks"
          />
        </label>

        <label className="block text-sm font-medium">
          Excerpt <span className="font-normal text-zinc-500">(shown on cards and search results)</span>
          <textarea
            required
            rows={2}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className={inputClass}
          />
        </label>

        <label className="block text-sm font-medium">
          Body{" "}
          <span className="font-normal text-zinc-500">
            ({wordCount} words · separate paragraphs with a blank line)
          </span>
          <textarea
            required
            rows={16}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className={`${inputClass} font-mono`}
          />
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            Category
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className={inputClass}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm font-medium">
            Read time (minutes, 0 = auto)
            <input
              type="number"
              min={0}
              value={readMinutes}
              onChange={(e) => setReadMinutes(Number(e.target.value))}
              className={inputClass}
            />
          </label>

          <label className="block text-sm font-medium">
            Author
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className={inputClass}
            />
          </label>

          <label className="block text-sm font-medium">
            Source
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className={inputClass}
            />
          </label>
        </div>

        <div className="block text-sm font-medium">
          Story image{" "}
          <span className="font-normal text-zinc-500">
            (JPEG, PNG, WebP, GIF or AVIF, up to 5 MB)
          </span>
          <div className="mt-1 flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={uploading || pending}
              onClick={() => fileInputRef.current?.click()}
              className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium transition hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
            >
              {uploading ? "Uploading…" : image ? "Replace image" : "Choose image…"}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
              onChange={onImageFilePicked}
              className="hidden"
            />
            {(localPreview || image) && (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element -- admin preview of a just-picked or stored image */}
                <img
                  src={localPreview ?? image}
                  alt="Story image preview"
                  className="h-16 w-24 rounded-md border border-zinc-200 object-cover dark:border-zinc-800"
                />
                <button
                  type="button"
                  disabled={uploading || pending}
                  onClick={() => setImage("")}
                  className="text-xs text-zinc-500 underline-offset-2 hover:underline"
                >
                  Remove
                </button>
              </>
            )}
          </div>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className={inputClass}
            placeholder="…or paste an image URL or /images/… path"
            aria-label="Image URL"
          />
        </div>

        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="h-4 w-4"
          />
          Featured story
        </label>
      </div>
      </div>

      <aside className="lg:sticky lg:top-8 lg:self-start">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Live preview
        </p>
        <article className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
          {(localPreview || image) && (
            // eslint-disable-next-line @next/next/no-img-element -- admin live preview
            <img
              src={localPreview ?? image}
              alt={title || "Story image preview"}
              className="aspect-[2/1] w-full object-cover"
            />
          )}
          <div className="p-5">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full bg-zinc-900 px-2 py-0.5 font-semibold uppercase tracking-wide text-white dark:bg-zinc-100 dark:text-zinc-900">
                {category}
              </span>
              {featured && (
                <span className="rounded bg-amber-100 px-1.5 py-0.5 font-semibold uppercase text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                  Featured
                </span>
              )}
              <span
                className={`rounded-full px-2 py-0.5 font-semibold ${
                  status === "published"
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                    : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                }`}
              >
                {status}
              </span>
            </div>
            <h2 className="mt-3 font-serif text-2xl font-bold leading-snug">
              {title || "Untitled story"}
            </h2>
            <p className="mt-1 text-xs text-zinc-500">
              {author || "NewzTrade Desk"} · {effectiveReadMinutes} min read
            </p>
            {excerpt && <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{excerpt}</p>}
            <div className="mt-4 space-y-3 border-t border-zinc-100 pt-4 text-sm leading-relaxed text-zinc-800 dark:border-zinc-900 dark:text-zinc-200">
              {previewParagraphs.length > 0 ? (
                previewParagraphs.slice(0, 6).map((p, i) => (
                  <p key={i} className="line-clamp-3">
                    {p}
                  </p>
                ))
              ) : (
                <p className="italic text-zinc-400">Start writing the body to see it here…</p>
              )}
              {previewParagraphs.length > 6 && (
                <p className="text-xs text-zinc-400">…{previewParagraphs.length - 6} more paragraphs</p>
              )}
            </div>
          </div>
        </article>
      </aside>
      </div>
    </form>
  )
}
