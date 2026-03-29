import React from 'react'

type Props = { embedded?: boolean }

const Cards = ({ embedded = false }: Props) => {
  interface CardZ {
    id: number;
    title: string;
    description: string;
  }

  const cards: CardZ[] = [
    { id: 1, title: "What is an attorney?", description: "Attorneys are licensed to present clients in the court and provides legal counsel for complex business matters" },
    { id: 2, title: "What is a lawyer?", description: "Lawyers are legally trained and can advise but may not always appear in court." },
    { id: 3, title: "Match by business case", description: "Connect with the right professional for your specific business needs." },
    { id: 4, title: "Vetted legal Professionals", description: "All experts are verified for credentials, experience, and professional standards" },
    { id: 5, title: "Business law focus?", description: "Support for contracts, compliance, and corporate legal issues" },
    { id: 6, title: "Direct legal guidance", description: "Get clear actionable advice tailored to your business" },
  ];
  const content = (
    <div className={`${embedded ? '' : 'container'} p-4`}>
      {!embedded && (
        <div className="flex flex-col items-center mb-12">
          <span className="px-4 py-1 text-xs font-bold tracking-widest text-blue-400 uppercase bg-white/10 rounded-full mb-4">
            Comparison
          </span>
          <p className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">Attorney vs Lawyer</p>
          <h2 className="text-xl text-blue-200 mt-3">Business law experts, matched fast</h2>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-sr>
        {cards.map((item) => (
          <div
            key={item.id}
            className="group bg-white/10 backdrop-blur-md border border-white/20 shadow-xl text-white p-8 rounded-3xl hover:scale-[1.02] hover:bg-white/20 transition-all duration-300"
          >
            <h3 className="text-xl font-bold mb-3 group-hover:text-blue-300 transition-colors">{item.title}</h3>
            <p className="text-blue-50/80 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col">
        <div className="style"></div>
      </div>
    </div>
  )
  if (embedded) {
    return content
  }
  return (
    <section className="section bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-950 py-24">
      {content}
    </section>
  )
}

export default Cards
