import React, { useState } from 'react'
import {RiMenu3Line,RiCloseLine} from "react-icons/ri"
import logo from '../../assets/logo.svg'
import "./navbar.css"
import { useNavigate } from 'react-router-dom';
const Menu = () =>(
  <>
  <li><a href="#home">Home</a></li>
  <li><a href="#whatis">what is e-qe?</a></li>
  <li><a href="#prices">Prices</a></li>
  <li><a href="#subscribe">How to subscribe ?</a></li>
  <li><a href="#contact">Contact</a></li>
  </>
)
const Navbar = () => {
  const [toggleMenu,setToggleMenu] = useState(false)
  const navigate = useNavigate();
  return (
    <div className='app__navbar'>
      <div className="app__navbar-links">
        <div className="app__navbar-links_logo" onClick={ev => navigate("/")}>
          <img src={logo}  alt="logo" />
        </div>
        <ul className="app__navbar-links_container">
          <Menu/>
        </ul>
      </div>
      <ul className="app__navbar-sign">
        <li><a onClick={ev => navigate("/signin")}>Sign In</a></li>
        <button onClick={ev => navigate("/signin")}>Sign Up</button>
      </ul>
      <ul className="app__navbar-menu">
      {toggleMenu
        ?<RiCloseLine color='#000' size={27} onClick={() => setToggleMenu(false
          )}/>
        : <RiMenu3Line color='#000' size={27} onClick={() => setToggleMenu(true
          )} />
      }
      {toggleMenu &&(
            <div className="app__navbar-menu_container scale-up-center">
              <ul className="app__navbar-menu_container-links">
                <Menu/>
              </ul>
                <ul className="app__navbar-menu_container-sign">
                  <li><a onClick={ev => navigate("/signin")}>Sign In</a></li>
                  <button onClick={ev => navigate("/signin")}>Sign Up</button>
                </ul>

            </div>
      )}
      </ul>
    </div>
  )
}
export default Navbar
