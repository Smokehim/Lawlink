import React from 'react'
import Image from 'next/image'

const Article = () => {
  return (
    <div className="py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="relative order-2 lg:order-1">
        <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-indigo-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10 border border-gray-100 transform hover:scale-[1.01] transition-transform duration-500">
          <Image 
            src="/images/stutu.jpg" 
            alt="LawLink Mission" 
            className="w-full h-[500px] object-cover" 
            width={600} 
            height={700} 
          />
        </div>
      </div>
      
      <div className="order-1 lg:order-2 space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100">
          <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
          <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">Mission & Vision</span>
        </div>
        
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Simplifying Access to <span className="text-blue-600">Justice</span> for Everyone
        </h2>
        
        <div className="space-y-6">
          <p className="text-gray-600 text-lg leading-relaxed border-l-4 border-blue-600 pl-6 py-2 italic font-medium">
            &quot;We believe that high-quality legal support should not be a luxury for the few, but a standard accessibility for all.&quot;
          </p>
          
          <p className="text-gray-600 text-lg leading-relaxed">
            Our platform was created to remove barriers, reduce uncertainty, and ensure that individuals and businesses alike can receive the legal support they deserve. We combine cutting-edge technology with the highest professional expertise to provide a secure environment where transparency and efficiency are the baseline.
          </p>
          
          <p className="text-gray-600 text-lg leading-relaxed font-medium">
            LawLink is more than a directory; it&apos;s a movement towards a more equitable legal system.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Article
