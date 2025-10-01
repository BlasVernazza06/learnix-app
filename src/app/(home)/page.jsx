import Courses from "./sections/courses"
import Pricing from "./sections/pricing"
import FAQ from "./sections/faq"
import Link from "next/link"
import { createClient } from "@/utils/supabase/server"

export default async function Home() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser() // Obtener el usuario aquí
  // La información del usuario ya no se obtiene ni se mockea aquí, viene del layout.
  // Por lo tanto, la sección del héroe solo mostrará los botones de registro/login.
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white">
      <main className="flex flex-col items-center justify-center flex-1 pt-24 pb-16">
        <div className="max-w-5xl w-full px-6 sm:px-8 lg:px-10">
          <section className="text-center py-16 md:py-24">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
              Desarrolla tus conocimientos del <strong className="text-blue-500">Area IT</strong>
            </h1>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              Aprende las habilidades más demandadas en tecnología con nuestros cursos interactivos y planes flexibles.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
              {user ? (
                <>
                  <p className="text-xl text-gray-300 font-semibold">
                    ¡Bienvenido de nuevo, <span className="text-blue-400">{user.user_metadata?.name || "Usuario"}</span>
                    !
                  </p>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center px-8 py-6 text-lg font-medium rounded-xl shadow-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    Ir a mi Dashboard
                  </Link>
                </>
              ) : (
                // Si el usuario NO está logueado (estado actual)
                <>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center px-8 py-6 text-lg font-medium rounded-xl shadow-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    Sé parte de nuestra Escuela
                  </Link>
                  <span className="text-gray-400 text-base">
                    O si ya eres parte,{" "}
                    <Link href="/login" className="text-blue-500 hover:underline">
                      Inicia Sesión
                    </Link>
                  </span>
                </>
              )}
            </div>
          </section>

          <section id="courses" className="py-16 md:py-24">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">Nuestros Cursos</h2>
            <Courses />
          </section>

          <section id="pricing" className="py-16 md:py-24">
            <Pricing />
          </section>

          <section id="FAQ" className="py-16 md:py-24">
            <FAQ />
          </section>
        </div>
      </main>
    </div>
  )
}
