"use client"

import { useState, useRef, useEffect } from "react"
import { Home, BookOpen, Menu, ChevronsRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import gsap from "gsap"

export default function SideNav() {
  const [isOpen, setIsOpen] = useState(true)
  const sidenavRef = useRef(null)
  const pathname = usePathname()

  const navItems = [
    { name: "Dashboard", icon: Home, href: "/dashboard", includes: "" },
    { name: "Mis Cursos", icon: BookOpen, href: "/dashboard/course", includes: "/course" },
  ]

  // ⚡ animar apertura/cierre
  useEffect(() => {
    if (sidenavRef.current) {
      gsap.to(sidenavRef.current, {
        width: isOpen ? "16rem" : "4.5rem",
        duration: 0.35,
        ease: "power2.inOut",
      })
    }
  }, [isOpen])

  return (
    <div
      ref={sidenavRef}
      className="flex flex-col min-h-screen w-64 py-4 bg-gray-900 text-gray-300 shadow-2xl border-r border-gray-800 overflow-hidden"
    >
      {/* Toggle */}
      <div className="flex justify-start  items-center pl-4 mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex p-2 text-gray-400 justify-center items-center hover:text-white hover:bg-gray-800 rounded-xl transition" title={`${isOpen ? "Contraer Menu" : "Expandir Menu"}`}
        >
          <ChevronsRight className={`w-6 h-6 ${isOpen ? "rotate-180 transition-all duration-300" : "rotate-0 transition-all duration-300"}`} />
        </button>
      </div>

      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-3 px-4 pb-6 border-b border-gray-800 cursor-pointer hover:opacity-90 transition-opacity"
      >
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-600 flex items-center justify-center shadow-md">
          <img src="/icon-Brand.svg" alt="Learnix Logo" className="w-6 h-6" />
        </div>
        {isOpen && <span className="text-xl font-bold text-white">Learnix</span>}
      </Link>

      {/* Menú */}
      <ul className="flex-1 space-y-2 px-2 mt-6">
        {navItems.map((item) => {
          const isActive = item.includes
            ? pathname.includes(item.includes)
            : pathname === item.href

          return (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200
                  ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600/30 to-blue-500/20 border border-blue-500 shadow-md text-blue-500"
                      : "hover:bg-gray-800 hover:text-white"
                  }
                `}
              >
                <item.icon
                  className={`w-5 h-5 flex-shrink-0 transition-colors ${
                    isActive ? "text-blue-500" : ""
                  }`}
                />
                {isOpen && (
                  <span
                    className={`text-[15px] font-medium ${
                      isActive ? "text-blue-500" : ""
                    }`}
                  >
                    {item.name}
                  </span>
                )}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
