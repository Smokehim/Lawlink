"use client";
import React from 'react'
import { useRouter } from 'next/navigation'

import { homeColors } from '../../interfaces/colors'

function MainService() {
  const router = useRouter()
  
  const handleNavigate = (path: string) => {
    router.push(path)
  }
  const services = [
    { id: 1, title: 'Legal Consultation', description: 'Speak with a qualified lawyer about your issue.', image: '/images/advogadoaguilar-right-4944550_1920.jpg' },
    { id: 2, title: 'Document Review', description: 'Have contracts and legal documents examined by experts.', image: '/images/felix_w-book-3089857_1280.jpg' },
    { id: 3, title: 'Court Representation', description: 'Get professional representation in court proceedings.', image: '/images/momagic-attorney-8850323_1280.png' },
    { id: 4, title: 'Business Formation', description: 'Assistance with company registration and compliance.', image: '/images/court.jpg' },
    { id: 5, title: 'Family Law Advice', description: 'Support for divorce, custody, and other family matters.', image: '/images/family.jpg' },
    { id: 6, title: 'Property & Real Estate', description: 'Legal help for buying, selling, or leasing property.', image: '/images/real.jpg' },
  ]

  return (
    <div className="p-10 flex flex-col gap-5 items-center min-h-screen text-white bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex flex-col justify-center">
        <h1 className="text-4xl text-center sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Our Legal Services
        </h1>
        <p className="text-xl text-gray-900 text-center">
          We provide access to trusted legal professionals 
          ready to assist you with a wide range of legal matters. 
          From personal disputes to business needs, our platform ensures
           you receive reliable and timely legal support
        </p>
      </div>

      {/* services cards section */}
      <section className="w-full mt-10 px-4">
        <h2 className={`${homeColors.textPrimary} text-4xl font-bold text-center mb-10`}>
          Our Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map(s => (
            <div
              key={s.id}
              className="relative h-80 rounded-xl overflow-hidden shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer bg-cover bg-center"
               style={{ backgroundImage: `url("${s.image}")` }}
            >
              <div className="absolute inset-0 bg-black/50" />
                <div className="relative h-full flex flex-col justify-end p-8 text-white">
                  <h3 className="text-3xl font-bold mb-3">{s.title}</h3>
                  <p className="text-lg leading-relaxed">{s.description}</p>
               </div>
            </div>
          ))}
        </div>
      </section>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
        Connect with Verified Lawyers in Zambia
      </h1>
      <section className="relative rounded-xl bg-white py-10 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            
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

export default MainService