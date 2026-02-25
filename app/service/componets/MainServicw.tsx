"use client";
import React from 'react'
import { homeColors } from '../../interfaces/colors'

function MainService(){
    const services = [
      { id: 1, title: 'Legal Consultation', description: 'Speak with a qualified lawyer about your issue.', bg: 'bg-[url(/images/consultation-bg.jpg)]' },
      { id: 2, title: 'Document Review', description: 'Have contracts and legal documents examined by experts.', bg: 'bg-[url(/images/document-bg.jpg)]' },
      { id: 3, title: 'Court Representation', description: 'Get professional representation in court proceedings.', bg: 'bg-[url(/images/court-bg.jpg)]' },
      { id: 4, title: 'Business Formation', description: 'Assistance with company registration and compliance.', bg: 'bg-[url(/images/business-bg.jpg)]' },
      { id: 5, title: 'Family Law Advice', description: 'Support for divorce, custody, and other family matters.', bg: 'bg-[url(/images/family-bg.jpg)]' },
      { id: 6, title: 'Property & Real Estate', description: 'Legal help for buying, selling, or leasing property.', bg: 'bg-[url(/images/property-bg.jpg)]' },
    ]

    return(
        <div className="p-10 flex flex-col gap-5 items-center min-h-screen text-white space-y-5 bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="flex flex-col   justify-center">
                <h1 className="text-7xl font-bold text-gray-900 text-center">Search Lawyers Near You</h1>
                <p className="text-xl text-gray-900 text-center">
                Get customized search results easily.
                Tell us your legal issue and location,
                and we`ll do the rest
                </p>
            </div>
            {/* services cards section */}
            <section className="w-full mt-10 px-4">
              <h2 className={`${homeColors.textPrimary} text-4xl font-bold text-center mb-10`}>Our Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {services.map(s => (
                  <div
                    key={s.id}
                    className={`relative h-80 rounded-xl overflow-hidden shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 cursor-pointer ${s.bg} bg-cover bg-center`}
                  >
                    {/* Dark overlay for better text readability */}
                    <div className="absolute inset-0 bg-black bg-opacity-50" />
                    {/* Content */}
                    <div className="relative h-full flex flex-col justify-end p-8 text-white">
                      <h3 className="text-3xl font-bold mb-3">{s.title}</h3>
                      <p className="text-lg leading-relaxed">{s.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

           
        </div>
    )
}
export default  MainService