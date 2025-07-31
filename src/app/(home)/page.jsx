import Image from "next/image";
import Courses from "../sections/courses";
import Pricing from '../sections/pricing';
import FAQ from '../sections/faq'
import Link from "next/link";
import { User } from "lucide-react";

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'


export default async function Home() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    throw error
  }

  return (
    <main className="min-h-[100vh] flex pt-40 justify-center bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200">
      <div className="max-w-5xl">
        <div className="text-wrap text-center">
          <p className="text-6xl font-bold">Desarrolla tus conocimientos del <strong className="text-blue-500">Area IT</strong></p>
          <div className="mt-10 flex justify-center items-center gap-4">
          {data?.user ? (
            <>
              <div className="flex items-center gap-4 h-16 px-6 rounded-xl bg-white border border-gray-300 shadow-sm">
                <div className="h-10 w-10 flex items-center justify-center bg-gray-700 rounded-full">
                  <User className="text-white size-5" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-semibold text-gray-800">{data.user.user_metadata.name}</span>
                  <span className="text-sm text-gray-500">{data.user.email}</span>
                </div>
              </div>
            
              <Link
                href="/dashboard"
                className="h-16 flex items-center justify-center text-sm font-medium rounded-xl bg-gray-800 text-white hover:bg-gray-700 transition-colors px-6 shadow-md"
              >
                Ir al Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="rounded-xl text-xl text-white px-5 py-4 bg-blue-600">
                  Se parte de nuestra Escuela
                </button>
                
              </Link>
              <span className="text-gray-400">O si ya eres parte, <a className="text-black hover:underline" href="">Inicia Sesion</a></span>
            </>
          )}
          </div>
        </div>

        <Courses/>

        <Pricing />

        <FAQ />
      </div>
    </main>
  );
}
