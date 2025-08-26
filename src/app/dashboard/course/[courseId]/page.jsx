'use client'

import { OneCourse, Chapters } from "@/app/actions/courses"
import ChaptersLessons from "../sections/chaptersLessons"
import ButtonBack from "../../components/buttonBack"
import { useParams } from "next/navigation"
import { Play, ChartSpline, GraduationCap, Speaker } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ChaptersHome from "../sections/chaptersHome"

export default function Page() {
  const params = useParams()
  const { courseId } = params

  const { course, loading, error } = OneCourse({ courseSlug: decodeURIComponent(courseId) })

  const { chapters, loading: loadingChapters } = Chapters({ courseId: course?.id })

  const slugify = (text) =>
    text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[¿?]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")

  
  if (loading || loadingChapters) {
    return (
      <div className="flex justify-center min-h-screen py-6 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-6xl mx-auto w-full pt-4">
          {/* Botón Back skeleton */}
          <div className="h-10 w-24 bg-gray-700 rounded animate-pulse mb-6"></div>
  
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-stretch">
            {/* Columna izquierda */}
            <div className="md:col-span-2 flex flex-col gap-4">
              {/* Imagen */}
              <div className="w-full aspect-video bg-gray-800 rounded-xl border border-gray-700 animate-pulse mb-6"></div>
  
              {/* Header */}
              <div className="flex flex-col gap-2">
                <div className="h-10 w-3/4 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-6 w-full bg-gray-700 rounded animate-pulse"></div>
                <div className="h-6 w-5/6 bg-gray-700 rounded animate-pulse"></div>
              </div>
  
              {/* Info curso móvil */}
              <div className="flex flex-col xl:hidden gap-5">
                <div className="border border-gray-700 bg-gray-900 rounded-xl p-6 flex flex-col shadow-sm gap-4">
                  <div className="h-6 w-1/2 bg-gray-700 rounded animate-pulse"></div>
                  <div className="flex flex-col gap-2">
                    <div className="h-5 w-full bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-5 w-full bg-gray-700 rounded animate-pulse"></div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                    <div className="h-8 w-full bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-8 w-full bg-gray-700 rounded animate-pulse"></div>
                  </div>
                  <div className="h-10 w-full bg-gray-700 rounded animate-pulse mt-4"></div>
                </div>
  
                {/* Temario móvil */}
                <div className="pt-5 flex flex-wrap gap-2">
                  {Array(3).fill(0).map((_, i) => (
                    <div key={i} className="h-6 w-20 bg-gray-700 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
  
              {/* Contenido del curso */}
              <div className="flex flex-col gap-4 pt-6">
                <div className="h-8 w-1/4 bg-gray-700 rounded animate-pulse"></div>
                {Array(3).fill(0).map((_, i) => (
                  <div key={i} className="h-10 w-full bg-gray-800 rounded border border-gray-700 animate-pulse"></div>
                ))}
              </div>
            </div>
  
            {/* Columna derecha XL */}
            <div className="hidden xl:flex flex-col gap-5">
              <div className="border border-gray-700 bg-gray-900 rounded-xl py-4 px-6 flex flex-col shadow-sm gap-4">
                <div className="h-6 w-1/2 bg-gray-700 rounded animate-pulse"></div>
                <div className="flex flex-col gap-2">
                  <div className="h-5 w-full bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-5 w-full bg-gray-700 rounded animate-pulse"></div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                  <div className="h-8 w-full bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-8 w-full bg-gray-700 rounded animate-pulse"></div>
                </div>
                <div className="h-10 w-full bg-gray-700 rounded animate-pulse mt-4"></div>
              </div>
  
              {/* Temario XL */}
              <div className="flex flex-wrap gap-2">
                {Array(3).fill(0).map((_, i) => (
                  <div key={i} className="h-6 w-20 bg-gray-700 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }


  if (error) return <p className="text-white">Error: {error.message}</p>
  if (!course || course.length === 0)
    return <p className="text-white">Curso no encontrado.</p>
  
  
  if (!course || course.length === 0)
    return <p className="text-white">Curso no encontrado.</p>


  const StartCourse = () => {
    
  }



  return (
    <div className="flex justify-center min-h-screen py-6 px-4 sm:px-6 lg:px-8 text-white ">
      <div className="max-w-6xl mx-auto w-full pt-4">
        <ButtonBack />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-stretch">

          {/* Columna Izquierda: Imagen y Descripción */}
          <div className="md:col-span-2 flex flex-col">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-gray-700 mb-6 shadow-md">
              <Image
                src={course.image || "/placeholder.svg"}
                alt={course.title}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 600px"
              />
            </div>

            <header className="pb-4">
              <h1 className="text-4xl font-bold text-white leading-tight">{course.title}</h1>
              <p className="text-gray-300 mt-3 leading-relaxed">{course.description}</p>
            </header>

            {/* Información del curso móvil */}
            <div className="flex flex-col xl:hidden gap-5">
              <div className="border border-gray-700 bg-gray-900 rounded-xl p-6 flex flex-col shadow-sm">
                <header className="pb-4">
                  <h2 className="text-xl font-bold text-white">Este curso incluye:</h2>
                </header>
                <main className="flex flex-col gap-2 pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Play className="size-5" />
                      <span className="text-gray-400">Lecciones:</span>
                    </div>
                    <span className="text-gray-300">{course.lessons}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Speaker className="size-5" />
                      <span className="text-gray-400">Lenguaje:</span>
                    </div>
                    <span className="text-gray-300">Español</span>
                  </div>
                </main>
                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                  <div className="flex items-center justify-center gap-2 bg-gray-700 w-full py-2 px-4 border border-gray-600 rounded-xl text-gray-300">
                    <ChartSpline />
                    <span>{course.level || "Básico"}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 bg-gray-700 w-full py-2 px-4 border border-gray-600 rounded-xl text-gray-300">
                    <GraduationCap />
                    <span>Certificado</span>
                  </div>
                </div>
                {chapters.length > 0 && chapters[0].lessons.length > 0 && (
                  <Link 
                    
                    href={`/dashboard/course/${courseId}/${slugify(chapters[0].chapter)}/${slugify(chapters[0].lessons[0])}`}
                    className="flex items-center justify-center gap-2 w-full p-2 rounded-xl bg-blue-500 mt-4 text-center text-white font-semibold"
                  >
                    <Play className="size-5" />
                    Empezar Curso
                  </Link>
                )}
              </div>

              <div className="pt-5">
                <header className="pb-2">
                  <h2 className="text-2xl font-bold text-white">Temario</h2>
                </header>
                <main>
                  <div className="flex flex-wrap gap-2">
                    {course.topics.map((topic, index) => (
                      <div key={index} className="w-max h-max border border-gray-700 bg-gray-800 px-3 py-2 rounded-sm">
                        <span className="text-lg">{topic}</span>
                      </div>
                    ))}
                  </div>
                </main>
              </div>
            </div>

            {/* Contenido del curso */}
            <div className="flex flex-col gap-4 pt-6">
              <header>
                <h2 className="text-2xl font-bold text-white">Contenido del Curso</h2>
              </header>
              {chapters && chapters.map((chapter, index) => (
                <ChaptersHome 
                  key={chapter.id || index} 
                  lesson={chapter} 
                  index={index} 
                />
              ))}
            </div>
          </div>

          {/* Columna Derecha: Información y botones (XL) */}
          <div className="hidden xl:flex flex-col gap-5">
            <div className="border border-gray-700 bg-gray-900 rounded-xl py-4 px-6 flex flex-col w-max shadow-sm">
              <header className="pb-4">
                <h2 className="text-xl font-bold text-white">Este curso incluye:</h2>
              </header>
              <main className="flex flex-col gap-2 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Play className="size-5" />
                    <span className="text-gray-400">Lecciones:</span>
                  </div>
                  <span className="text-gray-300">{course.lessons}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Speaker className="size-5" />
                    <span className="text-gray-400">Lenguaje:</span>
                  </div>
                  <span className="text-gray-300">Español</span>
                </div>
              </main>
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <div className="flex items-center justify-center gap-2 bg-gray-700 w-full py-2 px-4 border border-gray-500 rounded-xl text-gray-300">
                  <ChartSpline />
                  <span>{course.level || "Básico"}</span>
                </div>
                <div className="flex items-center justify-center gap-2 bg-gray-700 w-full py-2 px-4 border border-gray-500 rounded-xl text-gray-300">
                  <GraduationCap />
                  <span>Certificado</span>
                </div>
              </div>
              {chapters.length > 0 && chapters[0].lessons.length > 0 && (
                <Link 
                  href={`/dashboard/course/${courseId}/${slugify(chapters[0].chapter)}/${slugify(chapters[0].lessons[0])}`}
                  className="flex items-center justify-center gap-2 w-full p-2 rounded-xl bg-blue-500 mt-4 text-center text-white font-semibold"
                >
                  <Play className="size-5" />
                  Empezar Curso
                </Link>
              )}
            </div>

            <div>
              <header className="pb-2">
                <h2 className="text-2xl font-bold text-white">Temario</h2>
              </header>
              <main>
                <div className="flex flex-wrap gap-2">
                  {course.topics.map((topic, index) => (
                    <div key={index} className="w-max h-max border border-gray-700 bg-gray-900 px-3 py-2 rounded-sm">
                      <span className="text-lg">{topic}</span>
                    </div>
                  ))}
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
