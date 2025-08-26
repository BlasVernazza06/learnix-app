'use client'

import { useState } from "react";
import { BookOpen, Star, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { AllCourses } from "@/app/actions/courses";

export default function MyCourses() {
  const { courses, loading, error} = AllCourses()

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
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
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
              <h3 className="text-lg md:text-xl font-bold text-white">{course.title}</h3>
              <p className="text-gray-400 text-sm line-clamp-2">{course.description}</p>
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
  )
}
