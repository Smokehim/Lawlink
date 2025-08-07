import React from 'react'
import { FaBars, FaMailBulk, FaPhone} from 'react-icons/fa'; 
import { IconType } from 'react-icons';
import { FaLocationDot, FaWhatsapp } from 'react-icons/fa6';

interface Contact {
    id: number;
    icon: IconType;
    details: string;
    name: string;
}

const contact : Contact[] =  [
    {id:1, icon:<FaPhone className='text-4xl'/>,details:"Phone Number", name: '123-456-7890', },
    {id:2, icon:<FaMailBulk className='text-4xl'/>,details:"Email", name: 'Mwambajason2@gmail', },
    {id:3, icon:<FaWhatsapp className='text-4xl'/>,details:"Whatsapp", name: '123-456-7890', },
    {id:4, icon:<FaLocationDot className='text-4xl'/>,details:"Our Office", name: 'Lusaka, zambia', },
]
const Section = () => {
  return (
    <div className='pt-9'>
      <div className='flex'>
        <div className='flex flex-col gap-5 '>
            <h2 className='text-3xl font-bold text-center'>Contact Us</h2>
            <p className='text-gray-500 md:p-5 text-center'>We are here to assist you with any legal inquiries or concerns you may have. Reach out to us through the following channels:</p>
            <div className='grid grid-cols-1  text-black md:grid-cols-2 gap-5'>
                {
                    contact.map((item) => (
                        <div key={item.id} className='flex flex-col items-center gap-3'>
                            {item.icon}
                            <div className='flex text-center flex-col'>
                                <h2 className='font-semibold'>{item.details}</h2>
                                <p>{item.name}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
      </div>
    </div>
  )
}

export default Section
