'use client'

import { AllCourses } from "@/app/actions/courses";
import { Play } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const {courses, loading, error} = AllCourses()

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
        </header>

        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
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
                  <span className="bg-gray-700/70 px-3 py-1 rounded-xl text-xs font-semibold">{course.level}</span>
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
                <h3 className="text-white font-bold text-base line-clamp-2">{course.title}</h3>
              </div>
            </Link>
          ))}
        </main>
      </div>
    </div>
  );
}
