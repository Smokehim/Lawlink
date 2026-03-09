import React from 'react'
import Main from './componets/main'
import Why from './componets/why'
import Article from './componets/article'
import Partners from './componets/partner'
import Navbar from '../componetsMain/navbar'
import Footer from '../componetsMain/footer'

const AboutPage = () => {
  return (
    <div className="relative min-h-screen bg-white">
      <Navbar />
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-[800px] bg-blue-50/50 rounded-bl-[200px] -z-10 pointer-events-none"></div>
      
      <main className="relative z-10 pt-16">
        <div className="container mx-auto px-4 md:px-8">
          <Main />
        </div>
        
        <div className="bg-slate-50 py-24">
          <div className="container mx-auto px-4 md:px-8">
            <Why />
          </div>
        </div>
        
        <div className="container mx-auto px-4 md:px-8">
          <Article />
        </div>
        
        <div className="bg-white py-24">
          <div className="container mx-auto px-4 md:px-8">
            <Partners />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default AboutPage
