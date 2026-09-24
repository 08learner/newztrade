// Fetches the full live NEPSE listed-company directory via @writeshh/nepse-sdk
// and generates supabase/migrations/20260924000001_nepse_companies.sql.
// Run: node scripts/seed-nepse-companies.mjs
import { writeFileSync } from "node:fs"
import { Nepse } from "@writeshh/nepse-sdk"

const esc = (v) => `'${String(v ?? "").replace(/'/g, "''")}'`
const num = (v) => String(v)

const nepse = new Nepse({ timeoutMs: 30_000, concurrency: 3 })
let companies
try {
  companies = await nepse.getCompanyList()
} finally {
  nepse.close()
}

if (!Array.isArray(companies) || companies.length === 0) {
  console.error("NEPSE returned no companies — aborting without writing a migration.")
  process.exit(1)
}

console.log(`fetched ${companies.length} companies from NEPSE`)

const lines = []
lines.push("-- Full NEPSE listed-company directory, seeded from the live NEPSE API.")
lines.push("-- Regenerate with: node scripts/seed-nepse-companies.mjs")
lines.push("")
lines.push("create table if not exists public.nepse_companies (")
lines.push("  symbol text primary key,")
lines.push("  company_name text not null,")
lines.push("  sector_name text not null,")
lines.push("  instrument_type text not null default 'Equity',")
lines.push("  status text not null default 'A',")
lines.push("  sort_order integer not null default 0")
lines.push(");")
lines.push("")
lines.push("alter table public.nepse_companies enable row level security;")
lines.push("")
lines.push('create policy "nepse companies are publicly readable"')
lines.push("  on public.nepse_companies for select")
lines.push("  to public")
lines.push("  using (true);")
lines.push("")
lines.push("insert into public.nepse_companies (symbol, company_name, sector_name, instrument_type, status, sort_order) values")
lines.push(
  companies
    .map((c, i) =>
      `(${esc(c.symbol)}, ${esc(c.companyName)}, ${esc(c.sectorName)}, ${esc(c.instrumentType)}, ${esc(c.status)}, ${num(i)})`
    )
    .join(",\n") +
    "\non conflict (symbol) do update set company_name = excluded.company_name, sector_name = excluded.sector_name, instrument_type = excluded.instrument_type, status = excluded.status, sort_order = excluded.sort_order;"
)
lines.push("")

writeFileSync("supabase/migrations/20260924000001_nepse_companies.sql", lines.join("\n"))
console.log("wrote supabase/migrations/20260924000001_nepse_companies.sql")
