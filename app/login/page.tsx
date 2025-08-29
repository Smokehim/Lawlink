import React from 'react'
import Form from 'next/form'
import { FaGoogle } from 'react-icons/fa'
const Login = () => {
  return (
    <div className='flex justify-center p-7'>
      <Form action="/search" className="flex white  flex-col gap-5 border p-9 rounded-4xl bg-orange-500 border-white">
      <h3 className='text-xl font-bold text-center'>Login</h3>
      <input type="" name="name" className='px-2 placeholder:text-gray-400 bg-white rounded-lg w-60 h-10' placeholder=" Name" />
      <input type="email" className='px-2 placeholder:text-gray-400 bg-white rounded-lg w-60 h-10' name="email" placeholder=" Email" />
      <input type="text" className='px-2 placeholder:text-gray-400 bg-white rounded-lg w-60 h-10' name="name" placeholder=" Phone" />
      <input type="password" className='px-2 placeholder:text-gray-400 bg-white rounded-lg w-60 h-10' name="email" placeholder=" Password" />
      <button type="submit" className='border rounded-2xl bg-orange-500 hover:bg-white hover:border-white cursor-pointer hover:text-black text-white'>Login</button>
      <p className='hover:text-blue-600 text-white text-sm'>forgotten password</p>
      <button type="submit" className='border rounded-2xl bg-orange-500 hover:bg-white hover:border-white cursor-pointer hover:text-black text-white'>Signup</button>
      <div className='gap-2'>
        <p className='text-sm text-white'>Login with</p>
        <div className="flex border-white  cursor-pointer bg-white gap-2 items-baseline border rounded-lg p-1 justify-center">
          <FaGoogle/>
          <p>Google</p>
        </div>
      </div>
     </Form>

    </div>
  )
}

export default Login
