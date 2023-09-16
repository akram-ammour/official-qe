import React, { useEffect } from 'react'
import {Footer,Auth} from "../../containers"
import {Navbar} from "../../components"
import "./signin.css"
const Signin = () => {
  useEffect(()=>{
    document.title ="e-qe Sign In"
  },[])

  return (
    <div className='app__signin'>
        <Navbar/>
        <Auth signin={true}/>
        <Footer/>
    </div>
  )
}

export default Signin