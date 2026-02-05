"use client"
// import { useState } from 'react'
import React from 'react'
// import All from './lawtype/all'
import Attorney from './lawtype/attonery'
const Laws = () => {
  // const [click, Clickfunk] = useState(false)
  // function onclick(){
  //   Clickfunk()
  // }
  return (
    <div className='flex flex-col text-white bg-black p-4 text-center gap-3'>
        <h1 className='text-2xl'>Connect with the right legal expert</h1>
      <section className='flex  justify-center'>
        <ul className='flex sm:flex-col md:flex-row gap-4'>
            <li className='cursor-pointer hover:border hover:border-orange-500 hover:rounded p-2 hover:bg-orange-500 hover:roundeded'>All</li>
            <li className='cursor-pointer hover:border hover:border-orange-500 hover:rounded p-2 hover:bg-orange-500 hover:roundeded'>Attorney</li>
            <li className='cursor-pointer hover:border hover:border-orange-500 hover:rounded p-2 hover:bg-orange-500 hover:roundeded'>Lawyers</li>
            <li className='cursor-pointer hover:border hover:border-orange-500 hover:rounded p-2 hover:bg-orange-500 hover:roundeded'>Case Types</li>
        </ul>
      </section>
      {/* <section className='p-0 flex '>
        <All/>
      </section> */}
      <section className='p-0 flex '>
        <Attorney/>
      </section>
    </div>
  )
}

export default Laws
