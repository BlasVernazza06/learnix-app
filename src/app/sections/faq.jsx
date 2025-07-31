import { CheckCircle2Icon } from 'lucide-react'
import React from 'react'

export default function FAQ () {
    const faq = [
        {
            question: "¿Cómo accedo al contenido de la academia?",
            answer: "Debes iniciar sesión con tu cuenta vinculada y tendrás acceso inmediato al contenido desde el panel principal."
        },
        {
            question: "¿Si dejo de estar suscrito en el canal de Twitch, pierdo acceso al contenido de la academia?",
            answer: "Sí, el acceso está vinculado a tu suscripción activa en el canal de Twitch. Si la cancelas, perderás el acceso."
        },
        {
            question: "¿Qué tipo de suscripción de Twitch necesito para acceder al contenido?",
            answer: "Cualquier suscripción de pago en el canal de Twitch te da acceso al contenido de la academia."
        },
        {
            question: "¿Puedo acceder al contenido de la academia si tengo una suscripción de Twitch Prime?",
            answer: "Sí, las suscripciones de Twitch Prime también otorgan acceso al contenido."
        },
        {
            question: "¿Se actualizará el contenido de la academia?",
            answer: "Sí, el contenido se actualiza periódicamente con nuevos cursos y recursos."
        },
        {
            question: "¿Tengo un error al iniciar sesión con Twitch?",
            answer: "Por favor, verifica tu conexión y vuelve a intentarlo. Si el problema persiste, contacta con soporte."
        },
        {
            question: "¿Qué pasa si cambio el correo electrónico con el que me suscribí en Twitch?",
            answer: "Debes actualizar tu correo en tu perfil para mantener el acceso sin inconvenientes."
        },
    ];

    return (
        <div 
            id='FAQ'
            className='my-40 flex flex-col items-center'>
            <header className='flex flex-col  items-center'>
                <p className='text-4xl font-bold'>Preguntas Frecuentes</p>
            </header>

            <div className="flex flex-col items-center w-full max-w-2xl mx-auto gap-4 mt-10">
                {faq.map((item, idx) => (
                    <div
                        key={idx}
                        className="collapse collapse-arrow bg-[#181C23] rounded-lg text-white border-none shadow-none"
                    >
                        <input type="checkbox" />
                        <div className="collapse-title font-semibold text-base">
                            {item.question}
                        </div>
                        <div className="collapse-content text-gray-300 text-sm">
                            {item.answer}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
