import React from 'react'
import PartnerCard from './partnercard';

const Partners = () => {
  return (
    <div className="space-y-16">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
          <p className="font-bold text-blue-600 uppercase tracking-widest text-sm">Our Leadership</p>
          <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          The Experts Behind <span className="text-blue-600">LawLink</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mt-4 text-lg">
          Meet the dedicated team of legal and technology professionals working to revolutionize the legal industry.
        </p>
      </div>
      
      <div className="relative">
        <div className="absolute inset-0 bg-blue-50/30 rounded-[100px] -z-10 pointer-events-none transform -rotate-1 scale-105"></div>
        <div className="py-8">
          <PartnerCard />
        </div>
      </div>
    </div>
  )
}

export default Partners
