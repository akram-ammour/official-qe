import React from 'react'
import './header.css'
import module from "../../assets/module.svg"
const Header = () => {
  return (
    <div className='app__header section__padding' id='home'>
      <div className="app__header-content">
        <h1 className='gradient__text'>Track Your Progress and Ace Your Exams with e-QE: Your Ultimate Exam Training Companion.</h1>
        <p>E-QE is a powerful exam training app designed to help users track their progress and achieve their goals. With personalized study plans, comprehensive exam resources, and advanced performance analytics, E-QE makes exam preparation efficient and effective ...</p>
        <a href="#whatis" >Explore</a>
      </div>
      <div className="app__header-image">
        <img src={module} alt="les modules" />
      </div>
    </div>
  )
}

export default Header