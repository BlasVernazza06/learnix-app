'use client'
import { Mail, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ConfirmEmailPage() {
    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 relative overflow-hidden">
            
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl p-8 w-full max-w-md relative z-10">
                
                <header className="flex flex-col items-center gap-4 mb-8">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-2xl shadow-lg">
                        <Mail className="size-12 text-white" />
                    </div>
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">¡Revisa tu email!</h1>
                        <p className="text-gray-500">Hemos enviado un enlace de confirmación</p>
                    </div>
                </header>

                <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                            <CheckCircle className="size-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold text-blue-800 mb-1">Próximos pasos:</h3>
                                <ul className="text-sm text-blue-700 space-y-1">
                                    <li>• Revisa tu bandeja de entrada</li>
                                    <li>• Busca el email de "Learnix"</li>
                                    <li>• Haz clic en el enlace de confirmación</li>
                                    <li>• ¡Listo! Ya puedes iniciar sesión</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                            <div className="size-5 bg-amber-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                                <span className="text-white text-xs font-bold">!</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-amber-800 mb-1">¿No recibiste el email?</h3>
                                <p className="text-sm text-amber-700">
                                    Revisa tu carpeta de spam o solicita un nuevo enlace de confirmación.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <button className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl">
                            Reenviar email
                        </button>
                        
                        <Link 
                            href="/login"
                            className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                        >
                            <ArrowLeft className="size-4" />
                            Volver al login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
} 