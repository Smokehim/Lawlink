"use client";
import React from 'react'
import { useRouter } from 'next/navigation'

const Hero = () => {
  const router = useRouter()

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <div className='relative w-full overflow-hidden bg-white'>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      
      <section className="relative z-10 bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-[90vh] flex flex-col items-center justify-center py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          <div className="text-center space-y-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold tracking-wide uppercase mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
              Zambia&apos;s Premier Legal Network
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 tracking-tight leading-tight mb-6">
              Connect with Verified <br className="hidden sm:block" />
              <span className="text-blue-600">Lawyers in Zambia</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Find trusted legal professionals, get instant consultations, and secure your rights securely and seamlessly.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mt-10">
              <button
                onClick={() => handleNavigate('/register/user')}
                className="group relative px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-2xl hover:bg-blue-700 transition-all duration-300 shadow-xl hover:shadow-cyan-500/30 hover:-translate-y-1 w-full sm:w-auto"
              >
                <div className="flex items-center justify-center">
                  Find a Lawyer
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </button>
              
              <button
                onClick={() => handleNavigate('/logins/user')}
                className="group px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-2xl border border-gray-200 hover:border-blue-200 hover:bg-blue-50 transition-all duration-300 shadow-sm hover:shadow-md w-full sm:w-auto"
              >
                Login / Register
              </button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 pointer-events-none"></div>
      </section>
    </div>
  )
}

export default Hero
