"use client"

import { createContext, useContext, useState } from 'react'

const SearchContext = createContext()

export function useSearch() {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearch must be used within SearchProvider')
  }
  return context
}

// Función para normalizar texto (eliminar acentos y convertir a minúsculas)
export function normalizeText(text) {
  if (!text) return ''
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Elimina diacríticos (acentos)
}

export function SearchProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState('')

  const clearSearch = () => setSearchQuery('')

  return (
    <SearchContext.Provider value={{ 
      searchQuery, 
      setSearchQuery, 
      clearSearch,
      normalizeText
    }}>
      {children}
    </SearchContext.Provider>
  )
}