import React from 'react'

const Cards = () => {
    interface CardZ {
        id: number;
        icon: string;
        title: string;
        description: string;
    }

    const cards: CardZ[] = [
        {id:1, icon:"", title:"What is an attorney?", description:"Attorneys are licensed to present clients in the court and provides legal counsel for complex business matters"},
        {id:2, icon:"", title:"What is an lawyer?", description:"Lawyers are legally trained and can advise but may not always appear in court."},
        {id:3, icon:"", title:"Match by business case", description:"Connect with the right professional for your specific business needs."},
        {id:4, icon:"", title:"Vetted legal Professionals", description:"All experts are verified for credentials, experience, and professional standards"},
        {id:5, icon:"", title:"Business law focus?", description:"Support for contracts, compliance, and corporate legal issues"},
        {id:6, icon:"", title:"Direct legal guidance", description:"Get clear actionable advice tailored to your business"},
    ];
  return (
    <div>
      <p>ATTORNEY VS LAWYER WHAT`S DIFFERENT</p>
      <h1>Business law experts, matched fast</h1>
      <div className="grid">
        {
            cards.map((item) => (
                <div className="flex flex-col p-4 m-2 bg-white rounded-lg shadow" key={item.id}>
                    {/* You can add an icon here if available */}
                    <h2 className="text-lg font-bold mb-2">{item.title}</h2>
                    <p className="text-gray-700 mb-1">{item.description}</p>
                </div>
            ))
        }
      </div>
    </div>
  )
}

export default Cards
