'use client'
import { useState, useRef } from 'react'
import { Search, User, X } from "lucide-react"
import Link from "next/link"
import UserButton from "../../ui/user-button"
import ToggleButton from './ToggleButton'
import { useSearch } from '../context/searchContext'

// Variable global para comunicar con el SideNav
let toggleSideNav = null

// Función para registrar el toggle desde el SideNav
export function registerSideNavToggle(toggleFunction) {
  toggleSideNav = toggleFunction
}

export default function DashHeader({ user }) {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false)
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
    <div className="h-full w-full flex items-center gap-2 px-6 bg-gray-900 border-b border-gray-800 shadow-sm">
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
        <UserButton userData={userData} />
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