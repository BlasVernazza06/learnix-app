'use client'
import { useState } from "react"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function ChaptersLessons({ lesson, index, courseId }) {
  const [openIndex, setOpenIndex] = useState(null)
  const params = useParams()

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

  const isCurrentChapter = params.chapterId === slugify(lesson.chapter)
  const toggleAccordion = (i) => setOpenIndex(openIndex === i ? null : i)
  const isOpen = openIndex === index

  return (
    <div
      className={`flex flex-col items-start w-full rounded-xl border transition-all duration-200 ${
        isCurrentChapter
          ? "border-blue-500/50 bg-blue-500/10 shadow-lg shadow-blue-500/20"
          : "border-gray-700 bg-gray-900 hover:shadow-xl hover:shadow-blue-500/10"
      }`}
    >
      <button
        className="w-full flex items-center justify-between px-3 pt-3 cursor-pointer"
        onClick={() => toggleAccordion(index)}
        aria-expanded={isOpen}
        aria-controls={`faq-content-${index}`}
      >
        <div className="flex flex-col">
          <div className="flex items-center space-x-3 pb-2">
            <p
              className={`text-[10px] font-medium px-3 py-1 rounded-full border ${
                isCurrentChapter
                  ? "text-blue-300 bg-blue-400/20 border-blue-400/40"
                  : "text-blue-400 bg-blue-500/10 border-blue-500/20"
              }`}
            >
              Capítulo: {index + 1}
            </p>
          </div>
          <span className={`text-sm ${isCurrentChapter ? "text-blue-200 font-medium" : "text-white"}`}>
            {lesson.chapter}
          </span>
        </div>
        <ChevronRight
          className={`w-5 h-5 transition-transform duration-200 ${
            isCurrentChapter ? "text-blue-400" : "text-slate-400"
          } ${isOpen ? "rotate-90" : "rotate-0"}`}
        />
      </button>

      <div
        id={`faq-content-${index}`}
        className={`mt-4 bg-gray-800/30 rounded-b-xl w-full overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100 py-2" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1">
          {lesson.lessons.map((item, lessonIndex) => {
            const lessonSlug = slugify(item)
            const isCurrentLesson = params.chapterId === slugify(lesson.chapter) && params.lessonId === lessonSlug

            return (
              <li key={lessonIndex}>
                <Link
                  href={`/dashboard/course/${courseId}/${slugify(lesson.chapter)}/${lessonSlug}`}
                  className={`flex items-center space-x-3 py-2 px-3 transition-all duration-200 cursor-pointer group/item rounded-lg ${
                    isCurrentLesson
                      ? "text-blue-300 bg-blue-500/20"
                      : "text-slate-300 hover:text-white hover:bg-gray-400/30"
                  }`}
                >
                  <div
                    className={`w-1 h-1 rounded-full transition-colors duration-200 ${
                      isCurrentLesson ? "bg-blue-300" : "bg-blue-400 group-hover/item:bg-blue-300"
                    }`}
                  ></div>
                  <span className="text-sm">{item}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
