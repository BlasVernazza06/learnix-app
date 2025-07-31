import React from 'react'

const cursos = [
  {
    titulo: 'Introduction to Python',
    lecciones: '5 of 12 Lessons',
    imagen: '/courses/python-owl.svg',
    link: '#'
  },
  {
    titulo: 'Web Development',
    lecciones: 'Start Course.',
    imagen: '/courses/web-owl.svg',
    link: '#'
  },
  {
    titulo: 'Basic Algebra',
    lecciones: 'Lesson 2 of 5',
    imagen: '/courses/algebra-owl.svg',
    link: '#'
  },
  {
    titulo: 'JavaScript Essentials',
    lecciones: '8 of 20 Lessons',
    imagen: '/courses/js-owl.svg',
    link: '#'
  },
  {
    titulo: 'React for Beginners',
    lecciones: '3 of 15 Lessons',
    imagen: '/courses/react-owl.svg',
    link: '#'
  },
  {
    titulo: 'Node.js & Express',
    lecciones: 'Start Course.',
    imagen: '/courses/node-owl.svg',
    link: '#'
  },
  {
    titulo: 'SQL Databases',
    lecciones: 'Lesson 1 of 10',
    imagen: '/courses/sql-owl.svg',
    link: '#'
  },
  {
    titulo: 'DevOps Fundamentals',
    lecciones: 'Start Course.',
    imagen: '/courses/devops-owl.svg',
    link: '#'
  },
  {
    titulo: 'Linux Basics',
    lecciones: '2 of 8 Lessons',
    imagen: '/courses/linux-owl.svg',
    link: '#'
  },
  {
    titulo: 'UI/UX Design',
    lecciones: 'Start Course.',
    imagen: '/courses/uiux-owl.svg',
    link: '#'
  },
  {
    titulo: 'Machine Learning',
    lecciones: 'Lesson 4 of 18',
    imagen: '/courses/ml-owl.svg',
    link: '#'
  },
  {
    titulo: 'Cybersecurity Basics',
    lecciones: 'Start Course.',
    imagen: '/courses/cyber-owl.svg',
    link: '#'
  },
  {
    titulo: 'Cloud Computing',
    lecciones: 'Lesson 3 of 12',
    imagen: '/courses/cloud-owl.svg',
    link: '#'
  },
  {
    titulo: 'Git & Version Control',
    lecciones: 'Start Course.',
    imagen: '/courses/git-owl.svg',
    link: '#'
  }
]

export default function Courses() {
  return (
    <div 
      className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {cursos.map((curso, idx) => (
        <div
          key={idx}
          className="bg-white rounded-2xl shadow-md border border-gray-100 flex flex-col items-center p-6 min-h-[260px] transition-transform hover:scale-105 duration-300"
        >
          <img
            src={curso.imagen}
            alt={curso.titulo}
            className="w-20 h-20 object-contain mb-4"
          />
          <h3 className="text-xl font-bold text-gray-900 mb-1 text-center">{curso.titulo}</h3>
          <p className="text-gray-500 text-sm mb-4 text-center">{curso.lecciones}</p>
          <a
            href={curso.link}
            className="mt-auto inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Start Course
          </a>
        </div>
      ))}
    </div>
  )
}
