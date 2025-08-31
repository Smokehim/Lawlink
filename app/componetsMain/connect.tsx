import React from 'react'
import { IconType } from 'react-icons'; 
import { FaRecycle, FaMailBulk, FaEnvelope } from 'react-icons/fa'; 
import Image from 'next/image';



const Connect = () => {
    interface CardZ {
            id: number;
            icon: IconType;
            title: string;
            description: string;
        }
    const cards: CardZ[] = [
            {id:1, icon: FaRecycle, title:"Phone", description:"0969591009"},
            {id:2, icon: FaMailBulk, title:"Email", description:"mwambajason2@gmail.com"},
            {id:3, icon: FaEnvelope, title:"Location", description:"Lusaka zambia"},
            
        ];
  return (
    <div className='bg-gray-100 pt-5'>
      <section className='grid p-3 gap-5 grid-cols-1 md:grid-cols-2'>
        <div className="flex flex-col">
            <p>Get In touch</p>
            <h2 className='text-3xl'>Connect with legal expert now</h2>
            <p>contact us for business case support</p>
        </div>
        <div className="flex flex-col">
            {
                cards.map((items)=>(
                    <div key={items.id} className='flex gap-5'>
                        <items.icon className='text-4xl text-orange-600' />
                        <div className="flex flex-col">
                            <p>{items.title}</p>
                            <p>{items.description}</p>
                        </div>
                    </div>
                ))
            }
        </div>
      </section>
      <section>
        <Image src="/images/9bc7178f-dbcc-4317-9fbe-6474bfcf89f1.jpg" alt="alt" width={350} height={350} />
      </section>
    </div>
  )
}

export default Connect
