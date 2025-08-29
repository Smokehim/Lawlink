import React from 'react'
import Image from 'next/image'
const Article = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 md:justify-center md:p-5  '>
      <div className='p-5'>
        <p>
            Lorem ipsum dolor sit, amet consectetur
             adipisicing elit. Cupiditate, 
            necessitatibus alias illum adipisci cum 
            qui temporibus. Possimus quod saepe 
             consectetur aliquid! Ducimus saepe 
             sapiente accusamus maiores vero libero quo!
        </p>
      </div>
       <Image src="/images/9bc7178f-dbcc-4317-9fbe-6474bfcf89f1.jpg" alt="alt" width={350} height={350} />
    </div>
  )
}

export default Article
