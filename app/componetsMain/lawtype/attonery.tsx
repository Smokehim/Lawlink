import Image from 'next/image'
import React from 'react'

const Attorney = () => {
    const infor = [
        {id:1, title: "attorney", image:"/images/9bc7178f-dbcc-4317-9fbe-6474bfcf89f1.jpg", description:"Attorney credential: what to verify", explanation:"Check education, licensing, experience"},
        {id:2, title: "attorney", image:"/images/9bc7178f-dbcc-4317-9fbe-6474bfcf89f1.jpg", description:"Legal support for startups",explanation:"Protect your business from day one"},
        {id:3, title: "attorney", image:"/images/9bc7178f-dbcc-4317-9fbe-6474bfcf89f1.jpg", description:"Resolving business disputes", explanation:"Compare mediation, arbitration, litigation"}
    ]
    const cards = [
        {id:1, title:"Lawyer specialties for business needs", description:"Match practice areas to your case"},
        {id:2, title:"Question before hiring a lawyer", description:" clarity fees process and result"}
    ]
  return (
    <div>
      <section className='grid grid-cols-4'>
        {
            infor.map((items)=>(
                <div className="flex flex-col" key={items.id}>
                    <Image src={items.image} alt="alt" width="200" height="200" />
                    <h2>{items.description}</h2>
                    <p>{items.explanation}</p>
                </div>
            ))
        }
        {
            cards.map((items)=>(
                <div className="flex flex-col border bg-gray-100 justify-center text-black" key={items.description}>
                    <h2>{items.title}</h2>
                    <p>{items.description}</p>
                </div>
            ))
        }

      </section>
      <section className='grid grid-cols-3 gap-2'>
        {
            cards.map((items)=>(
                <div className="flex flex-col bg-gray-100 justify-center text-black" key={items.description}>
                    <h2>{items.title}</h2>
                    <p>{items.description}</p>
                </div>
            ))
        }
        {
            infor.map((items)=>(
                <div className="flex flex-col" key={items.id}>
                    <Image src={items.image} alt="alt" width="200" height="200" />
                    <h2>{items.description}</h2>
                    <p>{items.explanation}</p>
                </div>
            ))
        }
      </section>
    </div>
  )
}

export default Attorney
