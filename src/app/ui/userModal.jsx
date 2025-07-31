"use client" // ¡Importante! Ahora es un Client Component
import { User, User2, Wallet, LogOut } from "lucide-react"
import Link from "next/link"
import { logout } from "@/app/(auth)/register/action" // La Server Action de logout sigue siendo necesaria

export default function UserModal({ user }) {
    console.log(user)
  const UserLinks = [
    {
      name: "Ir al Perfil",
      icon: User2,
      nav: "/dashboard",
      iconBg: "text-blue-500",
      iconBgHover: "text-blue-600",
      textColor: "text-gray-700",
      textColorHover: "text-blue-700",
      bgHover: "hover:bg-blue-50",
    },
    {
      name: "Ver Planes",
      icon: Wallet,
      nav: "#contacts",
      iconBg: "text-green-500",
      iconBgHover: "text-green-600",
      textColor: "text-gray-700",
      textColorHover: "text-green-700",
      bgHover: "hover:bg-green-50",
    },
  ]

  // Si no se pasa un usuario (por ejemplo, si no está logueado), no renderizamos el modal
  if (!user) {
    return null
  }

  return (
    <>
      <div className="absolute w-[250px] top-17 right-[440px] rounded-xl bg-white py-2 border border-gray-300 z-20">
        <header className="flex items-center gap-2 px-4 pb-2 border-b border-gray-300">
          <div className="w-max h-max bg-blue-400 rounded-full p-1">
            <User className="text-white size-7" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold">{user.user_metadata?.name || 'Jhon Doe'}</span>
            <span className="text-gray-400 text-[12px]">{user.email}</span>
          </div>
        </header>

        <div className="flex justify-between border-b border-gray-300 px-4 py-2">
          <span className="text-sm text-gray-400 font-semibold">MI PLAN</span>
          <div className="flex w-max items-center bg-gray-700 border border-gray-500 rounded-full px-2 ">
            <span className="text-white text-[12px]">Sin Plan Activo</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-b border-gray-300 px-2 py-2">
          {UserLinks.map((userLink, index) => {
            const LinkIcon = userLink.icon
            return (
              <Link
                key={index}
                href={userLink.nav}
                className={`flex gap-2 items-center py-2 px-2 rounded-lg transition-all duration-200 ${userLink.bgHover} ${userLink.textColor} group`}
              >
                <div className={`p-1 rounded-md`}>
                  <LinkIcon
                    className={`size-4 ${userLink.iconBg} ${index === 0 ? "group-hover:text-blue-600" : index === 1 ? "group-hover:text-green-600" : "group-hover:text-purple-600"}`}
                  />
                </div>
                <span
                  className={`text-sm ${index === 0 ? "group-hover:text-blue-700" : index === 1 ? "group-hover:text-green-700" : "group-hover:text-purple-700"}`}
                >
                  {userLink.name}
                </span>
              </Link>
            )
          })}
        </div>

        <div className="flex flex-col gap-2 px-2 pt-2">
          <form action={logout}>
            <button
              type="submit"
              className="flex items-center gap-2 hover:bg-gray-200 px-4 py-2 rounded-md cursor-pointer group w-full text-left"
            >
              <LogOut className="size-4 group-hover:text-gray-600" />
              <span className="text-sm group-hover:text-gray-600">Cerrar Sesión</span>
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
