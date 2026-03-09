"use client";
import { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import { Shield } from 'lucide-react'
import { useAuth } from '@/app/context/AuthContext'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const API_BASE = 'http://localhost:3002';
function Navbar() {
  const [add, setAdd] = useState(false)
  const { user } = useAuth()

  const Adding = () => {
    setAdd((iterms) => !iterms)
  }
  return (
    <div className='sticky top-0 z-30   '>
      {/* Top info bar */}
      <div className="hidden lg:flex items-center text-white bg-black justify-between navy px-4 py-2 text-sm">
        <div className="flex items-center gap-6">
          <span>Call: +260-800-123-456</span>
          <span>Email: support@lawlink.example</span>
          <span>Address: 40 Park Ave, Lusaka</ span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/contact" className="underline underline-offset-4 hover:opacity-80">Contact</Link>
          <Link href="/help" className="hover:opacity-80">Help</Link>
        </div>
      </div>
      <nav className="flex justify-between  items-center px-4 py-3 bg-white ">
        <div className="flex items-center space-x-2">
          <Shield className="w-8 h-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-900">LawLink</span>
        </div>
        <div className="hidden lg:flex ">
          <ul className="flex text-gray-900 gap-7">
            <li className='hover:bg-blue-700'><Link href='/'>Home</Link></li>
            <li className='hover:text-blue-700'><Link href='/service'>Services</Link></li>
            <li className='hover:text-blue-700'><Link href='/about'>About Us</Link></li>
            <li className='hover:text-blue-700'><Link href='/contact'>Contact</Link></li>
            <li className='hover:text-blue-700'><Link href='/help'>Help Center</Link></li>
            <li className='hover:text-blue-700'><Link href='/register/user'>Find a Lawyer</Link></li>
            <li className='hover:text-blue-700'><Link href='/register/lawyer'>For Lawyers</Link></li>
          </ul>
        </div>
        <div className="flex items-center gap-2 ">
          <div className=" space-x-4 hidden lg:flex">
            {user ? (
              <Link
                href='/dash/user'
                className="w-10 h-10 rounded-full overflow-hidden bg-blue-600 relative flex items-center justify-center border-2 border-transparent hover:border-blue-600 transition-all"
              >
                {user.profile_picture ? (
                  <Image
                    src={`${API_BASE}${user.profile_picture}`}
                    alt="Profile"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <span className="text-white text-sm font-bold">{user.fullName?.charAt(0).toUpperCase() || 'U'}</span>
                )}
              </Link>
            ) : (
              <>
                <Link
                  href='/logins/user'
                  className="px-6 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  Login
                </Link>
                <Link
                  href='/register/user'
                  className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
          <button onClick={Adding} className='p-2 lg:hidden rounded hover:bg-gray-100'>
            {add ? <FaTimes className='text-xl' /> : <FaBars className='text-xl' />}
          </button>
        </div>
      </nav>
      {add && (
        <div className='flex lg:hidden flex-col bg-white border-t border-gray-200 p-4'>
          <ul className="flex text-2xl flex-col w-full gap-4">
            <li className='text-gray-400 hover:text-black p-2 hover:rounded-lg hover:bg-blue-600 '><Link href='/' onClick={() => setAdd(false)}>Home</Link></li>
            <li className='text-gray-400 p-2 hover:text-black hover:rounded-lg hover:bg-blue-600'><Link href='/service' onClick={() => setAdd(false)}>Services</Link></li>
            <li className='text-gray-400 p-2 hover:text-black hover:rounded-lg  hover:bg-blue-600'><Link href='/about' onClick={() => setAdd(false)}>About Us</Link></li>
            <li className='text-gray-400 p-2 hover:text-black hover:rounded-lg  hover:bg-blue-600'><Link href='/contact' onClick={() => setAdd(false)}>Contact</Link></li>
            <li className='text-gray-400 p-2 hover:text-black hover:rounded-lg hover:bg-blue-600'><Link href='/help' onClick={() => setAdd(false)}>Help Center</Link></li>
            <li className='text-gray-400 p-2 hover:text-black hover:rounded-lg hover:bg-blue-600'><Link href='/register/user' onClick={() => setAdd(false)}>Find a Lawyer</Link></li>
            <li className='text-gray-400 p-2 hover:text-black hover:rounded-lg hover:bg-blue-600'><Link href='/register/lawyer' onClick={() => setAdd(false)}>For Lawyers</Link></li>

          </ul>
          <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-200">
            {user ? (
              <Link href='/dash/user' onClick={() => setAdd(false)} className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-blue-600 relative flex items-center justify-center">
                  {user.profile_picture ? (
                    <Image
                      src={`${API_BASE}${user.profile_picture}`}
                      alt="Profile"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <span className="text-gray-400 text-sm font-bold">{user.fullName?.charAt(0).toUpperCase() || 'U'}</span>
                  )}
                </div>
                <span className="font-semibold text-lg">{user.fullName}</span>
              </Link>
            ) : (
              <>
                <Link
                  href='/logins/user'
                  onClick={() => setAdd(false)}
                  className="px-6 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-center"
                >
                  Login
                </Link>
                <Link
                  href='/register/user'
                  onClick={() => setAdd(false)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar


