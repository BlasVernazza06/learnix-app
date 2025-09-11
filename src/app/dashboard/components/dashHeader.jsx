'use client'
import { useState, useRef } from 'react'
import { Search, User, X } from "lucide-react"
import Link from "next/link"
import UserModal from "@/app/ui/userModal"
import ToggleButton from './ToggleButton'
import { useSearch } from '../context/searchContext'

// Variable global para comunicar con el SideNav
let toggleSideNav = null

// Función para registrar el toggle desde el SideNav
export function registerSideNavToggle(toggleFunction) {
  toggleSideNav = toggleFunction
}

export default function DashHeader({ user }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [isSideNavOpen, setIsSideNavOpen] = useState(false)
  const userButtonRef = useRef(null)
  const userData = user
  const { searchQuery, setSearchQuery, clearSearch } = useSearch()

  const handleToggle = () => {
    const newState = !isSideNavOpen
    setIsSideNavOpen(newState)
    if (toggleSideNav) {
      toggleSideNav(newState)
    }
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleClearSearch = () => {
    clearSearch()
  }

  return (
    <div className="h-full w-full flex items-center px-6 bg-gray-900 border-b border-gray-800 shadow-sm">
      {/* Barra de búsqueda */}
      <div className="relative flex-grow max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Buscar cursos, retos..."
          className="pl-10 pr-10 py-2 w-full rounded-xl border border-gray-700 bg-gray-800 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 transition-all duration-200 shadow-sm"
        />
        {searchQuery && (
          <button
            onClick={handleClearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Iconos de notificación y usuario */}
      <div className="flex items-center gap-4 ml-auto">
        <div className="flex items-center gap-2 sm:gap-4 relative">
          {userData ? (
            <button
              ref={userButtonRef}
              onClick={() => setModalOpen(!modalOpen)}
              className="relative inline-flex items-center justify-center h-10 w-auto px-3 gap-2 rounded-full hover:bg-gray-800 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              <div className="h-8 w-8 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-600 text-white overflow-hidden shadow">
                {userData.user_metadata?.avatar_url ? (
                  <img
                    src={userData.user_metadata.avatar_url || "/placeholder.svg"}
                    alt={userData.user_metadata.name || "User"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User className="w-5 h-5" />
                )}
              </div>
              <span className="hidden sm:block text-white font-medium">{userData.user_metadata?.name || "Usuario"}</span>
            </button>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-4 py-2 text-base font-medium rounded-xl text-gray-300 hover:bg-gray-800 hover:text-white transition-colors shadow-sm"
            >
              Iniciar Sesión
            </Link>
          )}
          {modalOpen && user && <UserModal user={userData} />}
        </div>
      </div>

      {/* Toggle button para pantallas pequeñas */}
      <div className='items-center flex md:hidden ml-4'>
        <ToggleButton 
          isOpen={isSideNavOpen} 
          onToggle={handleToggle}
        />
      </div>
    </div>
  )
}