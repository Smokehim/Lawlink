"use client";
import React from 'react'
import { useRouter } from 'next/navigation'

const Heroe = () => {
  const router = useRouter()
  
  const handleNavigate = (path: string) => {
    router.push(path)
  }
  
  return (
    <div className=' min-h-screen bg-white'>
      
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Connect with Verified Lawyers in Zambia
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Find trusted legal professionals, get instant consultations, and secure your rights with verified lawyers across Zambia
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                 onClick={() => handleNavigate('/register/user')}
                className="px-8 py-4 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Find a Lawyer
              </button>
              <button
                onClick={() => handleNavigate('/logins/user')}
                className="px-8 py-4 bg-white text-blue-600 text-lg rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors shadow-lg"
              >
                Login / Register
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Heroe
