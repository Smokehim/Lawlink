import React from 'react'
import Image from 'next/image'
const Heroe = () => {
  return (
    <div className=' sm:flex-col  md:flex-col  lg:grid-cols-2 lg:grid gap-9 p-5 bg-orange-500 '>
      <div className="flex flex-col p-5 gap-5">
        <h1 className='md:text-8xl sm:text-7xl text-5xl text-left text-white'>Lawlink Legal help, Simplified</h1>
        <div className="flex text-left">
            <p className='text-left text-white'>Easily connect with the right legal 
               Professional for the business. Understand attorney vs 
               lawyer distinctions and get matched to the 
                expertise your case demands
            </p>
        </div>
        <div className="flex gap-2">
            <button className='bg-white w-30 h-10 p-2 border rounded-lg hover:text-orange-600 border-white'>Startnow</button>
            <button className='border w-30 h-10 border-white text-white p-2 rounded-lg hover:border-white hover:text-black'>Details</button>
        </div>
      </div>
      <div className="flex  justify-center">
        <Image src="/images/9bc7178f-dbcc-4317-9fbe-6474bfcf89f1.jpg" alt="alt" width={350} height={350} />
      </div>
    </div>
  )
}

export default Heroe
