"use client"
import { useEffect, useState, useRef } from "react"
import gsap from "gsap"
import Link from "next/link"
import { User, Wallet, Headset, CircleQuestionMark, Menu, X } from "lucide-react"
import UserModal from "./userModal"

export default function HeaderStart({ user }) {
  const [scrolled, setScrolled] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const userButtonRef = useRef(null)
  const modalRef = useRef(null)

  const Links = [
    { name: "Pricing", icon: Wallet, nav: "#pricing" },
    { name: "Contactanos", icon: Headset, nav: "#contacts" },
    { name: "FAQ", icon: CircleQuestionMark, nav: "#FAQ" },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userButtonRef.current &&
        !userButtonRef.current.contains(event.target) &&
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        setModalOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const brand = document.getElementById("brand")
    if (brand) {
      gsap.fromTo(brand, { x: -100 }, { x: 0, duration: 1, ease: "power2.out" })

      const handleMouseEnter = () => gsap.to(brand, { scale: 1.15, duration: 0.2 })
      const handleMouseLeave = () => gsap.to(brand, { scale: 1, duration: 0.2 })

      brand.addEventListener("mouseenter", handleMouseEnter)
      brand.addEventListener("mouseleave", handleMouseLeave)

      return () => {
        brand.removeEventListener("mouseenter", handleMouseEnter)
        brand.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full h-max z-50 transition-all duration-300 py-2
        ${scrolled ? "bg-gray-900/80 backdrop-blur-md shadow-md" : "bg-transparent shadow-none"}
        ${mobileMenuOpen && "bg-none backdrop-blur shadow-none"}`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div id="brand" className="flex items-center gap-2">
            <img className="w-9 h-9" src="/icon-Brand.svg" alt="Learnix Logo" />
            <span className="font-pretty font-bold text-3xl text-white">Learnix</span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {Links.map((link, index) => {
              const Icon = link.icon
              return (
                <Link
                  key={index}
                  href={link.nav}
                  className="inline-flex items-center px-4 py-2 text-base font-medium rounded-xl text-gray-300 hover:text-blue-400 hover:bg-gray-800 transition-colors"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {link.name}
                </Link>
              )
            })}
          </div>
          {/* User button (desktop) */}
          {user ? (
            <button
              ref={userButtonRef}
              onClick={() => setModalOpen(!modalOpen)}
              className="ml-4 hidden md:inline-flex relative  items-center justify-center h-10 w-auto px-3 gap-2 rounded-full hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              <div className="h-8 w-8 rounded-full flex items-center justify-center bg-blue-600 text-white overflow-hidden">
                {user.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url || "/placeholder.svg"}
                    alt={user.user_metadata.name || "User"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User className="w-4 h-4" />
                )}
              </div>
              <span className="hidden sm:block text-white font-medium">
                {user.user_metadata?.name || "Usuario"}
              </span>
            </button>
          ) : (
            <Link
              href="/login"
              className="ml-4 hidden md:inline-flex items-center justify-center gap-2 px-4 py-2 text-base font-medium rounded-xl text-gray-300 hover:bg-gray-800 transition-colors"
            >
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              Iniciar Sesión
            </Link>
          )}

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              className="p-2 rounded-md hover:bg-gray-800 transition"
              aria-label="Abrir menú"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-gray-900">
          <ul className="flex flex-col gap-2 p-4">
            {Links.map((link, index) => {
              const Icon = link.icon
              return (
                <li key={index}>
                  <Link
                    href={link.nav}
                    className="flex items-center px-3 py-2 rounded hover:bg-gray-700 transition text-gray-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {link.name}
                  </Link>
                </li>
              )
            })}

            {/* User button (mobile) */}
            {user ? (
              <li className="mt-2">
                <button
                  ref={userButtonRef}
                  onClick={() => setModalOpen(!modalOpen)}
                  className="flex items-center w-full gap-2 px-3 py-2 rounded hover:bg-gray-700 transition text-gray-300"
                >
                  <div className="h-8 w-8 rounded-full flex items-center justify-center bg-blue-600 text-white overflow-hidden">
                    {user.user_metadata?.avatar_url ? (
                      <img
                        src={user.user_metadata.avatar_url || "/placeholder.svg"}
                        alt={user.user_metadata.name || "User"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                  </div>
                  <span>{user.user_metadata?.name || "Usuario"}</span>
                </button>
                {modalOpen && <UserModal user={user} />}
              </li>
            ) : (
              <li className="mt-2">
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 transition text-gray-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  Iniciar Sesión
                </Link>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  )
}
