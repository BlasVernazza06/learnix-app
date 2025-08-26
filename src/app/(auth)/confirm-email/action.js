"use server"

import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export async function confirmEmail(token) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.verifyOtp({
    token_hash: token,
    type: "email",
  })

  if (error) {
    console.error("Email confirmation error:", error)
    return {
      success: false,
      error: error.message,
    }
  }

  console.log("Email confirmed successfully:", data)
  redirect("/")
}
