import React from 'react'
import Main from './componets/main'
import Why from './componets/why'
import Article from './componets/article'
import Partners from './componets/partner'
import Navbar from '../componetsMain/navbar'
const page = () => {
  return (
    <div>
      <Navbar/>
      <Main/>
      <Why/>
      <Article/>
      <Partners/>
    </div>
  )
}

export default page
