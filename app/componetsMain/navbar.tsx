"use client";
import  { useState } from 'react'
import { FaBars} from 'react-icons/fa'; 
import Link from 'next/link';
import {Shield} from 'lucide-react'
function Navbar (){
  const [add, setAdd] = useState(false)
  
  const Adding = ()=>{
    setAdd((iterms)=>!iterms)
  }
  return(
    <div className=' bg-white text-gray-900'>
      <nav className="flex justify-between  items-baseline p-2  static">
          <div className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-blue-600" />
             <span className="text-2xl font-bold text-gray-900">LawLink</span>
          </div>
          <div className="hidden md:flex ">
            <ul className="flex text-gray-900 gap-7">
              <li className='hover:bg-blue-700'><Link href='/'>Home</Link></li>
              <li  className='hover:bg-blue-700'><Link href='/service'>Service</Link></li>
              <li className='hover:bg-blue-700'><Link href='/about'>About</Link></li>
              <li className='hover:bg-blue-700'><Link href='/contact'>Contact</Link></li>
              <li className='hover:bg-blue-700'><Link href='/help'>Help</Link></li>
            </ul>
         </div>
         <div className="flex items-center gap-2 ">
            <div className=" space-x-4 hidden md:flex">
              <Link
                href='/logins/user'
                className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                Login
              </Link>
              <Link
                href='/register/user'
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Register
              </Link>
            </div>
            <FaBars onClick={Adding} className='text-xl flex md:hidden hover:text-blue-600 hover:scale-110 transition-all cursor-pointer'/>
        </div>
    </nav>
    {add && (
      <div className='flex md:hidden flex-col bg-white border-t border-gray-200 p-4'>
        <ul className="flex text-2xl flex-col w-full gap-4">
          <li className='text-gray-400 hover:text-black p-2 hover:rounded-lg hover:bg-blue-600 '><Link href='/' onClick={() => setAdd(false)}>Home</Link></li>
          <li  className='text-gray-400 p-2 hover:text-black hover:rounded-lg hover:bg-blue-600'><Link href='/service' onClick={() => setAdd(false)}>Service</Link></li>
          <li className='text-gray-400 p-2 hover:text-black hover:rounded-lg  hover:bg-blue-600'><Link href='/about' onClick={() => setAdd(false)}>About</Link></li>
          <li className='text-gray-400 p-2 hover:text-black hover:rounded-lg  hover:bg-blue-600'><Link href='/contact' onClick={() => setAdd(false)}>Contact</Link></li>
          <li className='text-gray-400 p-2 hover:text-black hover:rounded-lg hover:bg-blue-600'><Link href='/help' onClick={() => setAdd(false)}>Help</Link></li>
          
        </ul>
        <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-200">
            <button
              className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors text-left"
              onClick={() => setAdd(false)}
            >
              <Link
                href='/logins/user'
                
              >
                Login
              </Link>
            </button>
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => setAdd(false)}
            >
              <Link
                href='/register/user'
                
              >
                Register
              </Link>
            </button>
          </div>
      </div>
    )}
   </div> 
  )
}

export default Navbar

     