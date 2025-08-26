"use client"
import { Mail, CheckCircle, ArrowLeft, Loader2, RefreshCw, Clock } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"

export default function ConfirmEmailPage() {
  const [countdown, setCountdown] = useState(30)
  const [canResend, setCanResend] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [resendMessage, setResendMessage] = useState("")
  const [dots, setDots] = useState("")
  const router = useRouter()
  const supabase = createClient()

  // Animación de puntos para el loader
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev === "...") return ""
        return prev + "."
      })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  // Verificar automáticamente si el email ya fue confirmado
  useEffect(() => {
    let interval

    const checkEmailConfirmation = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        console.log("Checking user confirmation:", user) // Debug

        if (user && user.email_confirmed_at) {
          console.log("Email confirmed, redirecting") // Debug
          // Email confirmado, redirigir al dashboard
          router.push("/")
          return
        }
      } catch (error) {
        console.error("Error checking email confirmation:", error)
      }
    }

    // Verificar inmediatamente
    checkEmailConfirmation()

    // Verificar cada 3 segundos
    interval = setInterval(checkEmailConfirmation, 3000)

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [supabase, router])

  // Countdown para habilitar reenvío
  useEffect(() => {
    let timer
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    } else {
      setCanResend(true)
    }
    return () => clearTimeout(timer)
  }, [countdown])

  // Escuchar cambios de autenticación en tiempo real
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state change:", event, session) // Debug
      if (event === "SIGNED_IN" && session?.user?.email_confirmed_at) {
        router.push("/")
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase, router])

  const handleResendEmail = async () => {
    setIsResending(true)
    setResendMessage("")

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user?.email) {
        setResendMessage("No se pudo obtener el email del usuario")
        setIsResending(false)
        return
      }

      console.log("Resending email to:", user.email) // Debug

      const { error } = await supabase.auth.resend({
        type: "signup",
        email: user.email,
      })

      if (error) {
        console.error("Resend error:", error)
        if (error.message.includes("rate limit")) {
          setResendMessage("Demasiados intentos. Espera un momento antes de intentar nuevamente.")
        } else if (error.message.includes("already confirmed")) {
          setResendMessage("Este email ya ha sido confirmado. Puedes iniciar sesión.")
        } else {
          setResendMessage(`Error al reenviar: ${error.message}`)
        }
      } else {
        setResendMessage("Email reenviado exitosamente. Revisa tu bandeja de entrada.")
        setCountdown(30)
        setCanResend(false)
      }
    } catch (error) {
      console.error("Error resending email:", error)
      setResendMessage("Error inesperado. Intenta nuevamente.")
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-200/10 to-purple-200/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl p-8 w-full max-w-md relative z-10">
        {/* Header con loader principal */}
        <header className="flex flex-col items-center gap-6 mb-8">
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-2xl shadow-lg">
              <Mail className="size-16 text-white" />
            </div>
            {/* Loader circular animado */}
            <div className="absolute -inset-2 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Verificando tu email{dots}</h1>
            <p className="text-gray-500 text-lg">Hemos enviado un enlace de confirmación</p>
          </div>
        </header>

        {/* Estado de carga principal */}
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-shrink-0">
                <Loader2 className="size-6 text-blue-600 animate-spin" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-800 text-lg">Esperando confirmación</h3>
                <p className="text-blue-600">Verificando automáticamente cada 3 segundos</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-blue-700">
                <CheckCircle className="size-4 text-green-500" />
                <span>Email enviado exitosamente</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-blue-700">
                <Clock className="size-4 text-blue-500" />
                <span>Esperando que hagas clic en el enlace</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <div className="size-4 border-2 border-gray-300 rounded-full"></div>
                <span>Te redirigiremos automáticamente</span>
              </div>
            </div>
          </div>

          {/* Instrucciones */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="size-5 bg-amber-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                <span className="text-white text-xs font-bold">!</span>
              </div>
              <div>
                <h3 className="font-semibold text-amber-800 mb-2">Instrucciones:</h3>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• Revisa tu bandeja de entrada</li>
                  <li>• Busca el email de confirmación</li>
                  <li>• Haz clic en el enlace</li>
                  <li>• ¡Serás redirigido automáticamente!</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Mensaje de reenvío */}
          {resendMessage && (
            <div
              className={`p-4 rounded-xl border ${
                resendMessage.includes("exitosamente") || resendMessage.includes("confirmado")
                  ? "bg-green-50 border-green-200 text-green-700"
                  : "bg-red-50 border-red-200 text-red-700"
              }`}
            >
              <p className="text-sm font-medium">{resendMessage}</p>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleResendEmail}
              disabled={!canResend || isResending}
              className={`w-full h-12 font-semibold rounded-xl transform transition-all duration-200 shadow-lg flex items-center justify-center gap-2 ${
                !canResend || isResending
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-[1.02] hover:shadow-xl"
              } text-white`}
            >
              {isResending ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Reenviando...
                </>
              ) : !canResend ? (
                <>
                  <RefreshCw className="size-5" />
                  Reenviar en {countdown}s
                </>
              ) : (
                <>
                  <RefreshCw className="size-5" />
                  Reenviar email
                </>
              )}
            </button>

            <Link
              href="/login"
              className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors py-2"
            >
              <ArrowLeft className="size-4" />
              Volver al login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
