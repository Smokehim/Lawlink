import React from 'react'
import Image from 'next/image'
import { ArrowRight, Scale, BookOpen } from 'lucide-react'

const cards = [
  { id: 1, title: "Find your business legal match", description: "Identify the exact expertise needed for your corporation.", icon: <Scale className="w-6 h-6 text-blue-500" /> },
  { id: 2, title: "Selecting counsel for your case", description: "Follow strict, verified steps to make a smart choice.", icon: <BookOpen className="w-6 h-6 text-blue-500" /> }
]

const images = [
  { id: 1, image: "/images/thelawofficeofbarryejanay-business-law-10021863_1920.jpg", title: "Corporate Litigation", description: "Navigate complex courtroom procedures." },
  { id: 2, image: "/images/real.jpg", title: "Intellectual Property", description: "Secure and protect your most valuable assets." }
]

const All = () => {
  return (
    <div className="grid gap-8">

      {/* Hero Banner Area */}
      <div className="relative group overflow-hidden rounded-3xl shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10 pointer-events-none"></div>
        <Image
          src="/images/9bc7178f-dbcc-4317-9fbe-6474bfcf89f1.jpg"
          className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
          alt="Legal professionals discussing"
          width={1200}
          height={600}
        />
        <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20 w-full md:w-2/3">
          <span className="px-3 py-1 text-xs font-bold tracking-wider text-white bg-blue-600 rounded-full mb-4 inline-block">FEATURED</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Attorney vs Lawyer: The Difference</h2>
          <p className="text-gray-200 text-lg mb-6">Clarify roles, credentials, and courtroom qualifications to ensure you hire the right representation.</p>
          <button className="flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-300 transition-colors">
            Read Full Guide <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Info Cards */}
        {cards.map((items) => (
          <div key={items.id} className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              {items.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{items.title}</h3>
            <p className="text-gray-600 leading-relaxed">{items.description}</p>
          </div>
        ))}

        {/* Image Cards */}
        {images.map((items) => (
          <div key={items.id} className="bg-white rounded-2xl p-2 shadow-lg shadow-gray-200/50 border border-gray-100 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col">
            <div className="relative overflow-hidden rounded-xl mb-4 h-48">
              <Image
                src={items.image}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                alt={items.title}
                width={400}
                height={250}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
            </div>
            <div className="px-4 pb-4 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-gray-900 mb-1">{items.title}</h3>
              <p className="text-gray-600 text-sm flex-1">{items.description}</p>
              <div className="mt-4 flex items-center text-blue-600 font-medium text-sm">
                Explore <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default All
