"use client"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function FAQ() {
  const faq = [
    {
      question: "¿Cómo accedo al contenido de la academia?",
      answer:
        "Debes iniciar sesión con tu cuenta vinculada y tendrás acceso inmediato al contenido desde el panel principal.",
    },
    {
      question: "¿Si dejo de estar suscrito en el canal de Twitch, pierdo acceso al contenido de la academia?",
      answer:
        "Sí, el acceso está vinculado a tu suscripción activa en el canal de Twitch. Si la cancelas, perderás el acceso.",
    },
    {
      question: "¿Qué tipo de suscripción de Twitch necesito para acceder al contenido?",
      answer: "Cualquier suscripción de pago en el canal de Twitch te da acceso al contenido de la academia.",
    },
    {
      question: "¿Puedo acceder al contenido de la academia si tengo una suscripción de Twitch Prime?",
      answer: "Sí, las suscripciones de Twitch Prime también otorgan acceso al contenido.",
    },
    {
      question: "¿Se actualizará el contenido de la academia?",
      answer: "Sí, el contenido se actualiza periódicamente con nuevos cursos y recursos.",
    },
    {
      question: "¿Tengo un error al iniciar sesión con Twitch?",
      answer: "Por favor, verifica tu conexión y vuelve a intentarlo. Si el problema persiste, contacta con soporte.",
    },
    {
      question: "¿Qué pasa si cambio el correo electrónico con el que me suscribí en Twitch?",
      answer: "Debes actualizar tu correo en tu perfil para mantener el acceso sin inconvenientes.",
    },
  ]

  const [openIndex, setOpenIndex] = useState(null)

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="FAQ" className="flex flex-col items-center text-center py-16">
      <header className="flex flex-col items-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-wide">Preguntas Frecuentes</h2>
        <p className="text-gray-400 mt-3 max-w-xl">
          Encuentra respuestas a las preguntas más comunes sobre nuestro servicio y funcionalidades.
        </p>
      </header>
  
      <div className="w-full max-w-3xl space-y-4">
        {faq.map((item, idx) => (
          <div
            key={idx}
            className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-lg overflow-hidden"
          >
            <button
              className="flex justify-between items-center w-full py-5 px-6 text-left text-lg font-semibold text-white hover:text-blue-400 transition-colors focus:outline-none"
              onClick={() => toggleAccordion(idx)}
              aria-expanded={openIndex === idx}
              aria-controls={`faq-content-${idx}`}
            >
              {item.question}
              <ChevronDown
                className={`size-5 text-gray-300 transition-transform duration-300 ${
                  openIndex === idx ? "rotate-180 text-blue-400" : ""
                }`}
              />
            </button>
  
            <div
              id={`faq-content-${idx}`}
              className={`overflow-hidden transition-all duration-300 ease-in-out px-6 ${
                openIndex === idx ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0 py-0"
              }`}
            >
              <p className="text-gray-300 text-base leading-relaxed">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
  
}
