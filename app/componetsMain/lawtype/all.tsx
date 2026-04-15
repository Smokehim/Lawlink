import React from 'react'
import Image from 'next/image'
import { ArrowRight, Scale, BookOpen, X, Info } from 'lucide-react'
import { useState } from 'react'

const cards = [
  { id: 1, title: "Find your business legal match", description: "Identify the exact expertise needed for your corporation.", icon: <Scale className="w-6 h-6 text-blue-500" />, detail: "Finding the right legal match for your business means identifying attorneys who specialize in your industry. Whether you need help with contracts, compliance, or disputes, our network connects you with lawyers who understand the unique challenges your corporation faces." },
  { id: 2, title: "Selecting counsel for your case", description: "Follow strict, verified steps to make a smart choice.", icon: <BookOpen className="w-6 h-6 text-blue-500" />, detail: "Selecting the right counsel requires reviewing credentials, experience, and case history. Our platform verifies every attorney's qualifications, giving you a transparent and informed process so you always know you are working with a proven professional." }
]

const images = [
  { id: 1, image: "/images/thelawofficeofbarryejanay-business-law-10021863_1920.jpg", title: "Corporate Litigation", description: "Navigate complex courtroom procedures." },
  { id: 2, image: "/images/real.jpg", title: "Intellectual Property", description: "Secure and protect your most valuable assets." }
]

const categoryDetails: Record<string, string> = {
  "Corporate Litigation": "Corporate litigation involves legal disputes between businesses, such as breach of contract, partnership disputes, or shareholder issues. Our experts help you navigate these complex courtroom procedures with strategic advocacy to protect your interests and ensure business continuity.",
  "Intellectual Property": "Intellectual property law focuses on protecting and enforcing rights to creative works, inventions, and brand identifiers. We help you secure your trademarks, patents, and copyrights to safeguard your competitive advantage and prevent unauthorized use of your assets."
};

const All = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [expandedCardId, setExpandedCardId] = useState<number | null>(null);
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {/* Info Cards */}
        {cards.map((items) => (
          <div key={items.id} className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              {items.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{items.title}</h3>
            <p className="text-gray-600 leading-relaxed mb-4">{items.description}</p>

            <button
              onClick={() => setExpandedCardId(expandedCardId === items.id ? null : items.id)}
              className="flex items-center text-blue-600 font-bold transition-all outline-none"
            >
              {expandedCardId === items.id ? 'Show Less' : 'Explore'}
              <ArrowRight className={`ml-2 w-4 h-4 transition-transform ${expandedCardId === items.id ? 'rotate-90' : ''}`} />
            </button>

            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedCardId === items.id ? 'max-h-64 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="pt-4 border-t border-gray-100">
                <p className="text-gray-700 text-sm leading-relaxed">{items.detail}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Image Cards */}
        {images.map((items) => (
          <div
            key={items.id}
            className={`bg-white rounded-3xl shadow-lg border border-gray-100 transition-all duration-300 group flex flex-col overflow-hidden`}
          >
            <div className={`relative overflow-hidden ${expandedId === items.id ? 'h-64' : 'h-48'}`}>
              <Image
                src={items.image}
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                alt={items.title}
                width={800}
                height={500}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <h3 className="text-xl font-bold text-white">{items.title}</h3>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <p className="text-gray-600 mb-6">{items.description}</p>

              <button
                onClick={() => setExpandedId(expandedId === items.id ? null : items.id)}
                className="flex items-center text-blue-600 font-bold hover:gap-3 transition-all group/btn"
              >
                {expandedId === items.id ? 'Show Less' : 'Explore Details'}
                <ArrowRight className={`ml-2 w-4 h-4 transition-transform ${expandedId === items.id ? 'rotate-90' : 'group-hover/btn:translate-x-1'}`} />
              </button>

              {/* Inline Expansion */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedId === items.id ? 'max-h-96 mt-6 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="pt-6 border-t border-gray-100">
                  <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-2xl">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
                      <Info className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {categoryDetails[items.title] || items.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default All
