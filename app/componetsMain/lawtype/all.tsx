import React from 'react'
import Image from 'next/image'

const cards = [
    {id:1, title:"Find your business legal match", description:"identify the right expertise for you"},
    {id:2, title:"Selecting counsel for your case", description:"Follow the steps to smart choice"}
]
const images =[
    {id:1,image:"/images/9bc7178f-dbcc-4317-9fbe-6474bfcf89f1.jpg", title:"Find your business legal match", description:"identify the right expertise for you"},
    {id:2, image:"/images/9bc7178f-dbcc-4317-9fbe-6474bfcf89f1.jpg", title:"Selecting counsel for your case", description:"Follow the steps to smart choice"}
]

const  All = () => {
  return (
    <div className='flex flex-col p-0 justify-center'>
        <div className="">
            <Image src="/images/9bc7178f-dbcc-4317-9fbe-6474bfcf89f1.jpg"  className='sm:w-500 md:300  rounded' alt="alt" width={500} height={100} />
        </div>
        <h1 className='text-lg'>Attorney vs lawyer whats the difference</h1>
        <p>Clarity roles and qualifications quickly.</p>
        <div className="md:grid-cols-2 sm:grid-cols-1 grid gap-5">
            {
                cards.map((items)=>(
                    <div key={items.id} className='flex flex-col text-center p-4 text-black bg-white rounded-lg'>
                        <h1>{items.title}</h1>
                        <p>{items.description}</p>
                    </div>
                ))
            }
            {
                images.map((items)=>(
                    <div key={items.id} className='flex flex-col  '>
                        <Image src={items.image}  className='sm:w-300 md:300  rounded-xl' alt="alt" width={200} height={100} />
                        <h1>{items.title}</h1>
                        <p>{items.description}</p>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default All