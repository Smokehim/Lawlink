import React from 'react'
import { homeColors } from '../../interfaces/colors'

interface TypesOfWords{
    title: string;
    numbers: string;
    description: string
}

const CardFt  = ({title, numbers, description}:TypesOfWords) => {
  return (
    <div className={`flex bg-blue-50 flex-col p-9 h-70 border justify-center border-blue-100`}> 
      <h2 className={`${homeColors.textPrimary} font-bold text-xl`}>{numbers}</h2>
      <h1 className={`${homeColors.textPrimary} text-lg`}>{title}</h1>
      <p className={`${homeColors.textPrimary} text-sm`}>{description}</p>
    </div>
  )
}

export default CardFt
