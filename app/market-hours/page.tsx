import type { Metadata } from "next"
import { StaticPageShell, StaticSection } from "@/components/newztrade/StaticPageShell"

export const metadata: Metadata = {
  title: "Market Hours — NEPSE & Global Trading Sessions",
  description:
    "Trading hours for NEPSE and the world's major exchanges: Kathmandu, New York, London, Tokyo and more, with Nepal time conversions.",
}

const sessions = [
  {
    name: "NEPSE (Nepal Stock Exchange)",
    city: "Kathmandu",
    local: "Sun–Thu, 11:00–15:00 NPT",
    npt: "11:00 – 15:00",
    note: "Closed Fridays, Saturdays and public holidays. Pre-open from 10:30.",
  },
  {
    name: "NYSE & NASDAQ",
    city: "New York",
    local: "Mon–Fri, 09:30–16:00 ET",
    npt: "19:15 – 01:45 (summer) / 20:15 – 02:45 (winter)",
    note: "US daylight saving shifts the Nepal-time window by one hour.",
  },
  {
    name: "London Stock Exchange",
    city: "London",
    local: "Mon–Fri, 08:00–16:30 GMT/BST",
    npt: "12:45 – 21:15 (summer) / 13:45 – 22:15 (winter)",
    note: "No lunch break; auctions open and close the session.",
  },
  {
    name: "Tokyo Stock Exchange",
    city: "Tokyo",
    local: "Mon–Fri, 09:00–15:00 JST (lunch 11:30–12:30)",
    npt: "05:45 – 11:45",
    note: "Closes for a one-hour lunch each day.",
  },
  {
    name: "National Stock Exchange of India",
    city: "Mumbai",
    local: "Mon–Fri, 09:15–15:30 IST",
    npt: "09:30 – 15:45",
    note: "India is 15 minutes behind Nepal — the closest major session.",
  },
  {
    name: "Crypto markets",
    city: "Global",
    local: "24/7",
    npt: "Always open",
    note: "Digital assets trade around the clock, including weekends.",
  },
]

export default function MarketHoursPage() {
  return (
    <StaticPageShell
      title="Market hours around the world"
      intro="When each major exchange is open, converted to Nepal time (NPT, UTC+5:45). Plan your day from NEPSE's midday session to Wall Street's late evening close."
    >
      <StaticSection heading="Trading sessions">
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 font-semibold">Exchange</th>
                <th className="px-4 py-3 font-semibold">Local hours</th>
                <th className="px-4 py-3 font-semibold">Nepal time (NPT)</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((s) => (
                <tr
                  key={s.name}
                  className="border-b border-border last:border-0 align-top"
                >
                  <td className="px-4 py-3">
                    <p className="font-semibold">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.city}</p>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{s.local}</td>
                  <td className="px-4 py-3 font-medium">{s.npt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </StaticSection>

      <StaticSection heading="Good to know">
        <ul className="list-disc space-y-2 pl-5">
          {sessions.map((s) => (
            <li key={s.name}>
              <span className="font-semibold">{s.name}:</span> {s.note}
            </li>
          ))}
        </ul>
      </StaticSection>

      <StaticSection heading="NEPSE's weekly rhythm">
        <p>
          NEPSE trades Sunday through Thursday, with Friday and Saturday as the
          weekend. The session runs from 11:00 to 15:00 Nepal time, preceded by
          a pre-open session at 10:30. Trading halts automatically when the
          index hits circuit-breaker thresholds of 4%, 5% and 6% against the
          previous close.
        </p>
        <p className="text-xs text-muted-foreground">
          Hours are illustrative demo content and can change for holidays,
          daylight saving and exchange notices.
        </p>
      </StaticSection>
    </StaticPageShell>
  )
}
