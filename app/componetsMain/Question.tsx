import React from 'react'

const datas = [
    {id: 1, title:"Attorney vs lawyers: key difference", description:"Attorneys are licensed to present clients in the court and a lawyers are legally trained and can advise but may not always appear in court."},
    {id: 2, title:"Choose the right legal professional.", description:"Define your legal needs, check credentials, and confirm licensing in yor area before selecting a professional"},
    {id: 3, title:"Finding a lawyer for your case", description:"Search by your case type business, family or criminal to connect with a specialist"},
    {id: 4, title:"Preparing to contact a lawyer", description:"Collect relevant documents and a summary of your issue to ensure an efficient consultation"}
]
const Question = () => {
  return (
    <div className=' flex flex-col bg-white text-gray-600 p-3 justify-center gap-7'>
      <p className='text-center'>LEGAL FAQS</p>
      <h1 className='text-xl font-bold text-center'>Your legal questions, answered</h1>
      <p className='text-center'>Get clear, direct answers to common questions. 
        Understand attorney vs lawyer, 
        find the right professional 
        and prepare for your case
      </p>
      {
        datas.map((items)=>(
            <div className="flex space-y-8 flex-col" key={items.id}>
                <div className='flex flex-col md:flex-row gap-6'>
                    <h2 className='text-center'>{items.title}</h2>
                    <p className='text-center'>{items.description}</p>
                </div>
                <hr />
            </div>
        ))
      }
    </div>
  )
}

export default Question
