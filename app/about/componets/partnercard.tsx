import React from 'react'
import Image from 'next/image';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';




const PartnerCard = () => {
    const Datas = [
        {id: 1, name:'james', image:'/images/9bc7178f-dbcc-4317-9fbe-6474bfcf89f1.jpg'},
        {id: 2, name:'BRIGHT MWAMBA', image:'/images/9bc7178f-dbcc-4317-9fbe-6474bfcf89f1.jpg'},
        {id: 3, name:'BLOCK', image:'/images/9bc7178f-dbcc-4317-9fbe-6474bfcf89f1.jpg'},
        {id: 4, name:'BRIGHT MWAMBA', image:'/images/9bc7178f-dbcc-4317-9fbe-6474bfcf89f1.jpg'},
         {id: 5, name:'james', image:'/images/9bc7178f-dbcc-4317-9fbe-6474bfcf89f1.jpg'},
        {id: 6, name:'BRIGHT MWAMBA', image:'/images/9bc7178f-dbcc-4317-9fbe-6474bfcf89f1.jpg'},
        {id: 7, name:'BLOCK', image:'/images/9bc7178f-dbcc-4317-9fbe-6474bfcf89f1.jpg'},
        {id: 8, name:'BRIGHT MWAMBA', image:'/images/9bc7178f-dbcc-4317-9fbe-6474bfcf89f1.jpg'},
    
    ]
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
      {
        Datas.map((items)=>(
             <div key={items.id} className='flex flex-col'>
                <Image src={items.image} alt="alt" width={350} height={350} />
                <div className="flex">
                    <h1>{items.name}</h1>
                    <p>PARTNER</p>
                </div>
                <div className="flex">
                    <FaFacebook  className='text-2xl'/>
                    <FaXTwitter className='text-2xl'/>
                     <FaInstagram className='text-2xl'/>
                </div>
            </div>
        ))
      }
    </div>
  )
}

export default PartnerCard
