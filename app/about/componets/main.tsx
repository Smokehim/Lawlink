import React from 'react'

const Main = () => {
  return (
    <div className="py-20 flex flex-col items-center text-center">
      <div className="max-w-3xl">
        <span className="px-4 py-1 text-xs font-bold tracking-widest text-blue-600 uppercase bg-blue-100 rounded-full mb-6 inline-block">
          Our Story
        </span>
        <h1 className="text-4xl md:text-7xl font-extrabold text-gray-900 mb-8 tracking-tight leading-tight">
          Empowering Justice through <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Innovation</span>
        </h1>
        <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
          LawLink was founded on a simple belief: finding legal help shouldn't be a struggle. We're building the bridge between top legal expertise and those who need it most.
        </p>
      </div>
    </div>
  )
}

export default Main
