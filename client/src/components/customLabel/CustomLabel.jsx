import React from 'react'
import "./customlabel.css"
import { useSelector } from 'react-redux'
const CustomLabel = ({text}) => {
  const colors = useSelector(state => state.theme)
  const currentColor = colors.Colors[colors.Current].primary 
  return (
    <div className='app__customlabel'>
        <div style={{background:currentColor}}/>
        <p>{text}</p>
    </div>
  )
}

export default CustomLabel