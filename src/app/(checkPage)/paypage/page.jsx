import SubscriptionClientPage from "./client-page"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

// Este es un Server Component
// Recibe searchParams automáticamente como prop
export default async function SubscriptionPageServer({ searchParams }) {
  const planId = await searchParams.plan_id
  const supabase = await createClient()
  const { data: plans, error } = await supabase.from("plans").select("*")

  if (error) {
    console.error("Error al obtener planes de Supabase:", error)
    redirect("/error?message=" + encodeURIComponent("Error al cargar planes."))
  }


  // **CORRECCIÓN CLAVE:** Asegurarse de que la comparación de IDs sea entre el mismo tipo (ambos strings).
  // Si los IDs de Supabase son números, String(p.id) los convierte a string para la comparación.
  const selectedPlan = plans?.find((p) => String(p.id) === planId)

  if (!selectedPlan) {
    // Si no se encuentra el plan, redirigir a una página de error o a la página de selección de planes
    redirect("/error?message=" + encodeURIComponent("Plan no encontrado o inválido."))
  }

  // Pasa SOLO el plan seleccionado al Client Component
  return <SubscriptionClientPage plan={selectedPlan} />
}
