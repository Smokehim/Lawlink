import React from 'react'
import CardFt from './cardft'
import { homeColors } from '../../interfaces/colors'

const Why = () => {
  return (
    <div className='flex flex-col bg-white p-5'>
      <div className="flex items-center gap-2">
        <p className={`${homeColors.textPrimary}`}>Why us</p>
        <hr className='w-20 border-gray-300' />
      </div>
      <p className={`${homeColors.textPrimary} text-2xl font-bold`}>Why Choose Our Law Platform</p>
      <div className="grid grid-cols-1 gap-9 md:grid-cols-2 lg:grid-cols-3 p-8">
        <CardFt numbers={'01'} description='the best expertise which you would like' title='Experience & Expertise'/>
        <CardFt numbers={'02'} description='We prioritize client privacy and maintain strict confidentiality in
         every case. Your personal and legal 
         information is protected with the highest
          professional and ethical standards.' title='Trust & Confidentiality'/>
        <CardFt numbers={'03'} description='Our platform is
         designed to connect clients with the
          right legal professionals quickly and efficiently. We focus on understanding 
        your needs to provide 
        tailored legal support' title='Client-Centered Approach'/>
      </div>
    </div>
  )
}

export default Why
