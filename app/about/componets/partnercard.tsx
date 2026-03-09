import React from 'react'
import Image from 'next/image';
import { FaFacebook, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const PartnerCard = () => {
    const Datas = [
        {id: 1, name:'James Mulenga', role: 'Chief Executive Officer', image:'/images/9bc7178f-dbcc-4317-9fbe-6474bfcf89f1.jpg'},
        {id: 2, name:'Bright Mwamba', role: 'Head of Legal Research', image:'/images/9bc7178f-dbcc-4317-9fbe-6474bfcf89f1.jpg'},
        {id: 3, name:'Sarah Kunda', role: 'Operations Director', image:'/images/9bc7178f-dbcc-4317-9fbe-6474bfcf89f1.jpg'},
        {id: 4, name:'Kondwani Phiri', role: 'Founding Partner', image:'/images/9bc7178f-dbcc-4317-9fbe-6474bfcf89f1.jpg'},
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Datas.map((item) => (
                <div key={item.id} className="group relative">
                    {/* Card container */}
                    <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl">
                        {/* Image area */}
                        <div className="relative h-72 overflow-hidden">
                            <Image 
                                src={item.image} 
                                alt={item.name} 
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            
                            {/* Social hover */}
                            <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                <a href="#" className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                                    <FaFacebook />
                                </a>
                                <a href="#" className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                                    <FaLinkedinIn />
                                </a>
                                <a href="#" className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                                    <FaTwitter />
                                </a>
                            </div>
                        </div>
                        
                        {/* Content area */}
                        <div className="p-8 text-center text-gray-900">
                            <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors">{item.name}</h3>
                            <p className="text-blue-600 text-sm font-bold uppercase tracking-widest mt-1 opacity-80">{item.role}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PartnerCard
