import React from 'react'
import { HelpCircle } from 'lucide-react'

const datas = [
  { id: 1, title: "Attorney vs lawyers: key difference", description: "Attorneys are licensed to present clients in the court and a lawyers are legally trained and can advise but may not always appear in court." },
  { id: 2, title: "Choose the right legal professional.", description: "Define your legal needs, check credentials, and confirm licensing in yor area before selecting a professional" },
  { id: 3, title: "Finding a lawyer for your case", description: "Search by your case type business, family or criminal to connect with a specialist" },
  { id: 4, title: "Preparing to contact a lawyer", description: "Collect relevant documents and a summary of your issue to ensure an efficient consultation" }
]
const Question = () => {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="flex flex-col items-center gap-4 mb-16">
          <span className="px-4 py-1 text-xs font-bold tracking-widest text-blue-600 uppercase bg-blue-100 rounded-full">
            Legal FAQs
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 text-center tracking-tight">
            Your legal questions, <span className="text-blue-600">answered</span>
          </h2>
          <p className="text-center text-gray-600 max-w-2xl text-lg leading-relaxed">
            Whether you&apos;re a legal professional or seeking legal assistance, find answers to common questions about our platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {datas.map((items) => (
            <div key={items.id} className="group bg-slate-50 rounded-3xl p-8 border border-gray-100 hover:border-blue-200 hover:bg-white hover:shadow-xl transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <HelpCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{items.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{items.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Question
