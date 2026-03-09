import React from 'react'
import { CheckCircle2, ShieldCheck, Users } from 'lucide-react'

interface CardProps {
  title: string;
  numbers: string;
  description: string;
  icon: React.ReactNode;
}

const CardFt = ({ title, numbers, description, icon }: CardProps) => {
  return (
    <div className="group bg-white rounded-3xl p-10 border border-gray-100 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-6 text-4xl font-black text-blue-50 group-hover:text-blue-100/50 transition-colors">
        {numbers}
      </div>
      <div className="relative z-10">
        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-6 transition-transform">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

const Why = () => {
  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
            <p className="font-bold text-blue-600 uppercase tracking-widest text-sm">Why choose us</p>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Redefining the Legal <span className="text-blue-600">Experience</span>
          </h2>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <CardFt 
          numbers="01" 
          icon={<CheckCircle2 className="w-7 h-7 text-blue-600" />}
          title="Expertise & Knowledge" 
          description="Our platform connects you with the highest caliber of legal professionals specializing in corporate, family, and criminal law."
        />
        <CardFt 
          numbers="02" 
          icon={<ShieldCheck className="w-7 h-7 text-blue-600" />}
          title="Unwavering Trust" 
          description="We maintain strict verification standards and end-to-end encryption to ensure your legal journey is secure and entirely private."
        />
        <CardFt 
          numbers="03" 
          icon={<Users className="w-7 h-7 text-blue-600" />}
          title="Client-First Logic" 
          description="Every tool on LawLink is built with one goal: making legal services transparent, accessible, and fast for everyone."
        />
      </div>
    </div>
  )
}

export default Why
