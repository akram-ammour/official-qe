import React from 'react'
import './custominput.css'
const Custominput = ({value, onChange,title,name}) => {

  return (
    <div className='app__custominput'>
      <input name={name} type="text" value={value} onChange={onChange} required/>
      <span>{title}*</span>
    </div>
  )
}

export default Custominput
