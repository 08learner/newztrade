import type { ReactNode } from "react"
import { Header } from "./Header"
import { Footer } from "./Footer"

export function StaticPageShell({
  title,
  intro,
  children,
}: {
  title: string
  intro: string
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-14">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight">{title}</h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{intro}</p>
        <div className="mt-10 space-y-8">{children}</div>
      </main>
      <Footer />
    </div>
  )
}

export function StaticSection({
  heading,
  children,
}: {
  heading: string
  children: ReactNode
}) {
  return (
    <section>
      <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 border-foreground pb-3 mb-4">
        {heading}
      </h2>
      <div className="space-y-4 text-base leading-relaxed text-foreground/90">{children}</div>
    </section>
  )
}
