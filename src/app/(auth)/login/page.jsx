'use client'
import { X, Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { login } from "./action";

export default function Page() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 relative overflow-hidden">
            
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl p-8 w-full max-w-md relative z-10">
                <div className="flex justify-end mb-6">
                    <div className="bg-gray-100 hover:bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110">
                        <X className="size-4 text-gray-600"/>
                    </div>
                </div>

                <header className="flex flex-col items-center gap-4 mb-8">
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-2xl shadow-lg">
                        <img src={"/icon-Brand.svg"} className="size-12" alt="" />
                    </div>
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Bienvenido de vuelta</h1>
                        <p className="text-gray-500">Inicia sesión en tu cuenta</p>
                    </div>
                </header>

                <form className="flex flex-col gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400" />
                            <input 
                                type="email"
                                name="email"
                                className="w-full h-12 pl-12 pr-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                                placeholder="tu@email.com"
                                required
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Contraseña</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400" />
                            <input 
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className="w-full h-12 pl-12 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-end text-sm">
                        <a href="#" className="hover:underline text-blue-600 hover:text-blue-700 font-medium transition-colors">
                            ¿Olvidaste tu contraseña?
                        </a>
                    </div>

                    <button
                        type="submit"
                        formAction={login}
                        className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                        Iniciar Sesión
                    </button>

                    <div className="text-center">
                        <p className="text-gray-500 text-sm">
                            ¿No tienes una cuenta?{" "}
                            <Link href="/register" className="hover:underline text-blue-600 hover:text-blue-700 font-medium transition-colors">
                                Regístrate aquí
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}