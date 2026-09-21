import { Mail } from "lucide-react"

export function Newsletter() {
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
        <form className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder="you@example.com"
            className="h-11 flex-1 rounded-lg border border-border bg-background px-4 text-sm outline-none placeholder:text-muted-foreground focus:border-up focus:ring-2 focus:ring-up/20 transition"
          />
          <button
            type="submit"
            className="h-11 rounded-lg bg-foreground px-6 text-sm font-semibold text-background hover:bg-foreground/85 transition-colors"
          >
            Subscribe
          </button>
        </form>
        <p className="mt-4 text-xs text-muted-foreground">Free forever. Unsubscribe anytime.</p>
      </div>
    </section>
  )
}
