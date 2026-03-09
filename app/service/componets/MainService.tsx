"use client";
import React from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Scale, FileText, Landmark, Users, Home, ArrowRight } from 'lucide-react'

const MainService = () => {
  const router = useRouter()
  
  const handleNavigate = (path: string) => {
    router.push(path)
  }

  const services = [
    { 
      id: 1, 
      title: 'Legal Consultation', 
      description: 'Direct, expert strategy sessions with top-tier licensed attorneys.', 
      image: '/images/advogadoaguilar-right-4944550_1920.jpg',
      icon: <Scale className="w-6 h-6 text-blue-600" />
    },
    { 
      id: 2, 
      title: 'Document Review', 
      description: 'Precision analysis of contracts, NDAs, and complex legal paperwork.', 
      image: '/images/felix_w-book-3089857_1280.jpg',
      icon: <FileText className="w-6 h-6 text-blue-600" />
    },
    { 
      id: 3, 
      title: 'Court Representation', 
      description: 'Professional defense and litigation support in all Zambian courts.', 
      image: '/images/momagic-attorney-8850323_1280.png',
      icon: <Landmark className="w-6 h-6 text-blue-600" />
    },
    { 
      id: 4, 
      title: 'Business Formation', 
      description: 'End-to-end guidance for company registration and legal compliance.', 
      image: '/images/court.jpg',
      icon: <Users className="w-6 h-6 text-blue-600" />
    },
    { 
      id: 5, 
      title: 'Family Law Advice', 
      description: 'Compassionate support for custody, divorce, and estate planning.', 
      image: '/images/family.jpg',
      icon: <Users className="w-6 h-6 text-blue-600" />
    },
    { 
      id: 6, 
      title: 'Property & Real Estate', 
      description: 'Secure legal processing for transfers, leases, and land disputes.', 
      image: '/images/real.jpg',
      icon: <Home className="w-6 h-6 text-blue-600" />
    },
  ]

  return (
    <div className="bg-slate-50">
      {/* Hero Header */}
      <section className="relative pt-32 pb-24 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/50 rounded-bl-[200px] -z-10 pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
            <span className="px-4 py-1 text-xs font-bold tracking-widest text-blue-600 uppercase bg-blue-100 rounded-full mb-6">
              Our Expertise
            </span>
            <h1 className="text-4xl md:text-7xl font-extrabold text-gray-900 mb-8 tracking-tight leading-tight">
              Elite Legal <span className="text-blue-600">Solutions</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
              From corporate litigation to personal family matters, LawLink provides the specialized legal services you need to secure your future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s) => (
              <div 
                key={s.id} 
                className="group bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 flex flex-col"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image 
                    src={s.image} 
                    alt={s.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                  <div className="absolute bottom-6 left-6 flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/30">
                      {s.icon}
                    </div>
                  </div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{s.title}</h3>
                    <p className="text-gray-600 leading-relaxed font-medium">{s.description}</p>
                  </div>
                  <div className="mt-8 flex items-center text-blue-600 font-bold group-hover:translate-x-2 transition-transform">
                    Learn More <ArrowRight className="ml-2 w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-8 text-center text-white relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Ready to <span className="opacity-80">Start Your Case?</span>
          </h2>
          <p className="text-blue-100/80 max-w-2xl mx-auto text-lg mb-12">
            Connect with verified legal professionals today. We make the recruitment and consultation process seamless and secure.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => handleNavigate('/register/user')}
              className="px-10 py-4 bg-white text-blue-600 font-extrabold rounded-2xl shadow-2xl hover:bg-blue-50 transition-colors"
            >
              Get Started Now
            </button>
            <button
              onClick={() => handleNavigate('/logins/user')}
              className="px-10 py-4 bg-blue-500/30 text-white font-extrabold rounded-2xl border border-white/20 backdrop-blur-md hover:bg-blue-500/40 transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MainService
