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
    <div className='p-0 bg-white text-gray-900'>
    <nav className="flex justify-between  items-baseline p-2  static">
        <div className="flex items-center space-x-2">
          <Shield className="w-8 h-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-900">LawLink</span>
        </div>
        <div className="hidden md:flex ">
            <ul className="flex text-gray-900 gap-7">
                <li className='hover:text-black'><Link href='/'>Home</Link></li>
                <li  className='hover:text-black'><Link href='/service'>Service</Link></li>
                <li className='hover:text-black'><Link href='/about'>About</Link></li>
                <li className='hover:text-black'><Link href='/contact'>Contact</Link></li>
                <li className='hover:text-black'><Link href='/help'>Help</Link></li>
            </ul>
        </div>
        <div className="flex items-center gap-2 ">
          <div className=" space-x-4 hidden md:flex">
              <button
                // onClick={() => onNavigate('client-login')}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                Login
              </button>
              <button
                // onClick={() => onNavigate('client-register')}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Register
              </button>
            </div>
            <FaBars onClick={Adding} className='4xl flex md:hidden '/>
        </div>
    </nav>
    <div className='flex justify-around '>
      <div className="flex md:hidden p-5 ">
        <ul className="flex flex-col text-white gap-7">
            <li className='hover:text-black'><Link href='/'>Home</Link></li>
            <li  className='hover:text-black'>Service</li>
            <li className='hover:text-black'><Link href='/about'>About</Link></li>
            <li className='hover:text-black'><Link href='/contact'>Contact</Link></li>
            <li className='hover:text-black'><Link href='/service'>Help</Link></li>
        </ul>
      </div> 
    </div>
   </div> 
  )
}

export default Navbar

     