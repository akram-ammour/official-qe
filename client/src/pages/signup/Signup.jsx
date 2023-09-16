import React, { useEffect } from 'react'
import {Footer,Auth} from "../../containers"
import {Navbar} from "../../components"
import "./signup.css"
const Signup = () => {
  useEffect(()=>{
    document.title ="e-qe Sign Up"
  },[])

  return (
    <div className='app__signup'>
        <Navbar/>
        <Auth/>
        <Footer/>
    </div>
  )
}

export default Signup