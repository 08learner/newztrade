"use client"

import { useRef, useState, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  deleteArticleImage,
  uploadArticleImage,
  type ArticleImage,
} from "@/lib/admin/actions"

export default function AdminMediaLibrary({
  images,
  email,
  loadError,
}: {
  images: ArticleImage[]
  email: string
  loadError: string | null
}) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(loadError)
  const [copied, setCopied] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function onUploadPicked(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ""
    if (!file) return
    setError(null)
    setUploading(true)
    const formData = new FormData()
    formData.append("file", file)
    uploadArticleImage(formData)
      .then((result) => {
        if (!result.ok) {
          setError(result.error)
          return
        }
        router.refresh()
      })
      .catch(() => setError("Upload failed. Check your connection and try again."))
      .finally(() => setUploading(false))
  }

  function onCopy(img: ArticleImage) {
    navigator.clipboard
      .writeText(img.url)
      .then(() => {
        setCopied(img.name)
        window.setTimeout(() => setCopied((c) => (c === img.name ? null : c)), 2000)
      })
      .catch(() => setError("Could not copy the URL — select and copy it manually."))
  }

  function onDelete(img: ArticleImage) {
    if (!window.confirm(`Delete “${img.name}” permanently? Stories using it will lose their image.`)) {
      return
    }
    setError(null)
    startTransition(async () => {
      const result = await deleteArticleImage(img.name)
      if (!result.ok) {
        setError(result.error)
        return
      }
      router.refresh()
    })
  }

  const busy = pending || uploading

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-zinc-500">
            <Link href="/admin" className="underline-offset-2 hover:underline">
              ← Back to stories
            </Link>
          </p>
          <h1 className="mt-1 font-serif text-3xl font-bold">Media library</h1>
          <p className="mt-1 text-sm text-zinc-500">
            {images.length} image{images.length === 1 ? "" : "s"} uploaded · signed in as {email}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={busy}
            onClick={() => fileInputRef.current?.click()}
            className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            {uploading ? "Uploading…" : "Upload image"}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
            onChange={onUploadPicked}
            className="hidden"
          />
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300"
        >
          {error}
        </p>
      )}

      {images.length === 0 && !error ? (
        <div className="mt-6 rounded-xl border border-dashed border-zinc-300 px-4 py-16 text-center dark:border-zinc-700">
          <p className="text-sm text-zinc-500">
            No uploaded images yet. Upload one here, or pick an image while editing a story.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((img) => (
            <figure
              key={img.name}
              className="group overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- admin grid of arbitrary bucket images */}
              <img
                src={img.url}
                alt={img.name}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
              <figcaption className="p-3">
                <p className="truncate text-xs font-medium" title={img.name}>
                  {img.name}
                </p>
                <p className="mt-0.5 text-[11px] text-zinc-500">
                  {img.sizeKB > 0 ? `${img.sizeKB} KB` : "—"}
                  {img.createdAt &&
                    ` · ${new Date(img.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}`}
                </p>
                <div className="mt-2 flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => onCopy(img)}
                    className="flex-1 rounded-md border border-zinc-300 px-2 py-1 text-xs font-medium transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
                  >
                    {copied === img.name ? "Copied!" : "Copy URL"}
                  </button>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => onDelete(img)}
                    className="rounded-md border border-red-300 px-2 py-1 text-xs font-medium text-red-700 transition hover:bg-red-50 disabled:opacity-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
                  >
                    Delete
                  </button>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  )
}
