import { CheckCircle2Icon } from 'lucide-react'
import React from 'react'
import Link from 'next/link'

export default function Pricing () {
    const priceTables = [
        {
            price: '4.99',
            typeservice: 'Basico',
            features:{
                feat1: 'Acceso a todos los cursos',
                feat2: 'Retos + Proyectos prácticos',
                feat3: 'Comunidad + Soporte en Discord'
            }
        },
        {
            price: '47.50',
            typeservice: 'Profesional',
            features:{
                feat1: 'Acceso a todos los cursos',
                feat2: 'Retos + Proyectos prácticos',
                feat3: 'Comunidad + Soporte en Discord'
            }
        },
        {
            price: '129.00',
            typeservice: 'Enterprise',
            features:{
                feat1: 'Acceso a todos los cursos',
                feat2: 'Retos + Proyectos prácticos',
                feat3: 'Comunidad + Soporte en Discord'
            }
        }
    ]

    return (
        <div 
            id='pricing'
            className='mt-40'>
            <header className='flex flex-col  items-center'>
                <p className='text-4xl font-bold'>Planes y Precios</p>
                <span className='text-gray-400'>Selecciona el plan que se adapte a tus necesidades</span>
            </header>

            <div className='grid grid-cols-3 gap-6 my-10'>
                {
                    priceTables.map((tab, index) => (
                        <div 
                        key={index}
                        className='relative bg-white w-full h-max rounded-xl [&:nth-child(2)]:border-blue-400 [&:nth-child(2)]:scale-105 border-2 border-transparent hover:border-blue-200 hover:scale-105 transition-all duration-300 p-6'>
                            {/* Badge solo para el segundo elemento */}
                            {index === 1 && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md z-10">
                                    Más popular
                                </div>
                            )}
                            <div className='flex justify-between mb-4'>
                                <div className='flex items-center border border-blue-400 bg-blue-300 w-max rounded-full px-2'>
                                    <span className='text-[12px] text-blue-600'>50% de descuento</span>
                                </div>
                                <div className='flex items-center bg-gray-700 border border-gray-500 rounded-full px-2 '>
                                    <span className='text-white text-[12px]'>{tab.typeservice}</span>
                                </div>
                            </div>
                            <div className='flex items-end gap-1'>
                                <p className='text-[#222222] font-bold text-5xl '>${tab.price}</p>
                                <span className='text-gray-400 text-xl'>/mes</span>
                            </div>
                            <div className='bg-gray-200 w-full h-[0.5px] mt-5'>
                            </div>

                            <div className='mt-6'>
                                {
                                    Object.values(tab.features).map((feat, idx) => (
                                        <div key={idx} className="flex items-center gap-2 mt-2">
                                            <CheckCircle2Icon className="text-green-500 w-4 h-4" />
                                            <span className="text-gray-700 text-sm">{feat}</span>
                                        </div>
                                    ))
                                }
                            </div>
                            <Link 
                                href="/paypage"
                                className='rounded-md w-full h-max mt-6 bg-blue-500 py-2 text-white cursor-pointer hover:bg-blue-600 flex items-center justify-center'>
                                Elegir Plan
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
