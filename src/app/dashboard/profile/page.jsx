export default function ProfilePage() {
    return (
      <div className="flex h-screen">
  
        <div className="flex-1 flex flex-col">
  
          {/* Main Content */}
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold text-foreground mb-8">Mi Perfil</h1>
  
              {/* Profile Header */}
              <div className=" p-6 mb-6">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-3xl">B</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-card-foreground">Blas Rodriguez</h2>
                    <p className="text-muted-foreground mb-2">Desarrollador Frontend</p>
                    <p className="text-sm text-muted-foreground">Miembro desde Enero 2024</p>
                  </div>
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                    Editar Perfil
                  </button>
                </div>
              </div>
  
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">📚</span>
                    <h3 className="font-semibold text-card-foreground">Cursos Completados</h3>
                  </div>
                  <p className="text-3xl font-bold text-blue-500">12</p>
                  <p className="text-sm text-muted-foreground">+2 este mes</p>
                </div>
  
                <div className="">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">⏱️</span>
                    <h3 className="font-semibold text-card-foreground">Horas de Estudio</h3>
                  </div>
                  <p className="text-3xl font-bold text-green-500">156</p>
                  <p className="text-sm text-muted-foreground">+8 esta semana</p>
                </div>
  
                <div className="">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">🏆</span>
                    <h3 className="font-semibold text-card-foreground">Logros</h3>
                  </div>
                  <p className="text-3xl font-bold text-yellow-500">24</p>
                  <p className="text-sm text-muted-foreground">Nuevo logro desbloqueado</p>
                </div>
              </div>
  
              {/* Current Progress */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-card-foreground mb-4">Progreso Actual</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-card-foreground">React Avanzado</span>
                      <span className="text-sm text-muted-foreground">75%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                  </div>
  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-card-foreground">TypeScript Fundamentals</span>
                      <span className="text-sm text-muted-foreground">45%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                  </div>
  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-card-foreground">Next.js 14</span>
                      <span className="text-sm text-muted-foreground">20%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: "20%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
  
              {/* Recent Achievements */}
              <div className="">
                <h3 className="text-xl font-semibold text-card-foreground mb-4">Logros Recientes</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <p className="font-medium text-card-foreground">Completaste React Básico</p>
                      <p className="text-sm text-muted-foreground">Hace 2 días</p>
                    </div>
                  </div>
  
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <span className="text-2xl">⚡</span>
                    <div>
                      <p className="font-medium text-card-foreground">Racha de 7 días estudiando</p>
                      <p className="text-sm text-muted-foreground">Hace 1 semana</p>
                    </div>
                  </div>
  
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <span className="text-2xl">📈</span>
                    <div>
                      <p className="font-medium text-card-foreground">100 horas de estudio completadas</p>
                      <p className="text-sm text-muted-foreground">Hace 2 semanas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }
  