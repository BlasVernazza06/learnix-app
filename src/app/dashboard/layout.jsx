import React from "react"
import DashHeader from "@/app/dashboard/components/dashHeader"
import SideNav from "@/app/dashboard/components/sidenav"
import { createClient } from "@/utils/supabase/server"
import { SearchProvider } from "@/app/dashboard/context/searchContext"

export default async function DashboardLayout({ children }) {
  const supabase = await createClient()
  const {
    data: { user }, error
  } = await supabase.auth.getUser()

  return (
    <SearchProvider>
      <div className="h-screen flex bg-gray-950 text-white overflow-hidden">
        <SideNav />
        <div className="flex-1 flex flex-col min-h-0">
          <header className="h-16 w-full border-b border-gray-800 bg-gray-900 shadow-lg z-30 relative flex-shrink-0">
            <DashHeader user={user} />
          </header>
          <main className="flex-1 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-y-auto pt-5">
            {children}
          </main>
        </div>
      </div>
    </SearchProvider>
  )
}