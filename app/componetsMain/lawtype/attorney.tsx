import Image from 'next/image'
import React from 'react'
import { CheckCircle2, Gavel, Briefcase, Users } from 'lucide-react'

const Attorney = () => {
  const infor = [
    {
      id: 1,
      title: "attorney",
      icon: <CheckCircle2 className="w-8 h-8 text-blue-600" />,
      image: "/images/advogadoaguilar-right-4944550_1920.jpg",
      description: "Attorney credential: what to verify",
      explanation: "Check education, licensing, and specific state board experience."
    },
    {
      id: 2,
      title: "attorney",
      icon: <Briefcase className="w-8 h-8 text-blue-600" />,
      image: "/images/thelawofficeofbarryejanay-business-law-10021863_1920.jpg",
      description: "Legal support for startups",
      explanation: "Protect your business from day one with ironclad contracts."
    },
    {
      id: 3,
      title: "attorney",
      icon: <Gavel className="w-8 h-8 text-blue-600" />,
      image: "/images/un-perfekt-handshake-4040911_1920.jpg",
      description: "Resolving business disputes",
      explanation: "Compare mediation, arbitration, and high-stakes litigation paths."
    }
  ]

  const cards = [
    { id: 1, title: "Lawyer specialties for business needs", description: "Match practice areas to your specific corporate case.", icon: <Users className="w-6 h-6 text-blue-600" /> },
    { id: 2, title: "Question before hiring a lawyer", description: "Clarity on fees, process, and expected courtroom results.", icon: <Gavel className="w-6 h-6 text-blue-600" /> }
  ]

  return (
    <div className="flex flex-col gap-12 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {infor.map((items) => (
          <div className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 overflow-hidden relative" key={items.id}>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-6 transition-transform">
                {items.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{items.description}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{items.explanation}</p>
              <div className="relative h-48 rounded-2xl overflow-hidden shadow-inner">
                <Image
                  src={items.image}
                  alt={items.description}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Secondary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cards.map((items) => (
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-10 text-white flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden" key={items.id}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
              {items.icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">{items.title}</h3>
              <p className="text-gray-300 text-lg">{items.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Attorney
