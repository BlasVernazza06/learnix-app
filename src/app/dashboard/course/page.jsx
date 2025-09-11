'use client'

import { useMemo } from "react";
import { AllCourses } from "@/app/actions/courses";
import { Play, Search as SearchIcon } from "lucide-react";
import Link from "next/link";
import { useSearch } from "../context/searchContext";

export default function Page() {
  const {courses, loading, error} = AllCourses()
  const { searchQuery } = useSearch()

  // Filtrar cursos basado en la búsqueda
  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim()) return courses

    const normalizedQuery = searchQuery.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Elimina acentos

    return courses.filter(course => {
      const normalizedTitle = course.title.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
      
      const normalizedDescription = (course.description || '').toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        
      const normalizedLevel = (course.level || '').toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')

      return normalizedTitle.includes(normalizedQuery) ||
             normalizedDescription.includes(normalizedQuery) ||
             normalizedLevel.includes(normalizedQuery)
    })
  }, [courses, searchQuery])

  if (loading) {
    return (
      <div className="flex justify-center h-full py-6 sm:px-2 lg:px-4 text-white">
        <div className="max-w-6xl md:max-w-5xl sm:max-w-4xl w-full">
          <header className="flex flex-col gap-2 mb-6">
            <div className="h-8 bg-gray-700 rounded w-1/2 animate-pulse" />
            <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse" />
          </header>
          
          <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-64 bg-gray-800 rounded-2xl" />
              </div>
            ))}
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center h-full py-6 sm:px-2 lg:px-4 text-white">
      <div className="max-w-6xl md:max-w-5xl sm:max-w-4xl w-full">
        <header className="flex flex-col gap-2 mb-6">
          <h1 className="text-3xl font-bold">
            Todos los cursos de la <span className="text-blue-500">Academia</span>
          </h1>
          <p className="text-gray-400 text-sm">
            Siempre estamos agregando más, estate al tanto para enterarte de lo nuevo
          </p>
          
          {/* Mostrar resultados de búsqueda si hay query */}
          {searchQuery.trim() && (
            <div className="mt-2">
              <p className="text-gray-400 text-sm">
                Mostrando {filteredCourses.length} resultado{filteredCourses.length !== 1 ? 's' : ''} para "{searchQuery}"
              </p>
            </div>
          )}
        </header>

        {/* Si hay búsqueda pero no hay resultados */}
        {searchQuery.trim() && filteredCourses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <SearchIcon className="w-16 h-16 text-gray-500 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No se encontraron cursos
            </h3>
            <p className="text-gray-400 mb-4">
              No hay cursos que coincidan con "{searchQuery}"
            </p>
            <p className="text-sm text-gray-500">
              Intenta con otros términos de búsqueda
            </p>
          </div>
        ) : (
          <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <Link
                key={index}
                href={`/dashboard/course/${course.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="group relative overflow-hidden rounded-2xl shadow-lg border border-gray-700"
              >
                {/* Imagen principal */}
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Overlay que aparece al hover */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                  {/* Top: Nivel y rating */}
                  <div className="flex justify-between items-center">
                    <span className="bg-gray-700/70 px-3 py-1 rounded-xl text-xs font-semibold">
                      {searchQuery.trim() && course.level ? (
                        <span dangerouslySetInnerHTML={{
                          __html: course.level.replace(
                            new RegExp(`(${searchQuery})`, 'gi'),
                            '<mark class="bg-blue-500/50 text-blue-200">$1</mark>'
                          )
                        }} />
                      ) : (
                        course.level
                      )}
                    </span>
                    <span className="bg-gray-700/70 px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1">
                      {course.rating}
                      <img src="/icon-estrella.png" alt="estrella" className="w-3 h-3"/>
                    </span>
                  </div>

                  {/* Center: Play + texto */}
                  <div className="flex flex-col items-center justify-center">
                    <div className="bg-blue-600 rounded-full p-3 flex items-center justify-center mb-2 shadow-lg">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-white font-bold text-sm">Ir al curso</span>
                  </div>

                  {/* Bottom: Título del curso */}
                  <h3 className="text-white font-bold text-base line-clamp-2">
                    {searchQuery.trim() ? (
                      <span dangerouslySetInnerHTML={{
                        __html: course.title.replace(
                          new RegExp(`(${searchQuery})`, 'gi'),
                          '<mark class="bg-blue-500/50 text-blue-200 px-1 rounded">$1</mark>'
                        )
                      }} />
                    ) : (
                      course.title
                    )}
                  </h3>
                </div>
              </Link>
            ))}
          </main>
        )}
      </div>
    </div>
  );
}