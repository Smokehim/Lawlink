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
    <div className='flex-col'>
      <div className="flex flex-col items-center p-5 m-5">
        <p className='font-extrabold text-5xl'>ATTORNEY VS LAWYER WHAT`S DIFFERENT</p>
        <h1 className='text-2xl'>Business law experts, matched fast</h1>
      </div>
      <div className="grid grid-cols-2 p-3">
        {
            cards.map((item) => (
                <div className="flex flex-col m-2 gap-4 p-4 bg-white rounded-lg shadow-lg hover:border-amber-600 hover:cursor-pointer " key={item.id}>
                    {/* You can add an icon here if available */}
                    <h2 className="text-lg font-bold mb-2 ">{item.title}</h2>
                    <p className="text-gray-700 mb-1 hover:text-amber-600 hover:text-2xl">{item.description}</p>
                </div>
            ))
        }
      </div>
    </div>
  )
}

export default Cards
