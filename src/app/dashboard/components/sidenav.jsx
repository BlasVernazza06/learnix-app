"use client"

import { useState, useRef, useEffect } from "react"
import { Home, BookOpen, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import gsap from "gsap"
import ToggleButton from "./ToggleButton"
import { registerSideNavToggle } from "./dashHeader"

export default function SideNav() {
  const [isDesktopOpen, setIsDesktopOpen] = useState(true)
  const [isResponsiveOpen, setIsResponsiveOpen] = useState(false)
  const sidenavRef = useRef(null)
  const overlayRef = useRef(null)
  const pathname = usePathname()

  const navItems = [
    { name: "Dashboard", icon: Home, href: "/dashboard", includes: "" },
    { name: "Mis Cursos", icon: BookOpen, href: "/dashboard/course", includes: "/course" },
  ]

  // Registrar función toggle para que el header pueda controlarla
  useEffect(() => {
    registerSideNavToggle((isOpen) => {
      setIsResponsiveOpen(isOpen)
    })
  }, [])

  // Configuración inicial y manejo de resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // Desktop: resetear transforms y ocultar overlay
        if (sidenavRef.current) {
          gsap.set(sidenavRef.current, { x: 0 })
        }
        if (overlayRef.current) {
          gsap.set(overlayRef.current, { display: "none", opacity: 0 })
        }
        setIsResponsiveOpen(false)
      } else {
        // Mobile: posicionar fuera de pantalla si no está abierto
        if (sidenavRef.current && !isResponsiveOpen) {
          gsap.set(sidenavRef.current, { x: "-100%" })
        }
      }
    }

    // Configurar estado inicial
    handleResize()
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isResponsiveOpen])

  // Animación para desktop (colapsar/expandir)
  useEffect(() => {
    if (window.innerWidth >= 768 && sidenavRef.current) {
      gsap.to(sidenavRef.current, {
        width: isDesktopOpen ? "16rem" : "4.5rem",
        duration: 0.35,
        ease: "power2.inOut",
      })
    }
  }, [isDesktopOpen])

  // Animación para responsive (mostrar/ocultar)
  useEffect(() => {
    if (window.innerWidth < 768) {
      if (isResponsiveOpen) {
        // Mostrar: overlay aparece y sidebar se desliza
        if (overlayRef.current) {
          gsap.set(overlayRef.current, { display: "block", opacity: 0 })
        }
        
        gsap.timeline()
          .to(overlayRef.current, { opacity: 1, duration: 0.3 })
          .to(sidenavRef.current, { x: "0%", duration: 0.4, ease: "power2.out" }, "-=0.1")
      } else {
        // Ocultar: sidebar se desliza y overlay desaparece
        gsap.timeline()
          .to(sidenavRef.current, { x: "-100%", duration: 0.3, ease: "power2.in" })
          .to(overlayRef.current, { opacity: 0, duration: 0.2 }, "-=0.1")
          .set(overlayRef.current, { display: "none" })
      }
    }
  }, [isResponsiveOpen])

  // Cerrar responsive nav al hacer clic en enlaces
  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setIsResponsiveOpen(false)
    }
  }

  // Cerrar con ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isResponsiveOpen && window.innerWidth < 768) {
        setIsResponsiveOpen(false)
      }
    }
    
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isResponsiveOpen])

  return (
    <>
      {/* Overlay para responsive */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
        style={{ display: "none" }}
        onClick={() => setIsResponsiveOpen(false)}
      />

      {/* Sidebar */}
      <div
        ref={sidenavRef}
        className="flex flex-col h-screen w-64 py-4 bg-gray-900 text-gray-300 shadow-2xl border-r border-gray-800 overflow-hidden md:relative fixed top-0 left-0 z-50"
      >
        {/* Header del sidebar */}
        <div className="flex justify-between items-center px-4 md:justify-center">
          {/* Botón X para cerrar en responsive */}
          <button
            onClick={() => setIsResponsiveOpen(false)}
            className="flex md:hidden p-2 text-gray-400 justify-center items-center hover:text-white hover:bg-gray-800 rounded-xl transition"
          >
            <X className="w-6 h-6" />
          </button>
          
          {/* Toggle para desktop */}
          <div className="hidden md:block">
            <ToggleButton 
              isOpen={isDesktopOpen} 
              onToggle={() => setIsDesktopOpen(!isDesktopOpen)}
            />
          </div>
        </div>

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 px-4 pb-6 border-b border-gray-800 cursor-pointer hover:opacity-90 transition-opacity mt-4 md:mt-0"
          onClick={handleLinkClick}
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-600 flex items-center justify-center shadow-md flex-shrink-0">
            <img src="/icon-Brand.svg" alt="Learnix Logo" className="w-6 h-6" />
          </div>
          <span 
            className={`text-xl font-bold text-white transition-opacity duration-300 ${
              !isDesktopOpen && window.innerWidth >= 768 ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
            }`}
          >
            Learnix
          </span>
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
                  onClick={handleLinkClick}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600/30 to-blue-500/20 border border-blue-500 shadow-md text-blue-500"
                      : "hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 flex-shrink-0 transition-colors ${
                      isActive ? "text-blue-500" : ""
                    }`}
                  />
                  <span
                    className={`text-[15px] font-medium transition-all duration-300 ${
                      !isDesktopOpen && window.innerWidth >= 768 
                        ? 'opacity-0 w-0 overflow-hidden' 
                        : 'opacity-100'
                    } ${
                      isActive ? "text-blue-500" : ""
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}