import React from 'react'
import { FaFacebook, FaLinkedin } from 'react-icons/fa';
import { FaInstagram, FaXTwitter } from 'react-icons/fa6';
const Footer = () => {
  return (
    <div className='flex flex-col p-5'>
      <section className='grid md:grid-cols-2 sm:grid-cols-2'>
        <div className='flex '>
            <h1>Lwalink</h1>
        </div>
        <div className="grid grid-cols-2  gap-7">
            <ul className='flex flex-col'>
                <li className='cursor-pointer hover:text-orange-500 font-light'>Case</li>
                <li className='cursor-pointer hover:text-orange-500 '>Business</li>
                <li className='cursor-pointer hover:text-orange-500'>Family</li>
                <li className='cursor-pointer hover:text-orange-500'>Criminal</li>
                <li className='cursor-pointer hover:text-orange-500'>Civil</li>
                <li className='cursor-pointer hover:text-orange-500'>Tax</li>
            </ul>
            <ul className='flex flex-col'>
                <li className='cursor-pointer hover:text-orange-500 font-light'>Service</li>
                <li className='cursor-pointer hover:text-orange-500 '>Consult</li>
                <li className='cursor-pointer hover:text-orange-500'>Drafting</li>
                <li className='cursor-pointer hover:text-orange-500'>Review</li>
                <li className='cursor-pointer hover:text-orange-500'>Appears</li>
            </ul>
            <ul className='flex flex-col'>
                <li className='cursor-pointer hover:text-orange-500 font-light'>Resources</li>
                <li className='cursor-pointer hover:text-orange-500 '>Guilds</li>
                <li className='cursor-pointer hover:text-orange-500'>FAQs</li>
                <li className='cursor-pointer hover:text-orange-500'>Glossary</li>
                <li className='cursor-pointer hover:text-orange-500'>Articles</li>
                <li className='cursor-pointer hover:text-orange-500'>Updates</li>
            </ul>
            <ul className='flex flex-col'>
                <li className='cursor-pointer hover:text-orange-500 font-light'>Support</li>
                <li className='cursor-pointer hover:text-orange-500 '>Contact</li>
                <li className='cursor-pointer hover:text-orange-500'>Help</li>
                <li className='cursor-pointer hover:text-orange-500'>Terms</li>
                <li className='cursor-pointer hover:text-orange-500'>Policy</li>
                <li className='cursor-pointer hover:text-orange-500'>Feedback</li>
            </ul>
        </div>
      </section>
      <section className='grid sm:grid-cols-1 md:flex md:flex-row md:justify-between'>
        <button className='border border-orange-500 rounded p-3 bg-orange-500'>connctnow</button>
        <div className='flex gap-5'>
            <FaFacebook className='text-3xl text-white cursor-pointer hover:text-orange-500'/>
            <FaInstagram className='text-3xl text-white cursor-pointer hover:text-orange-500'/>
            <FaXTwitter className='text-3xl text-white cursor-pointer hover:text-orange-500'/>
            <FaLinkedin className='text-3xl text-white cursor-pointer hover:text-orange-500'/>
        </div>
      </section>
    </div>
  )
}

export default Footer
