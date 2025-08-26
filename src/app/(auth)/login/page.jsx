'use client'

import { X, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { login } from "./action"

export default function Page() {
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isPending, setIsPending] = useState(false)
  const searchParams = useSearchParams()
  const [success, setSuccess] = useState(null)
  const [serverError, setServerError] = useState(null)

  // Capturar errores de URL (redirects de Supabase)
  useEffect(() => {
    const urlError = searchParams.get("error")
    if (urlError) {
      const errorMessages = {
        "Invalid login credentials": "Email o contraseña incorrectos",
        "Email not confirmed": "Por favor, confirma tu email antes de iniciar sesión",
        "Too many requests": "Demasiados intentos. Espera un momento...",
        "User not found": "No existe una cuenta con este email",
        "Invalid email": "El formato del email no es válido",
      }
      setServerError(errorMessages[urlError] || decodeURIComponent(urlError))
    }
  }, [searchParams])

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) return "El email es requerido"
    if (!emailRegex.test(email)) return "Formato de email inválido"
    return ""
  }

  const validatePassword = (password) => {
    if (!password) return "La contraseña es requerida"
    if (password.length < 6) return "La contraseña debe tener al menos 6 caracteres"
    return ""
  }

  const handleBlur = (field, value) => {
    let error = ""
    if (field === "email") error = validateEmail(value)
    if (field === "password") error = validatePassword(value)
    setErrors(prev => ({ ...prev, [field]: error }))
  }

  const hasErrors = Object.values(errors).some(e => e)

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 relative overflow-hidden">
      <div className="bg-gray-900/95 backdrop-blur-sm rounded-2xl border border-gray-700 shadow-2xl p-8 w-full max-w-md relative z-10">
        
        <div className="flex justify-end mb-6">
          <Link href="/" className="bg-gray-800 hover:bg-gray-700 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110">
            <X className="size-4 text-gray-400"/>
          </Link>
        </div>

        <header className="flex flex-col items-center gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-4 rounded-2xl shadow-lg">
            <img src={"/icon-Brand.svg"} className="size-12" alt="Logo"/>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Bienvenido de vuelta</h1>
            <p className="text-gray-400">Inicia sesión en tu cuenta</p>
          </div>
        </header>

        {/* Error general del servidor */}
        {(serverError) && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-xl flex items-start gap-3">
            <AlertCircle className="size-5 text-red-400 mt-0.5 flex-shrink-0"/>
            <div>
              <h3 className="font-semibold text-red-300 mb-1">Error de inicio de sesión</h3>
              <p className="text-sm text-red-200">{serverError}</p>
            </div>
          </div>
        )}

        {/* Mensaje de éxito */}
        {success && (
          <div className="mb-6 p-4 bg-green-900/50 border border-green-700 rounded-xl flex items-start gap-3">
            <CheckCircle className="size-5 text-green-400 mt-0.5 flex-shrink-0"/>
            <div>
              <h3 className="font-semibold text-green-300 mb-1">¡Inicio de sesión exitoso!</h3>
              <p className="text-sm text-green-200">{success}</p>
            </div>
          </div>
        )}

        <form className="flex flex-col gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400"/>
              <input 
                type="email"
                name="email"
                className={`w-full h-12 pl-12 pr-4 border rounded-xl focus:ring-2 transition-all duration-200 bg-gray-800 focus:bg-gray-700 text-white placeholder-gray-500 ${
                  errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-700 focus:ring-blue-500"
                }`}
                placeholder="tu@email.com"
                onBlur={e => handleBlur("email", e.target.value)}
                required
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-400 flex items-center gap-1">
                <AlertCircle className="size-4"/>
                {errors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400"/>
              <input 
                type={showPassword ? "text" : "password"}
                name="password"
                className={`w-full h-12 pl-12 pr-12 border rounded-xl focus:ring-2 transition-all duration-200 bg-gray-800 focus:bg-gray-700 text-white placeholder-gray-500 ${
                  errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-700 focus:ring-blue-500"
                }`}
                placeholder="••••••••"
                onBlur={e => handleBlur("password", e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
              >
                {showPassword ? <EyeOff className="size-5"/> : <Eye className="size-5"/>}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-400 flex items-center gap-1">
                <AlertCircle className="size-4"/>
                {errors.password}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end text-sm">
            <a href="#" className="hover:underline text-blue-500 hover:text-blue-400 font-medium transition-colors">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button
            type="submit"
            formAction={login}
            disabled={hasErrors}
            className={`w-full h-12 font-semibold rounded-xl transform transition-all duration-200 shadow-lg flex items-center justify-center gap-2 ${
              hasErrors
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 hover:scale-[1.02] hover:shadow-xl text-white"
            }`}
          >
            {isPending ? (
              <>
                <Loader2 className="size-5 animate-spin"/>
                Iniciando sesión...
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </button>

          <div className="text-center">
            <p className="text-gray-400 text-sm">
              ¿No tienes una cuenta?{" "}
              <Link href="/register" className="hover:underline text-blue-500 hover:text-blue-400 font-medium transition-colors">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
