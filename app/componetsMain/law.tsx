import React from 'react'

const Law = () => {
  return (
    <div className='bg-white flex flex-col justify-center p-6 gap-8'>
      <div className=''>
        <h1 className='text-3xl text-center'>Lawlink legal help, simplified</h1>
        <div className='flex justify-center text-center p-'>
            <p className='text-center'>
            Easly connect with he right legal professional for your
            business needs, Understand difference between attorneys 
            and lawyers to make informed choice
            </p>
        </div>
      </div>
      <div className="flex justify-center">
        <button className=' border w-40 h-12 text-center rounded shadow cursor-pointer hover:border-orange-500 hover:text-orange-500'>Connect</button>
      </div>
    </div>
  )
}

export default Law
