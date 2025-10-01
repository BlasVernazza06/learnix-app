'use client'

import { Check } from "lucide-react"
import Link from "next/link"
import { AllPricing } from "../../actions/pricing"

export default function Pricing() {
  const { plans, loading, error } = AllPricing()

  if (loading) {
    return (
      <div id="pricing" className="flex flex-col items-center px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col items-center text-center mb-12">
          <div className="h-10 w-48 sm:w-72 bg-gray-700 rounded mb-2 animate-pulse"></div>
          <div className="h-4 w-36 sm:w-60 bg-gray-600 rounded animate-pulse"></div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col justify-between p-4 sm:p-6 rounded-xl shadow-md bg-gray-800 animate-pulse h-[400px]"
            >
              <div className="h-6 bg-gray-700 rounded w-24 sm:w-32 mb-4"></div>
              <div className="h-12 bg-gray-700 rounded w-36 sm:w-48 mb-4"></div>
              <ul className="space-y-2 sm:space-y-3 flex-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <li key={i} className="h-4 bg-gray-600 rounded w-full"></li>
                ))}
              </ul>
              <div className="h-10 bg-blue-500 rounded w-full mt-4 sm:mt-6"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div id="pricing" className="flex flex-col items-center">
      <header className="flex flex-col items-center text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">Planes y Precios</h2>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">Selecciona el plan que se adapte a tus necesidades</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative flex flex-col p-4 sm:p-6 rounded-2xl shadow-xl transition-transform duration-300 transform
              ${index === 1 ? "border-2 border-blue-500 scale-105 shadow-2xl" : "border border-gray-700 hover:border-blue-500 hover:scale-[1.03]"}
              bg-gradient-to-br from-gray-800 to-gray-900 text-white`}
          >
            {index === 1 && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-sm sm:text-base font-bold px-3 sm:px-4 py-1 rounded-full shadow-lg animate-bounce">
                Más popular
              </span>
            )}

            <div>
              <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
                <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-blue-900/60 text-blue-400">
                  50% de descuento
                </span>
                <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs  font-medium bg-gray-700 text-gray-200">
                  {plan.name}
                </span>
              </div>

              <p className="text-4xl sm:text-5xl font-extrabold text-white flex items-end gap-2 pt-4">
                ${Number(plan.price).toFixed(2)}
                <span className="text-sm sm:text-xl text-gray-400">/mes</span>
              </p>
            </div>

            <div className="w-full h-[1px] bg-gray-700 my-4 sm:my-5"></div>

            <ul className="space-y-2 sm:space-y-3 text-gray-300 flex-1">
              {Object.values(plan.description).map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center gap-2 text-sm sm:text-base">
                  <Check className="text-green-500 w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 sm:mt-6">
              <Link
                href={`/paypage?plan_id=${plan.id}`}
                className="w-full inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white font-semibold py-2 sm:py-3 rounded-xl transition-transform duration-300 hover:scale-105 shadow-lg text-sm sm:text-base"
              >
                Elegir Plan
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
