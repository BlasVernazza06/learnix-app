"use client"

import { useState, useEffect } from "react"
import { Check, Star, CreditCard, X, CheckCircle } from "lucide-react"
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import Link from "next/link"
import { fetchClientSecret } from "../actions/stripe"
import ButtonBack from "../dashboard/components/buttonBack"

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null

export default function SubscriptionClientPage({ plan }) {
  const [showCheckout, setShowCheckout] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Fix hydration issue
  useEffect(() => {
    setIsClient(true)
  }, [])

  const options =
    plan && stripePromise
      ? {
          fetchClientSecret: async () => {
            try {
              const clientSecret = await fetchClientSecret(plan.stripe_price_id)
              return clientSecret
            } catch (error) {
              console.error("Error en fetchClientSecret:", error)
              throw error
            }
          },
        }
      : undefined

  if (!plan) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Plan no disponible.
      </div>
    )
  }

  // Don't render until client-side to prevent hydration issues
  if (!isClient) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white p-4">
        <div className="animate-spin size-8 border-2 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white p-4">
      {/* Botón volver */}
      <div className="md:absolute md:top-6 md:left-6 md:z-20">
        <ButtonBack />
      </div>

      {/* Logo */}
      <Link
        href={"/"}
        className="absolute top-6 left-6 flex items-center gap-2 text-white z-10 md:static md:mb-6"
      >
        <img src="/icon-Brand.svg" className="size-8" alt="Learnix logo" />
        <span className="text-xl font-semibold">Learnix</span>
      </Link>

      {/* Contenedor principal */}
      <div className="w-full max-w-[810px] bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
        {/* Plan */}
        <div className="p-6 flex flex-col justify-between w-full">
          <div className="flex flex-col items-center justify-center mt-6">
            <div className="flex flex-col mb-5 w-full bg-gray-800 rounded-xl shadow-lg p-6 text-white relative border border-gray-700">
              {plan.badge && (
                <div
                  className={`absolute -top-3 -left-3 bg-gradient-to-r ${plan.badge.color} text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md flex items-center gap-1`}
                >
                  <Star className="size-3.5" /> {plan.badge.text}
                </div>
              )}

              <div className="mb-6">
                <div className="inline-flex items-center gap-2 bg-blue-900/30 text-blue-300 text-sm font-medium px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  Plan Anual
                </div>
              </div>

              <h2 className="text-xl font-semibold text-white mb-1">
                {plan.name}
              </h2>
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
                    ${plan.price.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-sm text-gray-400">por mes</span>
                </div>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-2 font-medium transition-all duration-200 hover:scale-[1.02] shadow-md"
                  onClick={() => setShowCheckout(true)}
                >
                  Suscribirme
                </button>
              </div>
            </div>

            <div className="flex flex-col w-full bg-gray-800 rounded-xl shadow-lg p-6 text-white relative border border-gray-700">
              <h3 className="text-lg font-semibold mb-3">Datos de prueba</h3>
              <p className="text-sm text-gray-400 mb-4">
                Usa estos datos para simular una suscripción en modo{" "}
                <span className="text-yellow-400 font-medium">TEST</span>.
              </p>

              <ul className="space-y-2 text-xs">
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

          <p className="text-sm text-gray-500 text-center mt-4">
            <CheckCircle className="inline-block size-4 mr-1 text-green-500" />{" "}
            Pago 100% seguro con cifrado SSL
          </p>
        </div>
      </div>

      {/* Modal de Checkout Responsive */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-2xl border border-gray-700 shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Header del modal */}
            <div className="flex justify-between items-center p-6 border-b border-gray-700 bg-gray-800">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <CreditCard className="size-5 text-gray-400" />
                Confirmar compra - {plan.name}
              </h3>
              <button
                onClick={() => setShowCheckout(false)}
                className="text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-lg p-2 transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Contenido del checkout */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              {stripePromise && options ? (
                <div className="w-full">
                  <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                    <EmbeddedCheckout 
                      className="w-full"
                    />
                  </EmbeddedCheckoutProvider>
                </div>
              ) : !stripePromise ? (
                <div className="text-center text-red-400 py-8">
                  <CreditCard className="size-12 mx-auto mb-4 text-red-400/50" />
                  <p className="text-lg font-medium">Stripe no está configurado</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Por favor, configura las claves de Stripe para continuar.
                  </p>
                </div>
              ) : (
                <div className="text-center text-gray-400 py-8">
                  <div className="animate-spin size-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p>Configurando checkout...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}