"use client";
import { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import { Shield } from 'lucide-react'
import { useAuth } from '@/app/context/AuthContext'
import Image from 'next/image'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

function Navbar() {
  const [add, setAdd] = useState(false)
  const { user } = useAuth()

  const Adding = () => {
    setAdd((prev) => !prev)
  }

  return (
    <div className='relative'>
      {/* Top info bar - Hidden on mobile */}
      <div className="hidden lg:flex items-center text-gray-300 bg-gray-900 justify-between px-6 py-2 text-xs font-medium tracking-wide">
        <div className="flex items-center space-x-6">
          <span className="flex items-center"><span className="text-blue-400 mr-2">Call:</span> +260-969-591-009</span>
          <span className="flex items-center"><span className="text-blue-400 mr-2">Email:</span> lawlink200@gmail.com</span>
          <span className="flex items-center"><span className="text-blue-400 mr-2">Address:</span> 40 Park Ave, Lusaka</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          <Link href="/help" className="hover:text-white transition-colors">Help</Link>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 shadow-sm flex justify-between items-center px-4 md:px-6 py-4 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="bg-blue-600 p-1.5 rounded-lg group-hover:scale-105 transition-transform">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">LawLink</span>
        </Link>

        {/* Desktop Links - Show on md and up */}
        <div className="hidden lg:flex flex-1 justify-center">
          <ul className="flex text-gray-600 font-medium space-x-6 lg:space-x-8 text-sm">
            <li><Link href='/' className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li><Link href='/service' className="hover:text-blue-600 transition-colors">Services</Link></li>
            <li><Link href='/about' className="hover:text-blue-600 transition-colors">About Us</Link></li>
            <li><Link href='/register/user' className="hover:text-blue-600 transition-colors">Find a Lawyer</Link></li>
            <li><Link href='/register/lawyer' className="hover:text-blue-600 transition-colors">For Lawyers</Link></li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex space-x-3 items-center">
            {user ? (
              <Link
                href='/dash/user'
                className="w-10 h-10 rounded-full overflow-hidden bg-blue-600 relative flex items-center justify-center border-[3px] border-transparent hover:border-blue-200 transition-all shadow-sm"
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
                  className="px-5 py-2 text-sm font-semibold border-2 border-gray-200 text-gray-700 hover:border-blue-600 hover:text-blue-600 rounded-xl transition-all"
                >
                  Login
                </Link>
                <Link
                  href='/register/user'
                  className="px-5 py-2 text-sm font-semibold bg-blue-600 text-white shadow-md shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 rounded-xl transition-all"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={Adding} className="p-2.5 lg:hidden text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
            {add ? <FaTimes className='w-5 h-5' /> : <FaBars className='w-5 h-5' />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown - Absolute positioning prevents pushing content down */}
      {add && (
        <div className="absolute top-full left-0 w-full bg-white z-[100] border-b border-gray-100 shadow-2xl lg:hidden overflow-hidden origin-top animate-in slide-in-from-top-2 flex flex-col">
          <ul className="flex flex-col py-2 px-4 space-y-1">
            <li><Link href='/' onClick={() => setAdd(false)} className='block text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-xl transition-colors font-medium'>Home</Link></li>
            <li><Link href='/service' onClick={() => setAdd(false)} className='block text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-xl transition-colors font-medium'>Services</Link></li>
            <li><Link href='/about' onClick={() => setAdd(false)} className='block text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-xl transition-colors font-medium'>About Us</Link></li>
            <li><Link href='/contact' onClick={() => setAdd(false)} className='block text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-xl transition-colors font-medium'>Contact</Link></li>
            <li><Link href='/help' onClick={() => setAdd(false)} className='block text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-xl transition-colors font-medium'>Help Center</Link></li>
            <li><Link href='/register/user' onClick={() => setAdd(false)} className='block text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-xl transition-colors font-medium'>Find a Lawyer</Link></li>
            <li><Link href='/register/lawyer' onClick={() => setAdd(false)} className='block text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-xl transition-colors font-medium'>For Lawyers</Link></li>
          </ul>
          <div className="p-5 mt-2 bg-gray-50 border-t border-gray-100 flex flex-col gap-3">
            {user ? (
              <Link href='/dash/user' onClick={() => setAdd(false)} className="flex items-center space-x-4 bg-white p-3 rounded-2xl shadow-sm border border-gray-100 active:scale-95 transition-transform">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-blue-600 relative flex items-center justify-center shadow-md">
                  {user.profile_picture ? (
                    <Image
                      src={`${API_BASE}${user.profile_picture}`}
                      alt="Profile"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <span className="text-white text-base font-bold">{user.fullName?.charAt(0).toUpperCase() || 'U'}</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-gray-900">{user.fullName}</span>
                  <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">View Dashboard</span>
                </div>
              </Link>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href='/logins/user'
                  onClick={() => setAdd(false)}
                  className="w-full flex items-center justify-center py-3 border-2 border-gray-200 text-gray-700 bg-white font-semibold rounded-xl active:bg-gray-50 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href='/register/user'
                  onClick={() => setAdd(false)}
                  className="w-full flex items-center justify-center py-3 bg-blue-600 text-white font-semibold rounded-xl active:bg-blue-700 transition-colors shadow-md shadow-blue-200"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
