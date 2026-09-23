"use client"

import { useEffect, useState } from "react"

// NEPSE trading hours: Sunday–Thursday, 11:00–15:00 Nepal time (Asia/Kathmandu)
function getNepalNow(): { minutes: number; day: number; label: string } {
  const now = new Date()
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kathmandu",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    weekday: "short",
  }).formatToParts(now)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ""
  const hour = Number(get("hour")) % 24
  const minute = Number(get("minute"))
  const dayMap: Record<string, number> = {
    Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
  }
  return {
    minutes: hour * 60 + minute,
    day: dayMap[get("weekday")] ?? 1,
    label: `${get("hour")}:${get("minute")}`,
  }
}

function isMarketOpen(): boolean {
  const { minutes, day } = getNepalNow()
  const tradingDay = day >= 0 && day <= 4 // Sun–Thu
  return tradingDay && minutes >= 11 * 60 && minutes < 15 * 60
}

export function MarketClock() {
  const [state, setState] = useState<{ time: string; open: boolean } | null>(null)

  useEffect(() => {
    const update = () => {
      setState({ time: getNepalNow().label, open: isMarketOpen() })
    }
    update()
    const id = setInterval(update, 30_000)
    return () => clearInterval(id)
  }, [])

  // Render a stable placeholder before hydration to avoid layout shift
  if (!state) {
    return (
      <span className="hidden lg:flex items-center gap-1.5 text-xs text-muted-foreground">
        <span className="size-1.5 rounded-full bg-muted-foreground/40" />
        Markets · NPT --:--
      </span>
    )
  }

  return (
    <span className="hidden lg:flex items-center gap-1.5 text-xs text-muted-foreground">
      <span
        className={`size-1.5 rounded-full ${
          state.open ? "bg-up animate-pulse" : "bg-down"
        }`}
      />
      {state.open ? "Markets open" : "Markets closed"} · NPT {state.time}
    </span>
  )
}
