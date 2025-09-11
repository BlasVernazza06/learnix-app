"use client"

import { useState, useRef, useEffect } from "react"
import { Check, Star, CreditCard, X, CheckCircle } from "lucide-react"
import gsap from "gsap"
import { EmbeddedCheckout, EmbeddedCheckoutProvider, LinkAuthenticationElement } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import Link from 'next/link'

// Importa la Server Action para obtener el client secret
import { fetchClientSecret } from "../actions/stripe"
import ButtonBack from "../dashboard/components/buttonBack"

// Carga Stripe fuera del componente para evitar recargas innecesarias
const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null

// El componente ahora recibe 'plan' directamente, no 'plans'
export default function SubscriptionClientPage({ plan }) {
  const [expanded, setExpanded] = useState(false)
  const containerRef = useRef(null)
  const paymentRef = useRef(null)

  // Opciones para Stripe Embedded Checkout
  // Solo se define si plan y stripePromise están disponibles
  const options =
    plan && stripePromise
      ? {
          fetchClientSecret: async () => {
            try {
              // Pasa el stripe_price_id del plan seleccionado a la Server Action
              const clientSecret = await fetchClientSecret(plan.stripe_price_id)
              return clientSecret
            } catch (error) {
              console.error("Error en fetchClientSecret:", error)
              throw error // Re-lanza el error para que Stripe.js lo maneje
            }
          },
        }
      : undefined // options será undefined si plan o stripePromise no están listos

  useEffect(() => {
    gsap.set(paymentRef.current, { width: 0, opacity: 0, overflow: "hidden" })
  }, [])

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 0.4 } })

    if (expanded) {
      // Aumentamos el ancho total para dar más espacio al panel de pago
      tl.to(containerRef.current, { width: "810px" }) // 360px (plan) + 450px (pago)
      // El panel de pago ahora tendrá 450px de ancho
      tl.to(paymentRef.current, { width: "450px", opacity: 1, overflow: "visible" }, "<0.1")
    } else {
      tl.to(paymentRef.current, { width: 0, opacity: 0, overflow: "hidden" })
      tl.to(containerRef.current, { width: "360px" }, "<0.1")
    }
  }, [expanded])

  // Si el plan no se pasa (lo cual no debería ocurrir si el Server Component funciona bien)
  if (!plan) {
    return <div className="min-h-screen flex justify-center items-center">Plan no disponible.</div>
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white">
      <div className="absolute top-6 left-6 z-20">
        <ButtonBack />
      </div>
      <div
        ref={containerRef}
        className="h-max bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex relative border border-gray-700"
        style={{ width: "360px", height: "750px" }} // Altura reducida, pero con más espacio horizontal
      >
        {/* Logo y nombre de la marca - siempre visible en la card grande */}
        <Link 
          href={'/'}
          className="absolute top-6 left-6 flex items-center gap-2 text-white z-10">
          <img src="/icon-Brand.svg" className="size-8" alt="Learnix logo" />
          <span className="text-xl font-semibold">Learnix</span>
        </Link>

        {/* Contenedor para las dos secciones principales (plan y pago) */}
        <div className="flex h-full w-full">
          {/* 🟦 Información del plan (Tarjeta 1 - contenido fijo dentro de la card grande) */}
          {/* Ajustes para centrar la tarjeta oscura y el texto de seguridad al final */}
          <div className="flex-shrink-0 w-[360px] p-6 flex flex-col justify-between">
            {/* Este div flex-1 centrará la tarjeta del plan dentro del espacio disponible */}
            <div className="flex flex-col items-center justify-center mt-12">
              <div className="flex flex-col mb-5 w-full bg-gray-800 rounded-xl shadow-lg p-6 text-white relative border border-gray-700">
                {/* Badge PRO - posicionado para superponerse ligeramente */}
                {plan.badge && (
                  <div
                    className={`absolute -top-3 -left-3 bg-gradient-to-r ${plan.badge.color} text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md flex items-center gap-1`}
                  >
                    <Star className="size-3.5" /> {plan.badge.text}
                  </div>
                )}

                {/* Placeholder para el selector de plan (Plan Anual) */}
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 bg-blue-900/30 text-blue-300 text-sm font-medium px-3 py-1 rounded-full">
                    <div className="w-2 h-2 bg-blue-400 rounded-full" />
                    Plan Anual
                  </div>
                </div>

                <h2 className="text-xl font-semibold text-white mb-1">{plan.name}</h2>
                <ul className="space-y-2 text-gray-300 text-sm mb-6">
                  {Object.values(plan.description).map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="text-green-400 size-4" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-white">
                      ${plan.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-sm text-gray-400">por mes</span>
                  </div>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-2 font-medium transition-transform duration-200 hover:scale-[1.02] shadow-md"
                    onClick={() => setExpanded(true)}
                  >
                    Suscribirme
                  </button>
                </div>
              </div>

              <div className="flex flex-col w-full bg-gray-800 rounded-xl shadow-lg p-6 text-white relative border border-gray-700">
                <h3 className="text-lg font-semibold mb-3">Datos de prueba</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Usa estos datos para simular una suscripción en modo <span className="text-yellow-400 font-medium">TEST</span>.
                </p>

                <ul className="space-y-2 text-[12px]">
                  <li className="flex items-center gap-2">
                    <Check className="text-green-400 size-4" />
                    <span>
                      <strong>Número de tarjeta:</strong> 4242 4242 4242 4242
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="text-green-400 size-4" />
                    <span>
                      <strong>Fecha:</strong> Cualquier futura (ej: 12/34)
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="text-green-400 size-4" />
                    <span>
                      <strong>CVC:</strong> Cualquier valor (ej: 123)
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="text-green-400 size-4" />
                    <span>
                      <strong>Correo:</strong> correo@ejemplo.com
                    </span>
                  </li>
                </ul>

                <p className="text-xs text-gray-500 mt-4">
                  ⚠️ Solo disponible en modo prueba. No se realizará ningún cargo real.
                </p>
              </div>


            </div>
            {/* Texto de pago seguro - Ahora al final del contenedor flex-col principal */}
            <p className="text-sm text-gray-500 text-center">
              <CheckCircle className="inline-block size-4 mr-1 text-green-500" /> Pago 100% seguro con cifrado SSL
            </p>
          </div>

          {/* ⚪ Panel de pago (Tarjeta 2 - se desliza desde la derecha) */}
          {/* Ajustes de padding y scroll para el checkout */}
          <div
            ref={paymentRef}
            className="flex-shrink-0 w-[450px] p-8 bg-gray-900 flex flex-col justify-between overflow-y-auto scrollbar-hide border-l border-gray-700"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <CreditCard className="size-5 text-gray-400" />
                Confirmar compra
              </h3>
              <button onClick={() => setExpanded(false)} className="text-gray-400 hover:text-gray-200">
                <X className="size-4" />
              </button>
            </div>

            <div className="flex-1 text-gray-300 overflow-scroll">
              {/* Renderiza el checkout de Stripe solo si el plan está disponible y stripePromise es válido */}
              {plan && stripePromise && options && (
                <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                  <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
              )}
              {/* Mensaje si Stripe no está configurado */}
              {!stripePromise && (
                <div className="text-center text-red-400">
                  Stripe no está configurado. Por favor, añade NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
