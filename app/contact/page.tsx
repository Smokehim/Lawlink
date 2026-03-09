import React from 'react'
import Section from './componets/section'
import Navbar from '../componetsMain/navbar'
import Footer from '../componetsMain/footer'

const ContactPage = () => {
  return (
    <div className="relative min-h-screen bg-white">
      <Navbar />
      
      <main className="relative z-10 pt-16">
        {/* Banner Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-950 py-32">
          <div className="absolute inset-0 bg-grid-white/[0.05] pointer-events-none"></div>
          <div className="container relative z-10 mx-auto px-4 md:px-8 text-center text-white">
            <span className="px-4 py-1 text-xs font-bold tracking-widest text-blue-400 uppercase bg-white/10 rounded-full mb-6 inline-block">
              Communication
            </span>
            <h1 className="text-4xl md:text-7xl font-extrabold mb-8 tracking-tight leading-tight">
              Let's Start a <br /><span className="text-blue-400">Conversation</span>
            </h1>
            <p className="text-blue-100/80 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
              Have questions about LawLink or need specific legal assistance? Our professional team is standing by to help you navigate your legal journey.
            </p>
          </div>
        </section>

        <section className="relative z-20">
          <Section />
        </section>
      </main>
      
      <Footer />
    </div>
  )
}

export default ContactPage
