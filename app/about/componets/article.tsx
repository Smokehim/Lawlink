import React from 'react'
import Image from 'next/image'
import { homeColors } from '../../interfaces/colors'

const Article = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 md:justify-center md:p-5 '>
      <div className='p-5'>
        <p className={homeColors.textPrimary}>
            Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Cupiditate,
            necessitatibus alias illum adipisci cum
            qui temporibus. Possimus quod saepe
            consectetur aliquid! Ducimus saepe
            sapiente accusamus maiores vero libero quo!
        </p>
      </div>
      <div className='flex justify-center items-center p-5'>
        <Image src="/images/9bc7178f-dbcc-4317-9fbe-6474bfcf89f1.jpg" alt="about" width={350} height={350} />
      </div>
    </div>
  )
}

export default Article
