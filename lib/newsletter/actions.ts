"use server"

// Newsletter capture for NewzTrade. The public form may only INSERT into
// public.newsletter_subscribers (RLS); reading subscriber data requires the
// authenticated editor session. No email-sending service is wired yet.

import { createSupabaseServerClient } from "@/lib/supabase/server"

export type SubscribeResult = { ok: true } | { ok: false; error: string }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function subscribeNewsletter(email: string): Promise<SubscribeResult> {
  const trimmed = email.trim().toLowerCase()
  if (!EMAIL_RE.test(trimmed) || trimmed.length > 254) {
    return { ok: false, error: "Enter a valid email address." }
  }

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase
    .from("newsletter_subscribers")
    .insert({ email: trimmed, source: "site" })

  if (error) {
    // Unique-violation: this address is already on the list.
    if (error.code === "23505") return { ok: true }
    return { ok: false, error: "Could not subscribe right now. Please try again." }
  }
  return { ok: true }
}
