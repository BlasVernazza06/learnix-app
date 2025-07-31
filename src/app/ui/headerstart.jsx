"use client"
import { useEffect, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import Link from "next/link"
import { User } from "lucide-react"
import ThemeToggle from "./ThemeToggle"
import { Wallet, Headset, CircleQuestionMark } from "lucide-react"
import UserModal from "./userModal" // Ahora será un Client Component

export default function HeaderStart({ user }) {
  const [scrolled, setScrolled] = useState(false)
  const [modal, setModal] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const Links = [
    { name: "Pricing", icon: Wallet, nav: "#pricing" },
    { name: "Contactanos", icon: Headset, nav: "#contacts" },
    { name: "FAQ", icon: CircleQuestionMark, nav: "#FAQ" },
  ]

  useGSAP(() => {
    const brand = document.getElementById("brand")
    gsap.fromTo(brand, { x: -100 }, { x: 0, duration: 1, ease: "power2.out" })

    const handleMouseEnter = () => {
      gsap.to(brand, { scale: 1.15, duration: 0.2, ease: "power2.out" })
    }
    const handleMouseLeave = () => {
      gsap.to(brand, { scale: 1, duration: 0.2, ease: "power2.out" })
    }

    brand.addEventListener("mouseenter", handleMouseEnter)
    brand.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      brand.removeEventListener("mouseenter", handleMouseEnter)
      brand.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-10 transition-all duration-300
      ${scrolled ? "backdrop-blur-2xl shadow-md" : "bg-transparent shadow-none"}`}
    >
      <div className="max-w-5xl mx-auto py-2">
        <div className="flex justify-between items-center h-16">
          <div id="brand" className="flex gap-2 ">
            <img className="size-9" src="/icon-Brand.svg" alt="" />
            <span className="font-pretty font-bold text-3xl">Learnix</span>
          </div>
          <div className="flex gap-8">
            {Links.map((link, index) => {
              const Icon = link.icon
              return (
                <Link
                  key={index}
                  href={link.nav}
                  className="flex items-center gap-2 border border-transparent hover:border-blue-200 hover:bg-blue-100 rounded-xl px-4 py-3 transition-colors transition-border duration-300 cursor-pointer"
                >
                  <Icon className="size-4 text-black" />
                  <p>{link.name}</p>
                </Link>
              )
            })}
          </div>
          <div className="flex items-center justify-center gap-4">
            <ThemeToggle />
            <div
              onClick={() => setModal(!modal)}
              className="flex items-center justify-center gap-2 border border-transparent hover:border-blue-200 hover:bg-blue-100 p-2 rounded-xl cursor-pointer"
            >
              <div className="bg-blue-400 rounded-full p-1">
                <User className="text-white" />
              </div>
              <span>{user.user_metadata?.name || 'Jhon Doe'}</span> {/* Muestra el nombre del usuario o "Usuario" */}
            </div>
            {modal && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={(e) => {
                    if (e.target === e.currentTarget) {
                      setModal(false)
                    }
                  }}
                />
                {user && <UserModal user={user} />} {/* Pasa el objeto user al UserModal si existe */}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
