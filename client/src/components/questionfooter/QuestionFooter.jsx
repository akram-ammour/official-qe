import React from 'react'
import './questionfooter.css'
import { useSelector } from 'react-redux'

const QuestionFooter = ({questionDesc,correction,showForumFunc,showSignalFunc}) => {
  const colors = useSelector(state => state.theme)
  const currentColor = colors.Colors[colors.Current] 
  return (
    <div className='app__questionfooter'>
      <div className="app__questionfooter-component">
        <span className="material-symbols-outlined" style={{backgroundColor:currentColor.ternary,color:currentColor.secondary}}>article</span>
        <p>{questionDesc}</p>
      </div>
      <div className="app__questionfooter-component">
        <span className="material-symbols-rounded" style={{backgroundColor:currentColor.ternary,color:currentColor.secondary}}>check</span>
        <p>{correction}</p>
      </div>
      <div className="app__questionfooter-component" onClick={showForumFunc}>
        <span className="material-symbols-outlined" style={{backgroundColor:currentColor.ternary,color:currentColor.secondary}}>Forum</span>
        <p>Forum</p>
      </div>
      <div className="app__questionfooter-component" onClick={showSignalFunc}>
        <span className="material-symbols-rounded" style={{backgroundColor:currentColor.ternary,color:currentColor.secondary}}>warning</span>
        <p>Signal</p>
      </div>

    </div>
  )
}

export default QuestionFooter