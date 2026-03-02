import React from 'react'
import Section from './componets/section'
import Navbar from '../componetsMain/navbar'
import { homeColors } from '../interfaces/colors'
import Footer from '../componetsMain/footer'

const page = () => {
  return (
    <div>
      <Navbar/>
      <section className='bg-gradient-to-br from-blue-50 to-indigo-100 py-20'>
        <div className="flex flex-col p-5 gap-8 max-w-4xl mx-auto">
          <h1 className={`${homeColors.textPrimary} md:text-7xl sm:text-6xl text-5xl text-center font-bold`}>Get in Touch</h1>
          <div className="flex justify-center">
            <p className={`${homeColors.textPrimary} text-center max-w-2xl text-lg`}>
              Have questions or need legal assistance? Our team is here to help. Reach out and we will get back to you promptly.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <button className='bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-all hover:bg-blue-700 shadow-lg'>
              Send a Message
            </button>
          </div>
        </div>
      </section>
      <Section/>
      <Footer/>
    </div>
  )
}

export default page
