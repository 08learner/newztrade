import Link from "next/link"
import { navItems } from "@/lib/data"
import { Zap } from "lucide-react"

function categoryHref(item: string) {
  return item === "Markets" ? "/" : `/${item.toLowerCase()}`
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2">
              <span className="grid size-7 place-items-center rounded-md bg-foreground text-background">
                <Zap className="size-3.5" strokeWidth={2.5} />
              </span>
              <span className="font-serif text-xl font-bold tracking-tight">
                Newz<span className="text-up">Trade</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Trading news for everyone — global stocks, crypto, forex, commodities and dedicated
              coverage of Nepal's NEPSE market.
            </p>
          </div>
          <div className="flex gap-16">
            <nav className="grid gap-y-3" aria-label="Sections">
              <p className="text-[11px] font-bold uppercase tracking-widest text-foreground">
                Sections
              </p>
              {navItems.map((item) => (
                <Link
                  key={item}
                  href={categoryHref(item)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item}
                </Link>
              ))}
            </nav>
            <nav className="grid gap-y-3" aria-label="Company">
              <p className="text-[11px] font-bold uppercase tracking-widest text-foreground">
                Company
              </p>
              {[
                { label: "Digest Archive", href: "/daily" },
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Use", href: "/terms" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 NewzTrade. All rights reserved.</p>
          <p>Market data shown is illustrative demo content, not investment advice.</p>
        </div>
      </div>
    </footer>
  )
}
