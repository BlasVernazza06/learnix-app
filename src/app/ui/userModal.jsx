"use client"
import { User, User2, Wallet, LogOut } from "lucide-react"
import Link from "next/link"
import { logout } from "../(auth)/register/action"

export default function UserModal({ user }) {
  if (!user) {
    return null
  }

  const UserLinks = [
    {
      name: "Ir al Perfil",
      icon: User2,
      nav: "/dashboard/profile",
      iconBg: "text-blue-500",
      iconBgHover: "text-blue-600",
      textColor: "text-gray-200",
      textColorHover: "text-blue-400",
      bgHover: "hover:bg-gray-800",
    },
    {
      name: "Ver Planes",
      icon: Wallet,
      nav: "/#pricing",
      iconBg: "text-green-500",
      iconBgHover: "text-green-600",
      textColor: "text-gray-200",
      textColorHover: "text-green-400",
      bgHover: "hover:bg-gray-800",
    },
  ]

  return (
    <div className="absolute w-[270px] top-12 right-0 rounded-xl bg-gray-900 py-2 border border-gray-700 shadow-lg z-20">
      <header className="flex items-center gap-2 px-4 pb-2 border-b border-gray-700">
        <div className="w-max h-max bg-blue-600 rounded-full p-1">
          <User className="text-white size-8" />
        </div>
        <div className="flex flex-col">
          <span className="text-md font-bold text-white">{user.user_metadata?.name || "Jhon Doe"}</span>
          <span className="text-gray-400 text-[14px]">{user.email}</span>
        </div>
      </header>

      <div className="flex justify-between border-b border-gray-700 px-4 py-2">
        <span className="text-md text-gray-400 font-semibold">MI PLAN</span>
        <div className="flex w-max items-center bg-gray-700 border border-gray-600 rounded-full px-2 ">
          <span className="text-white text-[14px]">Sin Plan Activo</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-b border-gray-700 px-2 py-2">
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
                  className={`size-5 ${userLink.iconBg} ${index === 0 ? "group-hover:text-blue-600" : index === 1 ? "group-hover:text-green-600" : "group-hover:text-purple-600"}`}
                />
              </div>
              <span
                className={`text-md ${index === 0 ? "group-hover:text-blue-700" : index === 1 ? "group-hover:text-green-700" : "group-hover:text-purple-700"}`}
              >
                {userLink.name}
              </span>
            </Link>
          )
        })}
      </div>

      <div className="flex flex-col gap-2 px-2 pt-2">
        <form>
          <button
            type="submit"
            onClick={(e) => e.stopPropagation()}
            formAction={logout}
            className="flex items-center gap-2 hover:bg-gray-800 px-4 py-2 rounded-md cursor-pointer group w-full text-left text-gray-300"
          >
            <LogOut className="size-5 group-hover:text-gray-400" />
            <span className="text-md group-hover:text-gray-400">Cerrar Sesión</span>
          </button>
        </form>
      </div>
    </div>
  )
}
