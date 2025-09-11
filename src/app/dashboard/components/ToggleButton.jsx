"use client"

import { ChevronsRight } from "lucide-react"

export default function ToggleButton({ isOpen, onToggle }) {
  return (
    <div className="flex justify-start items-start ">
      <button
        onClick={onToggle}
        className="flex p-2 text-gray-400 justify-center items-center hover:text-white hover:bg-gray-800 rounded-xl transition"
        title={`${isOpen ? "Contraer Menu" : "Expandir Menu"}`}
      >
        <ChevronsRight
          className={`w-6 h-6 ${
            isOpen ? "rotate-180 transition-all duration-300" : "rotate-0 transition-all duration-300"
          }`}
        />
      </button>
    </div>
  )
}