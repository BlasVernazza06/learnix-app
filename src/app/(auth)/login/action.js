"use server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"

export async function login(formData) {
  const supabase = await createClient()

  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  }

  console.log("Attempting login with:", { email: data.email }) // Para debug

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.error("Login error:", error.message) // Para debug
    redirect("/login?error=" + encodeURIComponent(error.message))
  }

  revalidatePath("/", "layout")
  redirect("/")
}
