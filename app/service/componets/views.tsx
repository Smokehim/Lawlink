import React from 'react'

const Views = () => {
  return (
    <div className='grid lg:grid-cols-4 justify-around bg-gray-200 text-black '>
        <div className="flex border-r p-2 ">

        </div>
        <div className="flex items-center p-2">
            <p className='text-3xl font-bold'>#1</p>
            <div className='p-3 '>
                <p className='text-sm '>
                    most visited legal
                </p>
                <p>
                    information website
                </p>
            </div>
        </div>
        <div className="flex items-center ">
            <p className='text-3xl font-bold'>million1.2M</p>
            <div className='p-3 '>
                <p className='text-sm '>
                    law firms in our
                </p>
                <p>
                    attorney directory
                </p>
            </div>
        </div>
         <div className="flex border-l p-2">

        </div>
    </div>
  )
}

export default Views
