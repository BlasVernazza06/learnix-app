"use server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"

export async function login(formData) {
  const supabase = await createClient()

  const data = {
    email: formData.get("email"),
    password: formData.get("password")
  }

  // Validación básica
  if (!data.email || !data.password) {
    return redirect("/login?error=Email y contraseña son requeridos")
  }

  try {
    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
      console.log(error)
      // Manejo de errores de Supabase
      return redirect(`/login?error=${encodeURIComponent(error.message)}`)
    }

    // Revalidar y redirigir tras inicio de sesión exitoso
    revalidatePath("/", "layout")
    redirect("/")

  } catch (err) {
    // Captura de errores inesperados
    console.error("Error de inicio de sesión:", err)
    return redirect("/login?error=Ha ocurrido un error inesperado")
  }
}