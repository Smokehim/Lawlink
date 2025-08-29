import React from 'react'

interface TypesOfWords{
    title: string;
    numbers: string;
    description: string
}

const CardFt  = ({title, numbers, description}:TypesOfWords) => {
  return (
    <div className='flex bg-gray-500 flex-col p-9 h-70 border justify-center  border-gray-500 '>
      <h2 className='text-white font-bold text-xl'>{numbers}</h2>
      <h1 className='text-white text-lg'>{title}</h1>
      <p className='text-white text-sm'>{description}</p>
    </div>
  )
}

export default CardFt
