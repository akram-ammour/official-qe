import React from 'react'
import "./info.css"

const Info = ({icon,title,text}) => {
  return (
    <div className='app__info'>
        <div className="app__info-image"><img src={icon}/></div>
        <h1>{title}</h1>
        <p>{text}</p>
    </div>
  )
}

export default Info