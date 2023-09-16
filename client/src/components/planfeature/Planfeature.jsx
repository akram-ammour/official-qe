import React from 'react'
import './planfeature.css'
import bullet from '../../assets/bullet.svg'
const Planfeature = ({Feature}) => {
  return (
    <div className='app__planfeature'>
      <div className='app__planfeature-bullet'><img src={bullet}/></div>
      <p>{Feature}</p>
    </div>
  )
}

export default Planfeature