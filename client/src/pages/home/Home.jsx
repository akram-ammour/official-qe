import React, { useEffect } from 'react'
import {Contact,Footer,Header,Presentation,Subscription,Prices} from "../../containers"
import { Navbar } from '../../components'
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  useEffect(()=>{
    document.title ="e-qe Home"
  },[])

  return (
    <>      
    <Navbar/>
    <Header/>
    <Presentation/>
    <Prices/>
    <Subscription/>
    <Contact/>
    <Footer/>
    </>
  )
}

export default Home