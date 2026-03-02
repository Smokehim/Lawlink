import React from 'react'
import Main from './componets/main'
import Why from './componets/why'
import Article from './componets/article'
import Partners from './componets/partner'
import Navbar from '../componetsMain/navbar'
import { homeColors } from '../interfaces/colors'

const page = () => {
  return (
    // top‑level wrapper applies a background image with a blue/indigo gradient overlay
    <div className="relative min-h-screen">
      {/* background image placed absolutely behind everything */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20" 
        style={{ backgroundImage: "url('/images/thelawofficeofbarryejanay-business-law-10021863_1920.jpg')" }}
      />
      {/* gradient overlay ensures the page keeps home page colors but no orange */}
      <div className={`${homeColors.bgGradient} relative z-10`}> 
        <Navbar />
        <Main />
        <Why />
        <Article />
        <Partners />
      </div>
    </div>
  )
}

export default page
