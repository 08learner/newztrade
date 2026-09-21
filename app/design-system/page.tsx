// Development-only design system reference for NewzTrade.
// Shows only the tokens and patterns actually used by the homepage.

const colors = [
  { name: "background", value: "#fafafa", className: "bg-background" },
  { name: "foreground", value: "#101418", className: "bg-foreground" },
  { name: "card", value: "#ffffff", className: "bg-card border border-border" },
  { name: "muted", value: "#f1f3f5", className: "bg-muted" },
  { name: "border", value: "#e4e7eb", className: "bg-border" },
  { name: "up (market green)", value: "#0a8a4a", className: "bg-up" },
  { name: "down (market red)", value: "#d4303e", className: "bg-down" },
  { name: "up-soft", value: "#e6f5ec", className: "bg-up-soft" },
  { name: "down-soft", value: "#fdebec", className: "bg-down-soft" },
]

export default function DesignSystemPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12 space-y-12">
      <header>
        <h1 className="font-serif text-4xl font-bold tracking-tight">
          Newz<span className="text-up">Trade</span> Design System
        </h1>
        <p className="mt-2 text-muted-foreground">Development-only reference for tokens in use.</p>
      </header>

      <section>
        <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 border-foreground pb-3 mb-6">
          Colors
        </h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {colors.map((c) => (
            <li key={c.name} className="flex items-center gap-3">
              <span className={`size-10 rounded-md ${c.className}`} />
              <div>
                <p className="text-sm font-medium">{c.name}</p>
                <p className="text-xs text-muted-foreground font-ticker">{c.value}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 border-foreground pb-3 mb-6">
          Typography
        </h2>
        <p className="font-serif text-3xl font-bold">Newsreader — headlines &amp; brand serif</p>
        <p className="mt-3 text-base">Inter — body copy, UI labels and navigation</p>
        <p className="mt-3 font-ticker text-lg tabular-nums">
          JetBrains Mono — prices &amp; tickers · 2,684.12 +0.84%
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 border-foreground pb-3 mb-6">
          Patterns
        </h2>
        <div className="flex flex-wrap gap-3">
          <span className="rounded-full bg-up px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
            Category pill
          </span>
          <span className="rounded-full bg-up-soft px-3 py-1 text-[11px] font-semibold text-up">
            +0.84% gain
          </span>
          <span className="rounded-full bg-down-soft px-3 py-1 text-[11px] font-semibold text-down">
            -0.27% loss
          </span>
          <span className="rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background">
            Primary button
          </span>
        </div>
      </section>
    </main>
  )
}
