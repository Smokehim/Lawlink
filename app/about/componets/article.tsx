import React from 'react'
import Image from 'next/image'
import { homeColors } from '../../interfaces/colors'

const Article = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 md:justify-center md:p-5 '>
      <div className='p-5 text-center flex flex-col justify-center'>
        <p className={homeColors.textPrimary}>
            We are dedicated to simplifying access
             to legal services by connecting individuals and businesses with
              trusted legal professionals. Our platform
               was created to remove barriers, reduce 
               uncertainty, and ensure that everyone
             can receive the legal support they deserve.
             We believe justice should be accessible, t
             ransparent, and efficient. By combining 
             technology with professional legal expertise, 
             we provide a secure environment where clients 
             can confidently seek guidance and 
             representation.
        </p>
      </div>
      <div className='flex justify-center items-center  p-5'>
        <Image src="/images/stutu.jpg" alt="about" className="rounded-xl shadow-3xl" width={500} height={500} />
      </div>
    </div>
  )
}

export default Article
