"use client"

import { useState, useTransition } from "react"
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

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold">Stories</h1>
          <p className="mt-1 text-sm text-zinc-500">
            {articles.length} total · {published} published · {articles.length - published} draft
            {articles.length - published === 1 ? "" : "s"} · signed in as {email}
          </p>
        </div>
        <div className="flex items-center gap-2">
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

      <div className="mt-6 overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
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
            {articles.map((a) => (
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
            {articles.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-zinc-500">
                  No stories yet. Create your first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
