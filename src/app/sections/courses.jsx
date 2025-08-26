'use client'

import Image from "next/image"
import Link from "next/link"
import { AllCourses } from "../actions/courses";



export default function Courses() {
  const {courses, loading, error} = AllCourses()

  const slugify = (text) => {
    return text
      .normalize('NFD')                  // separa acentos
      .replace(/[\u0300-\u036f]/g, '')    // quita acentos
      .toLowerCase()
      .replace(/[¿?]/g, '')               // quita signos de pregunta
      .replace(/[^a-z0-9\s-]/g, '')       // quita símbolos pero deja espacios y guiones
      .trim()                             // quita espacios al inicio y final
      .replace(/\s+/g, '-')               // espacios por guion
      .replace(/-+/g, '-');               // evita guiones repetidos
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col overflow-hidden rounded-2xl shadow-xl border border-gray-700 bg-gray-900 animate-pulse"
          >
            {/* Imagen */}
            <div className="relative w-full h-48 bg-gray-700 rounded-t-2xl"></div>
  
            {/* Contenido */}
            <div className="flex flex-col items-center text-center p-5 space-y-2">
              <div className="h-6 w-32 bg-gray-600 rounded-full"></div>
              <div className="h-4 w-24 bg-gray-600 rounded-full"></div>
  
              {/* Botón */}
              <div className="mt-4 w-full py-2 px-4 bg-gray-700 rounded-xl"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {courses.map((curso, idx) => (
        <div
          key={idx}
          className="flex flex-col overflow-hidden rounded-2xl shadow-xl border border-gray-700 bg-gray-900 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        >
          <div className="relative w-full h-48">
            <Image
              src={curso.image || "/placeholder.svg"}
              alt={curso.title}
              fill
              className="object-cover rounded-t-2xl"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-t-2xl"></div>
          </div>
  
          <div className="flex flex-col items-center text-center p-5 space-y-2">
            <h3 className="text-lg md:text-xl font-bold text-white">{curso.title}</h3>
            <p className="text-gray-400 text-sm">{curso.lessons} lecciones</p>
  
            <Link
              href={`/dashboard/course/${curso.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="mt-4 w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-700 hover:scale-105 transition-transform duration-300"
            >
              Empezar Curso
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
  
}
