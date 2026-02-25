import React from 'react'
import PartnerCard from './partnercard';
import { homeColors } from '../../interfaces/colors'

const Partners = () => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <p className={`${homeColors.textPrimary}`}>Our Partners</p>
        <hr className='w-20 border-gray-300' />
      </div>
      <div className='flex justify-center p-5'>
        <PartnerCard/>
      </div>
    </div>
  )
}

export default Partners
