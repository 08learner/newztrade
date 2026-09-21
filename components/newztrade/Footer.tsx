import { navItems } from "@/lib/data"
import { Zap } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <a href="/" className="flex items-center gap-2">
              <span className="grid size-7 place-items-center rounded-md bg-foreground text-background">
                <Zap className="size-3.5" strokeWidth={2.5} />
              </span>
              <span className="font-serif text-xl font-bold tracking-tight">
                Newz<span className="text-up">Trade</span>
              </span>
            </a>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Trading news for everyone — global stocks, crypto, forex, commodities and dedicated
              coverage of Nepal's NEPSE market.
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-x-12 gap-y-3 sm:grid-cols-3" aria-label="Footer">
            {navItems.map((item) => (
              <span
                key={item}
                className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
              >
                {item}
              </span>
            ))}
          </nav>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 NewzTrade. All rights reserved.</p>
          <p>Market data shown is illustrative demo content, not investment advice.</p>
        </div>
      </div>
    </footer>
  )
}
