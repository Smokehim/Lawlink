import React from 'react'

type Props = { embedded?: boolean }

const Cards = ({ embedded = false }: Props) => {
  interface CardZ {
    id: number;
    title: string;
    description: string;
  }

  const cards: CardZ[] = [
    { id: 1, title: "What is an attorney?", description: "Attorneys are licensed to represent clients in court and provide legal counsel for complex business matters." },
    { id: 2, title: "What is a lawyer?", description: "Lawyers are legally trained and can advise but may not always appear in court." },
    { id: 3, title: "Match by business case", description: "Connect with the right professional for your specific business needs." },
    { id: 4, title: "Vetted Legal Professionals", description: "All experts are verified for credentials, experience, and professional standards." },
    { id: 5, title: "Business law focus?", description: "Support for contracts, compliance, and corporate legal issues." },
    { id: 6, title: "Direct legal guidance", description: "Get clear, actionable advice tailored to your business." },
  ];

  const content = (
    <div className={`${embedded ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'} p-4`}>
      {!embedded && (
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="px-5 py-1.5 text-xs font-bold tracking-widest text-indigo-300 uppercase bg-indigo-900/40 border border-indigo-500/30 rounded-full mb-6 backdrop-blur-sm shadow-inner">
            Comparison Guide
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-blue-200 tracking-tight mb-4">
            Attorney vs Lawyer
          </h2>
          <p className="text-xl text-blue-200 max-w-2xl mt-4 font-medium">Business law experts, matched fast for your specific case footprint.</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
        <div className="absolute inset-0 bg-blue-500/5 filter blur-[100px] rounded-full pointer-events-none"></div>
        {cards.map((item) => (
          <div
            key={item.id}
            className="group relative bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl text-white p-8 rounded-[2rem] hover:-translate-y-2 hover:bg-white/10 transition-all duration-500 overflow-hidden"
          >
            {/* Subtle light effect on hover */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/20 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/5 shadow-inner group-hover:scale-110 transition-transform duration-500">
                <span className="text-xl font-bold text-blue-300">{item.id}</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-300 transition-colors">{item.title}</h3>
              <p className="text-blue-100/70 leading-relaxed text-lg">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  if (embedded) {
    return content
  }

  return (
    <section className="relative bg-[#0B1120] py-24 sm:py-32 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute left-0 top-1/4 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-color-dodge filter blur-[100px]"></div>
      <div className="absolute right-0 bottom-1/4 w-96 h-96 bg-indigo-600/20 rounded-full mix-blend-color-dodge filter blur-[100px]"></div>
      
      {content}
    </section>
  )
}

export default Cards

