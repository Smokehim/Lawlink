import React from 'react'
import Navbar from "../componetsMain/navbar"
import { homeColors } from '../interfaces/colors'
import Footer from '../componetsMain/footer'
const page = () => {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25" 
        // style={{ backgroundImage: "url('/images/joshuaworoniecki-ai-generated-7907777_1920.jpg')" }}
      />
      <div className={`${homeColors.bgGradient} relative z-10 p-10`}> 
        
        <section className="mt-20 text-center">
          <h1 className={`${homeColors.textPrimary} text-5xl font-bold mb-4`}>Help &amp; Support</h1>
          <p className="text-gray-700 max-w-2xl mx-auto">
            If you run into any issues or have questions about how to use LawLink, our support team is ready to assist.
            You can browse the FAQ, send us an email at support@lawlink.example.com, or use the chat widget at the bottom
            of the page. We strive to respond within 24 hours.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  )
}

export default page
