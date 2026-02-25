import React from 'react'
import { homeColors } from '../../interfaces/colors'

const Main = () => {
  return (
    <div className="py-20">
      <div className="flex flex-col gap-5 ">
        <h2 className={`${homeColors.textPrimary} text-3xl font-bold text-center text-6xl`}>About Us</h2>
        <p className="text-gray-600 md:p-5 text-center">
          We are here to assist you with any legal inquiries or concerns you may have. Reach out to us through the following channels:
        </p>
      </div>
    </div>
  )
}

export default Main
