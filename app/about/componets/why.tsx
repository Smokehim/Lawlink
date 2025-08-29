import React from 'react'
import CardFt from './cardft'
const Why = () => {
  return (
    <div className='flex flex-col bg-black p-5'>
      <div className="flex items-center gap-2">
        <p className='text-white'>Why us</p>
        <hr className='text-white w-20' />
      </div>
      <p className='text-2xl text-white font-bold'>Why Choose Our Law Platform</p>
      <div className="grid grid-cols-1 gap-9 md:grid-cols-2 lg:grid-cols-3 p-8"> 
        <CardFt numbers={'01'} description='the best expertise which you would like' title='Experience & Expertise'/>
        <CardFt numbers={'02'} description='the best expertise which you would like' title='Experience & Expertise'/>
        <CardFt numbers={'03'} description='the best expertise which you would like' title='Experience & Expertise'/>
      </div>
    </div>
  )
}

export default Why
