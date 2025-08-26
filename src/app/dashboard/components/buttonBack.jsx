'use client'
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation";

export default function ButtonBack() {
    const router = useRouter()

    return (
        <button
            onClick={() => router.back()}
            className="flex items-center justify-center gap-2 mb-6 p-2 rounded-xl text-gray-300 hover:text-blue-400 hover:scale-105 transition-all duration-300"
        >
            <ArrowLeft className="w-5 h-5" />
            Volver
        </button>
    );
}
