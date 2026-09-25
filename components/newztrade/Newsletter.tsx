"use client"

import { useState, useTransition } from "react"
import { CheckCircle2, Mail } from "lucide-react"
import { subscribeNewsletter } from "@/lib/newsletter/actions"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    startTransition(async () => {
      const result = await subscribeNewsletter(email)
      if (!result.ok) {
        setError(result.error)
        return
      }
      setDone(true)
    })
  }

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-16">
      <div className="rounded-2xl border border-border bg-card px-6 py-12 sm:px-12 text-center">
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-up-soft text-up">
          <Mail className="size-5" />
        </span>
        <h2 className="mt-5 font-serif text-2xl sm:text-3xl font-bold tracking-tight">
          The market brief, before the bell
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm sm:text-base text-muted-foreground leading-relaxed">
          One concise email each morning — global markets overnight, NEPSE at open, and the three
          stories that matter.
        </p>
        {done ? (
          <p className="mx-auto mt-7 flex max-w-md items-center justify-center gap-2 text-sm font-medium text-up">
            <CheckCircle2 className="size-5" />
            You're on the list — see you before the bell.
          </p>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-11 flex-1 rounded-lg border border-border bg-background px-4 text-sm outline-none placeholder:text-muted-foreground focus:border-up focus:ring-2 focus:ring-up/20 transition"
            />
            <button
              type="submit"
              disabled={pending}
              className="h-11 rounded-lg bg-foreground px-6 text-sm font-semibold text-background hover:bg-foreground/85 transition-colors disabled:opacity-60"
            >
              {pending ? "Subscribing…" : "Subscribe"}
            </button>
          </form>
        )}
        {error && (
          <p role="alert" className="mx-auto mt-3 max-w-md text-xs font-medium text-down">
            {error}
          </p>
        )}
        <p className="mt-4 text-xs text-muted-foreground">Free forever. Unsubscribe anytime.</p>
      </div>
    </section>
  )
}
