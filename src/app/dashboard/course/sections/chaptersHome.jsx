'use client'
import { useState } from "react"
import { ChevronRight } from "lucide-react"

export default function ChaptersHome({ lesson, index }) {
    const [openIndex, setOpenIndex] = useState(null)

    const toggleAccordion = (i) => {
        setOpenIndex(openIndex === i ? null : i)
    }

    const isOpen = openIndex === index

    return (
        <div
            className="flex flex-col w-full rounded-xl border border-gray-700 bg-gray-900 hover:shadow-xl hover:shadow-blue-500/10"
        >
            <button
                className="w-full flex items-center justify-between px-3 pt-3 cursor-pointer"
                onClick={() => toggleAccordion(index)}
                aria-expanded={isOpen}
                aria-controls={`chapter-content-${index}`}
            >
                <div className="flex flex-col">
                    <div className="flex items-center space-x-3 pb-2">
                        <p className="text-sm font-medium text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                            Capítulo: {index + 1}
                        </p>
                    </div>
                    <span className="text-lg">{lesson.chapter}</span>
                </div>
                <ChevronRight
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-90' : 'rotate-0'}`}
                />
            </button>
            <div
                id={`chapter-content-${index}`}
                className={`mt-4 bg-gray-800/30 rounded-b-xl w-full overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100 py-2' : 'max-h-0 opacity-0'}`}
            >
                <ul className="flex flex-col gap-3 p-3">
                    {lesson.lessons.map((item, idx) => (
                        <li
                            key={idx}
                            className="flex items-center space-x-3 text-slate-300 hover:text-white transition-colors duration-200 cursor-pointer group/item"
                        >
                            <div className="w-2 h-2 bg-blue-400 rounded-full group-hover/item:bg-blue-300 transition-colors duration-200"></div>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
