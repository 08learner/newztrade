import Image from "next/image"
import { articles, nepseSnapshot, IMG, timeAgo } from "@/lib/data"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"

export function NepseSpotlight() {
  const nepseArticles = articles.filter((a) => a.category === "NEPSE").slice(0, 2)
  const up = nepseSnapshot.changePct >= 0

  return (
    <section className="bg-[#101418] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
        <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-8">
          <h2 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-400" />
            NEPSE Spotlight
          </h2>
          <span className="text-xs text-white/50">Nepal Stock Exchange · Kathmandu</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] items-start">
          {/* Index snapshot */}
          <div className="rounded-xl bg-white/5 border border-white/10 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
              NEPSE Index
            </p>
            <div className="mt-3 flex items-end gap-4">
              <span className="font-ticker text-5xl font-semibold tabular-nums tracking-tight">
                {nepseSnapshot.index}
              </span>
              <span
                className={`flex items-center gap-1 pb-1.5 font-ticker text-lg tabular-nums ${
                  up ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {up ? <ArrowUpRight className="size-5" /> : <ArrowDownRight className="size-5" />}
                {up ? "+" : ""}
                {nepseSnapshot.changePct.toFixed(2)}%
              </span>
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-white/10 border border-white/10">
              {[
                { label: "Turnover", value: nepseSnapshot.turnover },
                { label: "Advancers", value: String(nepseSnapshot.advancers), tone: "up" },
                { label: "Decliners", value: String(nepseSnapshot.decliners), tone: "down" },
                { label: "Unchanged", value: String(nepseSnapshot.unchanged) },
              ].map((s) => (
                <div key={s.label} className="bg-[#101418] px-4 py-3.5">
                  <dt className="text-[11px] uppercase tracking-wider text-white/45">{s.label}</dt>
                  <dd
                    className={`mt-1 font-ticker text-lg tabular-nums ${
                      s.tone === "up"
                        ? "text-emerald-400"
                        : s.tone === "down"
                          ? "text-red-400"
                          : "text-white"
                    }`}
                  >
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* NEPSE stories */}
          <div className="space-y-8">
            {nepseArticles.map((a) => (
              <article key={a.id} className="group flex gap-5 sm:gap-6 cursor-pointer">
                <div className="relative hidden sm:block w-44 shrink-0 overflow-hidden rounded-lg aspect-[4/3]">
                  <Image
                    src={a.image}
                    alt={a.title}
                    fill
                    sizes="176px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                    {a.category} · {a.source}
                  </span>
                  <h3 className="mt-2 font-serif text-xl sm:text-2xl font-semibold leading-snug group-hover:underline underline-offset-4">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/60 leading-relaxed line-clamp-2">
                    {a.excerpt}
                  </p>
                  <p className="mt-2 text-xs text-white/40">{timeAgo(a.publishedAt)}</p>
                </div>
              </article>
            ))}
            <div className="relative overflow-hidden rounded-xl aspect-[21/9]">
              <Image
                src={IMG.nepse}
                alt="Kathmandu skyline at dusk"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <p className="absolute bottom-4 left-5 right-5 font-serif text-lg sm:text-xl font-semibold leading-snug">
                Inside Nepal's market: banking, hydropower and the remittance economy — covered
                daily.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
