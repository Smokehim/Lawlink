import React from 'react'

const Form = () => {
  return (
    
    <div className='p-9 '>
        <div className=' border p-5 border-orange-500 p-10 rounded-lg shadow-lg bg-orange-500'>
        <h2 className='text-3xl font-bold text-white'>Get contact</h2>
      <form action="/" className='flex flex-col gap-5 text-white'>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" className='border border-white text-black hover:bg-white h-10 rounded-md' />
        <label htmlFor="email">Email</label>
        <input type="email" name="email"   className='border border-white text-black hover:bg-white h-10 rounded-md' />
        <label htmlFor="number">Number</label>
        <input type="text" name="number"   className='border border-white text-black hover:bg-white h-10 rounded-md' />
        <textarea name="message" className='border text-black hover:bg-white border-white rounded-md h-40' cols={30} rows={10} placeholder="Type in your message"></textarea>
        <button type="submit" className='border border-white rounded-md '>Send Message</button>
      </form>
    </div>
    </div>
  )
}

export default Form
