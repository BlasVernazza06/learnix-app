'use client'

import { useState, useMemo } from "react";
import { BookOpen, Star, ArrowRight, Search as SearchIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { AllCourses } from "@/app/actions/courses";
import { useSearch } from "../context/searchContext";

export default function MyCourses() {
  const { courses, loading, error} = AllCourses()
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
      
      const normalizedDescription = course.description.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')

      return normalizedTitle.includes(normalizedQuery) ||
             normalizedDescription.includes(normalizedQuery)
    })
  }, [courses, searchQuery])

  if(loading){
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col overflow-hidden rounded-2xl shadow-xl border border-gray-700 bg-gray-900 animate-pulse"
          >
            {/* Imagen */}
            <div className="relative w-full h-48 bg-gray-800 rounded-t-2xl" />
    
            <div className="flex flex-col p-5 space-y-3">
              {/* Título */}
              <div className="space-y-2">
                <div className="h-5 bg-gray-700 rounded w-3/4" />
                <div className="h-4 bg-gray-700 rounded w-full" />
              </div>
    
              {/* Stats */}
              <div className="flex justify-between text-sm mt-2">
                <div className="h-4 bg-gray-700 rounded w-20" />
                <div className="h-4 bg-gray-700 rounded w-16" />
              </div>
    
              {/* Botón */}
              <div className="mt-3 h-10 bg-gray-700 rounded-xl w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Si hay búsqueda pero no hay resultados
  if (searchQuery.trim() && filteredCourses.length === 0) {
    return (
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
    )
  }
  
  return (
    <>
      {/* Mostrar resultados de búsqueda si hay query */}
      {searchQuery.trim() && (
        <div className="mb-6">
          <p className="text-gray-400 text-sm">
            Mostrando {filteredCourses.length} resultado{filteredCourses.length !== 1 ? 's' : ''} para "{searchQuery}"
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="flex flex-col overflow-hidden rounded-2xl shadow-xl border border-gray-700 bg-gray-900 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="relative w-full h-48">
              <Image
                src={course.image || "/placeholder.svg"}
                alt={course.title}
                fill
                className="object-cover rounded-t-2xl"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-2xl"></div>
            </div>

            <div className="flex flex-col p-5 space-y-3">
              <div className="flex flex-col gap-1">
                <h3 className="text-lg md:text-xl font-bold text-white">
                  {/* Resaltar texto de búsqueda */}
                  {searchQuery.trim() ? (
                    <span dangerouslySetInnerHTML={{
                      __html: course.title.replace(
                        new RegExp(`(${searchQuery})`, 'gi'),
                        '<mark class="bg-blue-500/30 text-blue-300 px-1 rounded">$1</mark>'
                      )
                    }} />
                  ) : (
                    course.title
                  )}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2">
                  {searchQuery.trim() ? (
                    <span dangerouslySetInnerHTML={{
                      __html: course.description.replace(
                        new RegExp(`(${searchQuery})`, 'gi'),
                        '<mark class="bg-blue-500/30 text-blue-300 px-1 rounded">$1</mark>'
                      )
                    }} />
                  ) : (
                    course.description
                  )}
                </p>
              </div>

              <div className="flex justify-between text-gray-300 text-sm">
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  <span>{course.lessons} lecciones</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>{course.rating} ({course.reviews})</span>
                </div>
              </div>

              <Link
                href={`/dashboard/course/${course.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="mt-3 inline-flex items-center justify-center w-full bg-blue-600 text-white font-medium py-2 rounded-xl hover:bg-blue-700 hover:scale-105 transition-transform duration-300"
              >
                Ver curso <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}