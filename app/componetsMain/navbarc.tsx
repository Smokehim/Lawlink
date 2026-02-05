import React from 'react'
import { FaFile } from 'react-icons/fa'; 

const Ncomponets = () => {

    const Legal = [
        {id:1 , title:"Find a lawyer ", description:"Match with a qualified legal profession"},
        {id:2 , title:"Attorney vs Lawyer ", description:"Know the distinction, make informed choices"},
        {id:3 , title:" Legal case",  description:"Search by your specific legal needs"}
    ]
    const business = [
        {id:1 , title:"Corporate Counsel ", description:"Business-focused legal expertise"},
        {id:2 , title:"Contracts ", description:"Draft and review business agreements"},
        {id:3 , title:" Compliance",  description:"Meet all legal business requirement"}
    ]
    const Personal = [
        {id:1 , title:"Family matters ", description:"Guidance for family legal issues"},
        {id:2 , title:"Estate planning ", description:"Protect asset and plan ahead"},
        {id:3 , title:"Injury claims",  description:"Support for personal injury cases"}
    ]
  return (
    <div className="md:flex md:flex-row grid grid-cols-2  bg-white rounded-xl p-2 absolute justify-center w-70 md:w-230">
            <div className="flex flex-col">
                <p>LEGAL GUIDANCE</p>
                {
                    Legal.map((items)=>(
                        <div key={items.id} className='flex flex-row  gap-3 cursor-pointer'>
                            <FaFile className='text-orange-500 text-xl'/>
                            <div className="flex flex-col">
                                <h2 className='text-lg'>{items.title}</h2>
                                <p className='text-gray-400 text-sm'>{items.description}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="flex flex-col">
                <p>Business Law</p>
                {
                    business.map((items)=>(
                        <div key={items.id} className='flex flex-row  gap-3 cursor-pointer'>
                            <FaFile className='text-orange-500 text-xl'/>
                            <div className="flex flex-col">
                                <h2 className='text-lg'>{items.title}</h2>
                                <p className='text-gray-400 text-sm'>{items.description}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="flex flex-col">
                <p>Personal Law</p>
                {
                    Personal.map((items)=>(
                        <div key={items.id} className='flex flex-row  gap-3 cursor-pointer'>
                            <FaFile className='text-orange-500 text-xl'/>
                            <div className="flex flex-col">
                                <h2 className='text-lg'>{items.title}</h2>
                                <p className='text-gray-400 text-sm'>{items.description}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='bg-black text-white p-8 text-left space-y-5 w-100 hidden md:flex' >
                <div>
                    <h1 className='text-4xl'>Find the right legal match</h1>
                    <p className='text-gray-400'>Compare attorneys and lawyers for yor business</p>
                </div>
                <p>Get started</p>
            </div>
        </div>
  )
}

export default Ncomponets
