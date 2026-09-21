"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { navItems } from "@/lib/data"
import { Search, Zap } from "lucide-react"

function categoryHref(item: string) {
  return item === "Markets" ? "/" : `/${item.toLowerCase()}`
}

export function Header() {
  const pathname = usePathname()
  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-md bg-foreground text-background">
              <Zap className="size-4" strokeWidth={2.5} />
            </span>
            <span className="font-serif text-2xl font-bold tracking-tight">
              Newz<span className="text-up">Trade</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7" aria-label="Primary">
            {navItems.map((item) => {
              const href = categoryHref(item)
              const active = pathname === href || (href !== "/" && pathname.startsWith(href))
              return (
                <Link
                  key={item}
                  href={href}
                  className={`text-sm font-medium transition-colors hover:text-foreground ${
                    active ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {item}
                  {item === "NEPSE" && (
                    <span className="ml-1.5 rounded-full bg-up-soft px-1.5 py-0.5 text-[10px] font-semibold text-up align-middle">
                      NP
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-4">
            <span className="hidden lg:flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-up animate-pulse" />
              Markets open · edited in JBOX round 3
            </span>
            <button
              aria-label="Search"
              className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              <Search className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
