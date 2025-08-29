import React from 'react'
import PartnerCard from './partnercard';
const Partners = () => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <p className='text-white'>Why us</p>
        <hr className='text-white w-20' />
      </div>
      <div className='flex justify-center p-5'>
        <PartnerCard/>
      </div>
    </div>
  )
}

export default Partners
