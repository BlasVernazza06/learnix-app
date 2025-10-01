"use client"
import { useState, useRef } from 'react'
import { User } from 'lucide-react'
import Link from 'next/link'
import UserModal from './userModal'

export default function UserButton({ userData }) {
    const [modalOpen, setModalOpen] = useState(false)
    const userButtonRef = useRef(null)

    return (
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
          {modalOpen && userData && <UserModal user={userData} />}
        </div>
    );
}