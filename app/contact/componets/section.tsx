import React from 'react'
import {  FaMailBulk, FaPhone} from 'react-icons/fa'; 
import { FaLocationDot, FaWhatsapp } from 'react-icons/fa6';
import { homeColors } from '../../interfaces/colors'

interface Contact {
  id: number;
  icon: React.ReactNode;
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
    <div className='pt-20 pb-20 flex min-h-screen justify-center items-center bg-white'>
      <div className='w-full max-w-5xl px-4'>
        <div className='flex flex-col items-center gap-10'>
            <div className='text-center'>
              <h2 className={`${homeColors.textPrimary} text-4xl font-bold mb-4`}>Contact Information</h2>
              <p className='text-gray-600 max-w-2xl'>Each of these channels is monitored by our team. Choose the method that works best for you.</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full'>
                {
                    contact.map((item) => (
                        <div key={item.id} className='flex flex-col items-center gap-3 border-2 border-blue-200 p-8 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-lg transition-shadow'>
                            <div className='text-blue-600'>{item.icon}</div>
                            <div className='flex text-center flex-col'>
                                <h2 className={`${homeColors.textPrimary} font-semibold text-lg`}>{item.details}</h2>
                                <p className='text-gray-700 mt-1'>{item.name}</p>
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
