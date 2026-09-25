"use client"

import { useMemo, useState, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { deleteArticle, setArticleStatus, signOut } from "@/lib/admin/actions"

export interface AdminArticleRow {
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  source: string
  published_at: string
  read_minutes: number
  image: string
  featured: boolean
  status: "draft" | "published"
}

export default function AdminArticleList({
  articles,
  email,
  loadError,
}: {
  articles: AdminArticleRow[]
  email: string
  loadError: string | null
}) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(loadError)
  const [query, setQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState<"all" | "draft" | "published">("all")

  function run(action: () => Promise<{ ok: boolean; error?: string }>) {
    setError(null)
    startTransition(async () => {
      const result = await action()
      if (!result.ok) {
        setError(result.error ?? "Something went wrong.")
        return
      }
      router.refresh()
    })
  }

  const published = articles.filter((a) => a.status === "published").length
  const drafts = articles.length - published
  const featuredCount = articles.filter((a) => a.featured).length

  const categories = useMemo(
    () => Array.from(new Set(articles.map((a) => a.category))).sort(),
    [articles]
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return articles.filter((a) => {
      if (statusFilter !== "all" && a.status !== statusFilter) return false
      if (categoryFilter !== "all" && a.category !== categoryFilter) return false
      if (q && !`${a.title} ${a.author} ${a.slug}`.toLowerCase().includes(q)) return false
      return true
    })
  }, [articles, query, categoryFilter, statusFilter])

  const stats = [
    { label: "Total stories", value: articles.length },
    { label: "Published", value: published },
    { label: "Drafts", value: drafts },
    { label: "Featured", value: featuredCount },
  ]

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold">Stories</h1>
          <p className="mt-1 text-sm text-zinc-500">Signed in as {email}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/media"
            className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
          >
            Media library
          </Link>
          <Link
            href="/admin/edit/new"
            className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            New story
          </Link>
          <button
            type="button"
            disabled={pending}
            onClick={() => run(signOut)}
            className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium transition hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
          >
            Sign out
          </button>
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {error}
        </p>
      )}

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
          >
            <p className="text-2xl font-bold tabular-nums">{s.value}</p>
            <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-zinc-500">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, author, or slug…"
          aria-label="Search stories"
          className="w-full min-w-48 flex-1 rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-zinc-900 sm:max-w-xs dark:border-zinc-700 dark:focus:border-zinc-300"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          aria-label="Filter by category"
          className="rounded-md border border-zinc-300 bg-transparent px-2 py-2 text-sm dark:border-zinc-700"
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as "all" | "draft" | "published")}
          aria-label="Filter by status"
          className="rounded-md border border-zinc-300 bg-transparent px-2 py-2 text-sm dark:border-zinc-700"
        >
          <option value="all">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Drafts</option>
        </select>
        {(query || categoryFilter !== "all" || statusFilter !== "all") && (
          <button
            type="button"
            onClick={() => {
              setQuery("")
              setCategoryFilter("all")
              setStatusFilter("all")
            }}
            className="text-xs text-zinc-500 underline-offset-2 hover:underline"
          >
            Clear filters
          </button>
        )}
        <span className="ml-auto text-xs text-zinc-500">
          {filtered.length} of {articles.length}
        </span>
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-zinc-200 bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Published</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr
                key={a.slug}
                className="border-b border-zinc-100 last:border-0 dark:border-zinc-900"
              >
                <td className="max-w-xs px-4 py-3">
                  <span className="font-medium">{a.title}</span>
                  {a.featured && (
                    <span className="ml-2 rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                      Featured
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-zinc-500">{a.category}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      a.status === "published"
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                        : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                    }`}
                  >
                    {a.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-zinc-500">
                  {new Date(a.published_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    {a.status === "published" && (
                      <Link
                        href={`/news/${a.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md border border-zinc-300 px-2.5 py-1 text-xs font-medium transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
                      >
                        View live ↗
                      </Link>
                    )}
                    <Link
                      href={`/admin/edit/${a.slug}`}
                      className="rounded-md border border-zinc-300 px-2.5 py-1 text-xs font-medium transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      disabled={pending}
                      onClick={() =>
                        run(() =>
                          setArticleStatus(
                            a.slug,
                            a.status === "published" ? "draft" : "published"
                          )
                        )
                      }
                      className="rounded-md border border-zinc-300 px-2.5 py-1 text-xs font-medium transition hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
                    >
                      {a.status === "published" ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      type="button"
                      disabled={pending}
                      onClick={() => {
                        if (window.confirm(`Delete “${a.title}” permanently?`)) {
                          run(() => deleteArticle(a.slug))
                        }
                      }}
                      className="rounded-md border border-red-300 px-2.5 py-1 text-xs font-medium text-red-700 transition hover:bg-red-50 disabled:opacity-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-zinc-500">
                  {articles.length === 0
                    ? "No stories yet. Create your first one."
                    : "No stories match the current filters."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
