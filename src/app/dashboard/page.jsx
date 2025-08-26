import MyCourses from "./(myCourses)/MyCourses"
import { Medal, Video } from "lucide-react"
import { createClient } from "@/utils/supabase/server"

export default async function DashPage() {
  const supabase = await createClient()
  const {
    data: { user }, error
  } = await supabase.auth.getUser()

  return (
    <div className="flex justify-center w-full px-4 md:px-6 lg:px-8 py-6">
      <div className="max-w-6xl md:max-w-5xl sm:max-w-4xl w-full space-y-10">

        {/* Header de bienvenida */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-3xl md:text-4xl font-bold text-white">
              Bienvenido, <span className="text-blue-500">{"Usuario" || user.user_metadata?.name}</span> 👋
            </span>
            <span className="text-gray-400">
              {new Date().toLocaleDateString("es-ES", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          {/* Métricas */}
          <div className="flex items-center gap-4">
            {[
              { icon: Video, count: 0, color: "green", label: "Cursos Comenzados" },
              { icon: Medal, count: 0, color: "yellow", label: "Cursos Completados" }
            ].map((metric, idx) => (
              <div key={idx} className="relative group">
                <div className={`flex items-center gap-2 border rounded-lg p-3 w-max cursor-pointer transition-all duration-200 bg-gray-800 hover:border-${metric.color}-500`}>
                  <metric.icon className={`text-${metric.color}-400 w-7 h-7`} />
                  <span className={`text-${metric.color}-400 font-semibold`}>{metric.count}</span>
                </div>

                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none">
                  <div className={`text-${metric.color}-400 bg-gray-800/80 backdrop-blur-sm text-xs px-3 py-2 rounded-lg border border-${metric.color}-700 whitespace-nowrap shadow-xl`}>
                    {metric.label}
                  </div>
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-${metric.color}-700`}></div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 translate-y-[-1px] w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-transparent border-t-gray-800"></div>
                </div>
              </div>
            ))}
          </div>
        </header>

        {/* Sección de cursos */}
        <div className="space-y-6">
          <header className="mb-4">
            <p className="font-bold text-2xl md:text-3xl text-white">Mis Cursos</p>
            <p className="text-gray-400">Aquí puedes ver los cursos a los que te has inscrito</p>
          </header>
          <MyCourses />
        </div>
      </div>
    </div>
  )
}
