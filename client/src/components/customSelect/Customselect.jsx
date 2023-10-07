import React, { useState } from 'react'
import './customselect.css'
const Customselect = ({onChange,value,name}) => {
  const [color,setColor] = useState('#00000099')
  const colorStyle = {
    color: color,  // Change the text color here
    border: `3px solid ${color}`,  // Change the border style here
  };
  function changeColor(){
      setColor("#1F1229")
  }
  return (
    <div className='app__customselect'>
      <select className="app__customselect-selectbox" name={name} value={value} onChange={onChange}  onClick={changeColor} style={colorStyle}>
        <option value="">Selectionner une année</option>
        <option value="FIRST">Premiere année</option>
        <option value="SECOND">Deuxieme année</option>
        <option value="THIRD">Troisieme année</option>
        <option value="FOURTH">Quatrieme année</option>
        <option value="FIFTH">Cinquieme année</option>
      </select>
    </div>
  )
}

export default Customselect
