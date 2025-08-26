import { createServerClient } from "@supabase/ssr"
import { NextResponse } from "next/server"

export async function updateSession(request) {
  const supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options)
        })
      },
    },
  })

  // 🚨 IMPORTANTE: Esto siempre tiene que ejecutarse
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 🔓 Rutas públicas (accesibles sin autenticación)
  const publicRoutes = ["/", "/login", "/register", "/confirm-email", "*"]

  // Si no hay usuario y la ruta no es pública → redirigir a /login
  {/*if (!user && !publicRoutes.includes(request.nextUrl.pathname)) {
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }*/}

  return supabaseResponse
}
