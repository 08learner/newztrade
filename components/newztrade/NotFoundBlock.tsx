import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export function NotFoundBlock({
  title,
  message,
  backHref = "/",
  backLabel = "Back to homepage",
}: {
  title: string
  message: string
  backHref?: string
  backLabel?: string
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-24 text-center">
      <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight">{title}</h1>
      <p className="mt-4 text-lg text-muted-foreground max-w-md mx-auto">{message}</p>
      <Link
        href={backHref}
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-semibold text-background hover:bg-foreground/85 transition-colors"
      >
        <ArrowLeft className="size-4" />
        {backLabel}
      </Link>
    </div>
  )
}
