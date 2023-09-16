import React from 'react'
import './footer.css'
import logowhite from "../../assets/logowhite.svg"
import facebook from "../../assets/facebook.svg"
import instagram from "../../assets/instagram.svg"
import { Link, useNavigate } from 'react-router-dom'
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  return (
    <div className='app__footer section__padding'>

      <div className="app__footer-nav">
          <div className="app__footer-nav_logo" onClick={ev => navigate("/")}>
            <img src={logowhite}/>
          </div>
          <ul className="app__footer-nav_container">
            <li><a href="#home" onClick={ev => navigate("/")}>Home</a></li>
            <li><a href="#whatis" onClick={ev => navigate("/")}>what is e-qe?</a></li>
            <li><a href="#prices" onClick={ev => navigate("/")}>Prices</a></li>
            <li><a href="#subscribe"onClick={ev => navigate("/")} >How to subscribe ?</a></li>
            <li><a href="#contact" onClick={ev => navigate("/")}>Contact</a></li>
            <li><a href='#' onClick={ev => navigate("/signin")}>Sign In</a></li>
            <li><a href="#" onClick={ev => navigate("/signup")}>Sign Up</a></li>
          </ul>
      </div>
      <div className='app__footer-line'/>
      <p>Copyright © {currentYear} e-qe. All rights reserved</p>
      <a>Terms & conditions</a>
      <div className="app__footer-logo">
        <a href="https://web.facebook.com/people/E-qefmpm/100094241407540/" target='_blank'><img src={facebook}/></a>
        <a href="https://www.instagram.com/eqe.fmpm/" target='_blank'><img src={instagram}/></a>
      </div>
    </div>
  )
}

export default Footer