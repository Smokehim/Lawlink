"use client";
import  { useState } from 'react'
import { FaBars} from 'react-icons/fa'; 
import Link from 'next/link';
import Ncomponets from './navbarc';
function Navbar (){
  const [add, setAdd] = useState(false)
  const [added, setAdded] = useState(false)
  const List = ()=>{
    setAdded((iterms)=>!iterms)
  }
  const Adding = ()=>{
    setAdd((iterms)=>!iterms)
  }
  return(
    <div className='p-0 bg-orange-500'>
    <nav className="flex justify-between text-white items-baseline p-2  static">
        <h1 className='text-3xl'>Lawlink</h1>
        <div className="hidden md:flex ">
            <ul className="flex text-white gap-7">
                <li onClick={List} className='hover:text-black'>Service</li>
                <li className='hover:text-black'><Link href='/about'>About</Link></li>
                <li className='hover:text-black'><Link href='/service'>Contact</Link></li>
                <li className='hover:text-black'><Link href='/help'>Help</Link></li>
            </ul>
        </div>
        <div className="flex items-center gap-2">
            <button className='border border-white p-3 rounded-lg hover:text-orange-600'>Matchnow</button>
            <FaBars onClick={Adding} className='4xl flex md:hidden '/>
        </div>
    </nav>
    <div className='flex justify-around '>
      { add &&
        <div className="flex md:hidden p-5 ">
        <ul className="flex flex-col text-white gap-7">
            <li onClick={List} className='hover:text-black'>Service</li>
            <li className='hover:text-black'><Link href='/about'>About</Link></li>
            <li className='hover:text-black'><Link href='/service'>Contact</Link></li>
            <li className='hover:text-black'><Link href='/help'>Help</Link></li>
        </ul>
        </div>
       }
       <div className=' flex  lg:flex justify-center'>
       { added &&
        <Ncomponets/>
       }
       </div>
    </div>
   </div> 
  )
}

export default Navbar

     