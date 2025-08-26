import { ArrowLeft, ArrowRight, BookOpen, Clock, CheckCircle, Play, Speaker, ChartSpline, GraduationCap, } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import ChaptersLessons from "@/app/dashboard/course/sections/chaptersLessons";
import ButtonBack from "@/app/dashboard/components/buttonBack";


export default async function Lesson({params}) {
  const dummyCourses = [
      {
        id: "1",
        title: "Introducción a React",
        description: "Aprende los fundamentos de React.js, la librería más popular para construir interfaces de usuario.",
        image: "/react-course.jpeg",
        lessons: 10,
        rating: 4.8,
        reviews: 120,
        level: "Básico",
        topics: ["JSX", "Componentes", "Props y State", "Eventos", "Hooks básicos"],
        content: [
          {
            chapter: "Introducción a React",
            lessons: ["¿Qué es React?", "Ventajas y casos de uso", "Instalación y configuración"]
          },
          {
            chapter: "Componentes y Props",
            lessons: ["Crear componentes", "Props y renderizado dinámico", "Jerarquía de componentes"]
          },
          {
            chapter: "State y Eventos",
            lessons: ["useState básico", "Manejo de eventos", "Actualización del DOM"]
          },
          {
            chapter: "Hooks básicos",
            lessons: ["useEffect", "Ciclo de vida", "Ejemplo práctico"]
          }
        ]
      },
      {
        id: "2",
        title: "Desarrollo Web con Next.js",
        description: "Domina Next.js para crear aplicaciones web full-stack, rápidas y escalables.",
        image: "/next-course.png",
        lessons: 15,
        rating: 4.9,
        reviews: 95,
        level: "Intermedio",
        topics: ["Routing", "SSR & SSG", "API Routes", "Middleware", "Despliegue"],
        content: [
          {
            chapter: "Fundamentos de Next.js",
            lessons: ["¿Qué es Next.js?", "Instalación y estructura", "Pages y routing"]
          },
          {
            chapter: "Renderizado y datos",
            lessons: ["SSR vs SSG", "getStaticProps y getServerSideProps", "Uso de fetch"]
          },
          {
            chapter: "Back-end con API Routes",
            lessons: ["Crear endpoints", "Manejo de peticiones", "Autenticación básica"]
          },
          {
            chapter: "Despliegue",
            lessons: ["Preparar para producción", "Despliegue en Vercel", "Variables de entorno"]
          }
        ]
      },
      {
        id: "3",
        title: "Fundamentos de Tailwind CSS",
        description: "Estiliza tus aplicaciones de forma rápida y eficiente con el framework CSS Tailwind.",
        image: "/tailwind-course.png",
        lessons: 8,
        rating: 4.7,
        reviews: 80,
        level: "Básico",
        topics: ["Clases utilitarias", "Diseño responsive", "Personalización", "Dark Mode"],
        content: [
          {
            chapter: "Introducción a Tailwind",
            lessons: ["¿Qué es Tailwind?", "Instalación", "Estructura de clases"]
          },
          {
            chapter: "Estilos comunes",
            lessons: ["Colores y tamaños", "Flexbox y Grid", "Tipografía"]
          },
          {
            chapter: "Responsive y Dark Mode",
            lessons: ["Breakpoints", "Responsive design", "Implementar modo oscuro"]
          }
        ]
      },
      {
        id: "4",
        title: "Bases de Datos con Supabase",
        description: "Aprende a usar Supabase como backend para tus aplicaciones, incluyendo autenticación y base de datos.",
        image: "/supabase-course.png",
        lessons: 12,
        rating: 4.6,
        reviews: 70,
        level: "Intermedio",
        topics: ["PostgreSQL", "Autenticación", "Realtime", "Relaciones", "Storage"],
        content: [
          {
            chapter: "Introducción y configuración",
            lessons: ["¿Qué es Supabase?", "Crear un proyecto", "Conectar a la base de datos"]
          },
          {
            chapter: "Autenticación y usuarios",
            lessons: ["Registro e inicio de sesión", "Roles y permisos", "Gestión de sesiones"]
          },
          {
            chapter: "Manipulación de datos",
            lessons: ["CRUD con Supabase", "Relaciones entre tablas", "Filtros y joins"]
          },
          {
            chapter: "Características avanzadas",
            lessons: ["Realtime", "Storage de archivos", "Deploy y seguridad"]
          }
        ]
      },
      {
        id: "5",
        title: "Introducción a TypeScript",
        description: "Mejora la calidad de tu código JavaScript con TypeScript, añadiendo tipado estático.",
        image: "/typescript-course.png",
        lessons: 7,
        rating: 4.5,
        reviews: 60,
        level: "Básico",
        topics: ["Tipos básicos", "Funciones tipadas", "Interfaces", "Genéricos", "TS + React"],
        content: [
          {
            chapter: "Conceptos básicos",
            lessons: ["¿Qué es TypeScript?", "Compilación y configuración", "Tipos primitivos"]
          },
          {
            chapter: "Estructuras complejas",
            lessons: ["Objetos e interfaces", "Uniones y opcionales", "Enums"]
          },
          {
            chapter: "Avanzado + React",
            lessons: ["Genéricos", "TypeScript con React", "Props tipadas"]
          }
        ]
      },
      {
        id: "6",
        title: "Despliegue con Vercel",
        description: "Aprende a desplegar tus aplicaciones Next.js de forma sencilla y eficiente con Vercel.",
        image: "/vercel-course.png",
        lessons: 5,
        rating: 4.9,
        reviews: 110,
        level: "Avanzado",
        topics: ["Deploy automático", "CI/CD", "Custom domains", "Preview deployments"],
        content: [
          {
            chapter: "Introducción a Vercel",
            lessons: ["¿Qué es Vercel?", "Crear cuenta y conectar GitHub", "Primer despliegue"]
          },
          {
            chapter: "Optimización y CI/CD",
            lessons: ["Variables de entorno", "Optimización para producción", "Preview deployments"]
          },
          {
            chapter: "Dominios y monitoreo",
            lessons: ["Configuración de dominios", "SSL y seguridad", "Logs y analíticas"]
          }
        ]
      }
  ];

  console.log(params)

  const slugify = (text) => {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[¿?]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
  }

  const { courseId, chapterId, lessonId } = await params
    
  const oneCourse = dummyCourses?.find(
    (p) => p.title.toLowerCase().replace(/\s+/g, "-") === decodeURIComponent(courseId),
  )

  const chapter = oneCourse.content?.find((ch) => slugify(ch.chapter) === decodeURIComponent(chapterId))
  
  const lesson = chapter.lessons?.find(
    (l) => slugify(typeof l === "string" ? l : l.title) === decodeURIComponent(lessonId),
  )

  const currentLessonIndex = chapter.lessons.findIndex(
    (l) => slugify(typeof l === "string" ? l : l.title) === decodeURIComponent(lessonId),
  )

  console.log(currentLessonIndex)
  const previousLesson = currentLessonIndex > 0 ? chapter.lessons[currentLessonIndex - 1] : null
  const nextLesson = currentLessonIndex < chapter.lessons.length - 1 ? chapter.lessons[currentLessonIndex + 1] : null

  console.log(chapter)
  console.log(lesson)

  return (
    <div className="flex justify-center min-h-screen py-6 px-4 sm:px-6 lg:px-8  text-white">
      <div className="max-w-6xl  pt-4 w-full">
        <div className="flex items-center justify-between">
          <ButtonBack/>

          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-400">
                Lección {currentLessonIndex + 1} de {chapter.lessons.length}
            </div>
            <div className="w-25 h-2 bg-slate-800 border border-gray-700/30  rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
                style={{ width: `${((currentLessonIndex + 1) / chapter.lessons.length) * 100}%` }}
              />
            </div>
          </div>
        </div>



        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium">
              {oneCourse.title}
            </div>
            <div className="text-slate-500">•</div>
            <div className="text-slate-400 text-sm">{chapter.chapter}</div>
          </div>

          <p className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent leading-tight">
            {lesson}
          </p>
        </div>



        <div className="flex flex-col lg:flex-row gap-8 w-full">
          {/* Izquierda */}
          <div className="flex-1 space-y-8">
            {/* Video */}
            <div className="group relative">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-gray-700 mb-6">
                <Image
                  src={oneCourse.image || "/placeholder.svg"}
                  alt={oneCourse.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 600px"
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>

            {/* Contenido de la lección */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-400/10 rounded-2xl blur-xl" />
              <div className="relative bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center">
                    <BookOpen className="size-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Contenido de la lección</h2>
                </div>
                <div className="prose prose-invert prose-lg max-w-none">
                  <p className="text-slate-300 leading-relaxed text-lg">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur ducimus obcaecati sint? Totam temporibus corrupti, possimus explicabo culpa ex cupiditate aut, debitis quos, nihil porro laborum delectus quia reprehenderit tenetur.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Derecha */}
          <div className="lg:w-80 w-full flex flex-col">
            <div className="border border-gray-700 bg-gray-900 rounded-xl py-4 px-6 flex flex-col w-full">
              <header className="pt-2 pb-4">
                <p className="text-xl font-bold text-white">Contenido</p>
              </header>
              <main className="flex flex-col pb-4 gap-2">
                {oneCourse.content.map((lesson, index) => (
                  <ChaptersLessons lesson={lesson} key={index} index={index} courseId={courseId} />
                ))}
              </main>
            </div>
          </div>
        </div>


        <div className="flex justify-between items-center mt-16 pt-8 border-t border-slate-800/50">
          <div>
            {previousLesson && (
              <Link
                href={`/dashboard/course/${courseId}/${chapterId}/${slugify(typeof previousLesson === "string" ? previousLesson : previousLesson.title)}`}
                className="group flex items-center gap-4 px-6 py-4 bg-slate-700/50 border border-slate-600/50 rounded-xl hover:bg-slate-600/50 hover:border-blue-400/30 transition-all duration-300"
              >
                <ArrowLeft className="size-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide font-medium">Anterior</div>
                  <div className="text-slate-200 font-medium group-hover:text-white transition-colors">
                    {typeof previousLesson === "string" ? previousLesson : previousLesson.title}
                  </div>
                </div>
              </Link>
            )}
          </div>

          <div>
            {nextLesson && (
              <Link
                href={`/dashboard/course/${courseId}/${chapterId}/${slugify(typeof nextLesson === "string" ? nextLesson : nextLesson.title)}`}
                className="group flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
              >
                <div className="text-right">
                  <div className="text-xs text-blue-100 uppercase tracking-wide font-medium">Siguiente</div>
                  <div className="text-white font-medium">
                    {typeof nextLesson === "string" ? nextLesson : nextLesson.title}
                  </div>
                </div>
                <ArrowRight className="size-5 text-white group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}