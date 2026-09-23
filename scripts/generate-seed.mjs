// Generates supabase/migrations/0002_content_seed.sql from lib/data.ts.
// Run: node scripts/generate-seed.mjs
import { writeFileSync } from "node:fs"

const data = await import("../lib/data.ts")
const { allArticles, instruments, tickerQuotes, glossaryTerms, marketEvents } = data

const esc = (v) => `'${String(v).replace(/'/g, "''")}'`
const arr = (xs) => `array[${xs.map(esc).join(",")}]::text[]`
const num = (v) => String(v)

const lines = []
lines.push("-- Seed NewzTrade content from the bundled demo source (lib/data.ts).")
lines.push("-- Regenerate with: node scripts/generate-seed.mjs")
lines.push("")

lines.push("insert into public.articles (slug, title, excerpt, body, category, source, author, published_at, read_minutes, image, featured, sort_order) values")
lines.push(
  allArticles
    .map(
      (a, i) =>
        `(${esc(a.slug)}, ${esc(a.title)}, ${esc(a.excerpt)}, ${esc(a.body)}, ${esc(a.category)}, ${esc(a.source)}, ${esc(a.author)}, ${esc(a.publishedAt)}, ${num(a.readMinutes)}, ${esc(a.image)}, ${i === 0}, ${i})`
    )
    .join(",\n") + ";"
)
lines.push("")

lines.push("insert into public.instruments (slug, symbol, name, market, price, change_pct, blurb, keywords, sort_order) values")
lines.push(
  instruments
    .map(
      (x, i) =>
        `(${esc(x.slug)}, ${esc(x.symbol)}, ${esc(x.name)}, ${esc(x.market)}, ${esc(x.price)}, ${num(x.changePct)}, ${esc(x.blurb)}, ${arr(x.keywords)}, ${i})`
    )
    .join(",\n") + ";"
)
lines.push("")

lines.push("insert into public.ticker_quotes (symbol, name, price, change_pct, sort_order) values")
lines.push(
  tickerQuotes
    .map((q, i) => `(${esc(q.symbol)}, ${esc(q.name)}, ${esc(q.price)}, ${num(q.changePct)}, ${i})`)
    .join(",\n") + ";"
)
lines.push("")

lines.push("insert into public.glossary_terms (slug, term, definition, body, keywords, sort_order) values")
lines.push(
  glossaryTerms
    .map(
      (t, i) =>
        `(${esc(t.slug)}, ${esc(t.term)}, ${esc(t.definition)}, ${esc(t.body)}, ${arr(t.keywords)}, ${i})`
    )
    .join(",\n") + ";"
)
lines.push("")

lines.push("insert into public.market_events (date, type, title, description) values")
lines.push(
  marketEvents
    .map((e) => `(${esc(e.date)}, ${esc(e.type)}, ${esc(e.title)}, ${esc(e.description)})`)
    .join(",\n") + ";"
)
lines.push("")

writeFileSync("supabase/migrations/20260923000002_content_seed.sql", lines.join("\n"))
console.log("wrote supabase/migrations/20260923000002_content_seed.sql")
