import React from 'react'
import { Phone, Mail, MessageSquare, MapPin, ArrowRight } from 'lucide-react'

interface ContactItem {
  id: number;
  icon: React.ReactNode;
  label: string;
  detail: string;
  link: string;
}

const contactItems: ContactItem[] = [
  { 
    id: 1, 
    icon: <Phone className="w-8 h-8 text-blue-600" />, 
    label: "Phone Support", 
    detail: "0969591009",
    link: "tel:0969591009"
  },
  { 
    id: 2, 
    icon: <Mail className="w-8 h-8 text-blue-600" />, 
    label: "Email Address", 
    detail: "lawlink200@gmail.com",
    link: "mailto:lawlink200@gmail.com"
  },
  { 
    id: 3, 
    icon: <MessageSquare className="w-8 h-8 text-blue-600" />, 
    label: "WhatsApp Business", 
    detail: "0969591009",
    link: "https://wa.me/0969591009"
  },
  { 
    id: 4, 
    icon: <MapPin className="w-8 h-8 text-blue-600" />, 
    label: "Regional Office", 
    detail: "Lusaka, Zambia",
    link: "#"
  },
]

const Section = () => {
  return (
    <div className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center gap-16">
          <div className="text-center max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Contact Information</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Every inquiry is handled with the highest level of professionalism and confidentiality. Choose your preferred channel below.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
            {contactItems.map((item) => (
              <a 
                key={item.id} 
                href={item.link}
                className="group bg-white rounded-3xl p-10 shadow-xl border border-gray-100 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:rotate-6 transition-all duration-300">
                  <div className="group-hover:text-white transition-colors">
                    {item.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.label}</h3>
                <p className="text-blue-600 font-semibold mb-6">{item.detail}</p>
                
                <div className="mt-auto flex items-center gap-2 text-gray-400 group-hover:text-blue-600 transition-colors font-bold text-sm">
                  CONNECT <ArrowRight className="w-4 h-4" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Section
