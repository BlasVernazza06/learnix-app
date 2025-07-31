"use client"

import { useState, useRef, useEffect } from "react"
import { Check, Star, CreditCard, X, CheckCircle } from "lucide-react"
import gsap from "gsap"

export default function SubscriptionPage() {
  const [expanded, setExpanded] = useState(false)
  const containerRef = useRef(null) // El contenedor principal, la "card grande de fondo"
  const paymentRef = useRef(null) // El panel de pago que se desliza

  useEffect(() => {
    // Establecer el estado inicial de la tarjeta de pago (oculta)
    gsap.set(paymentRef.current, { width: 0, opacity: 0, overflow: "hidden" })
  }, [])

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 0.4 } })

    if (expanded) {
      // Expandir el contenedor principal para hacer espacio para la tarjeta de pago
      tl.to(containerRef.current, { width: "720px" }) // 360px (plan) + 360px (pago)
      // Revelar la tarjeta de pago
      tl.to(paymentRef.current, { width: "360px", opacity: 1, overflow: "visible" }, "<0.1") // Inicia un poco después
    } else {
      // Ocultar la tarjeta de pago
      tl.to(paymentRef.current, { width: 0, opacity: 0, overflow: "hidden" })
      // Encoger el contenedor principal
      tl.to(containerRef.current, { width: "360px" }, "<0.1") // Inicia un poco después
    }
  }, [expanded])

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200">
      <div
        ref={containerRef}
        className="bg-[#1A202C] rounded-2xl shadow-2xl overflow-hidden flex relative"
        style={{ width: "360px", height: "650px" }} // Ancho inicial de la tarjeta de información, altura fija y más grande
      >
        {/* Logo y nombre de la marca - siempre visible en la card grande */}
        <div className="absolute top-6 left-6 flex items-center gap-2 text-white z-10">
          <img src="/icon-Brand.svg" className="size-8" alt="midudev logo" />
          <span className="text-xl font-semibold">Learnix</span>
        </div>

        {/* Contenedor para las dos secciones principales (plan y pago) */}
        <div className="flex w-full">
          {/* 🟦 Información del plan (Tarjeta 1 - contenido fijo dentro de la card grande) */}
          <div className="flex-shrink-0 w-[360px] p-6 pt-20 flex flex-col justify-between">
            <div className="flex flex-col w-full bg-[#2D3748] rounded-xl shadow-lg p-6 text-white relative">
              {/* Badge PRO - posicionado para superponerse ligeramente */}
              <div className="absolute -top-3 -left-3 bg-gradient-to-r from-indigo-500 to-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                <Star className="size-3.5" /> PRO
              </div>

              {/* Placeholder para el selector de plan (Plan Anual) */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-300 text-sm font-medium px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  Plan Anual
                </div>
              </div>

              <h2 className="text-xl font-semibold text-gray-100 mb-1">Plan Profesional</h2>
              <p className="text-sm text-gray-300 mb-4">Ideal para estudiantes autodidactas.</p>

              <ul className="space-y-2 text-gray-200 text-sm mb-6">
                <li className="flex items-center gap-2">
                  <Check className="text-green-400 size-4" />
                  Acceso completo a todos los cursos.
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-green-400 size-4" />
                  Recursos descargables ilimitados.
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-green-400 size-4" />
                  Soporte prioritario.
                </li>
              </ul>

              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-gray-100">$4.990</span>
                  <span className="text-sm text-gray-300">por mes</span>
                </div>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-2 font-medium transition-transform duration-200 hover:scale-[1.02] shadow-md"
                  onClick={() => setExpanded(true)}
                >
                  Suscribirme
                </button>
              </div>
            </div>
            {/* Texto de pago seguro - AHORA DENTRO DE LA TARJETA NEGRA */}
            <p className="text-sm text-gray-400 text-center mt-auto pb-4">
              {" "}
              {/* mt-auto para empujar al final */}
              <CheckCircle className="inline-block size-4 mr-1" /> Pago 100% seguro con cifrado SSL
            </p>
          </div>

          {/* ⚪ Panel de pago (Tarjeta 2 - se desliza desde la derecha) */}
          <div ref={paymentRef} className="flex-shrink-0 w-[360px] p-6 bg-white flex flex-col justify-between">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <CreditCard className="size-5 text-gray-600" />
                Confirmar compra
              </h3>
              <button onClick={() => setExpanded(false)} className="text-gray-500 hover:text-gray-700">
                <X className="size-4" />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center text-center text-gray-500 px-4">
              <p>Aquí irá el formulario de Stripe o el redireccionamiento.</p>
            </div>

            <button
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md py-2 transition-all duration-200 shadow-md"
              onClick={() => {
                // Lógica para iniciar Stripe Checkout
              }}
            >
              Proceder con Stripe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
