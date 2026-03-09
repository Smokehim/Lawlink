import React from 'react'

import { CheckCircle, MessageSquare, Shield, Scale, Zap } from 'lucide-react';

const Connect = () => {
  const features = [
    {
      icon: <Scale className="w-8 h-8 text-blue-600" />,
      title: "Verified Lawyers",
      description: "Every lawyer on our platform undergoes a strict verification process by our admin team to ensure top-tier legal expertise.",
      bg: "bg-blue-50",
      borderColor: "border-blue-100",
      hoverRing: "group-hover:ring-blue-200"
    },
    {
      icon: <Zap className="w-8 h-8 text-indigo-600" />,
      title: "Instant Connection",
      description: "Skip the waiting room. Connect with specialized attorneys instantly and get quick responses to your pressing legal queries.",
      bg: "bg-indigo-50",
      borderColor: "border-indigo-100",
      hoverRing: "group-hover:ring-indigo-200"
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-700" />,
      title: "Secure & Private",
      description: "Your privacy is our priority. All conversations and document sharing are protected with enterprise-grade end-to-end encryption.",
      bg: "bg-slate-50",
      borderColor: "border-slate-200",
      hoverRing: "group-hover:ring-blue-100"
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-blue-200/40 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl opacity-70"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center mb-16 max-w-2xl mx-auto text-center">
          <span className="px-4 py-1 text-xs font-bold tracking-widest text-blue-600 uppercase bg-blue-100 rounded-full mb-4">
            The LawLink Advantage
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Why thousands trust <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">LawLink</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed md:px-8">
            We're revolutionizing how people access legal help. Get fast, secure, and reliable connections to the best legal minds right away.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`group bg-white rounded-3xl p-8 border ${feature.borderColor} shadow-xl shadow-gray-200/40 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 relative overflow-hidden`}
            >
              {/* Card internal decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gray-50 to-white rounded-bl-[100px] z-0 opacity-50 transition-transform duration-500 group-hover:scale-110"></div>
              
              <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
                <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform duration-300 ring-2 ring-transparent ${feature.hoverRing}`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Connect
