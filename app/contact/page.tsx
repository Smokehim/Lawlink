import React from 'react'
import Section from './componets/section'
const page = () => {
  return (
    <div>
      <section className='bg-orange-500 '>
        <div className="flex flex-col p-5 gap-5">
        <h1 className='md:text-8xl sm:text-7xl text-5xl text-center text-white'>CONTACT</h1>
        <div className="flex justify-center">
            <p className='text-right text-white'>
              Easily connect with the right legal 
              Professional for your right legal needs. 
            </p>
        </div>
        <div className="flex justify-center gap-2">
            <button className='bg-white w-30 h-10 p-2 border rounded-lg hover:text-orange-600 border-white'>Startnow</button>
            <button className='border w-30 h-10 border-white text-white p-2 rounded-lg hover:border-white hover:text-black'>Details</button>
        </div>
      </div>
      </section>
          <Section/>
    </div>
  )
}

export default page
