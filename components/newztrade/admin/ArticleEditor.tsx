"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { saveArticle, type ArticleInput } from "@/lib/admin/actions"
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

  return (
    <form onSubmit={onSubmit}>
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
            disabled={pending}
            className="rounded-md bg-zinc-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            {pending ? "Saving…" : status === "published" ? "Save & publish" : "Save draft"}
          </button>
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
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

        <label className="block text-sm font-medium">
          Image URL <span className="font-normal text-zinc-500">(path like /images/….jpg or a full URL)</span>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className={inputClass}
            placeholder="/images/…"
          />
        </label>

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
    </form>
  )
}
