import React, { useState } from 'react'
import "./signalpopup.css"
import { useSelector } from 'react-redux'


const SignalPopup = ({onClose}) => {
  const colors = useSelector(state => state.theme)
  const currentColor = colors.Colors[colors.Current].primary 
  const [currentTab,setCurrentTab] = useState(0)
  const [signalValue, setSignalValue] = useState()
  return (
    <div className='app__signalpopup' style={{borderColor:currentColor}}>
      <div className="app__signalpopup-pannel" >
        <p style={{color:currentColor}}>Bug Report / Signal</p>
        <span className="material-symbols-rounded" style={{color:currentColor}} onClick={onClose}>close</span>
      </div>
      <div className="app__signalpopup-content">
        <span className='material-symbols-rounded' style={{backgroundColor:currentColor}}>bug_report</span>
        <div className='app__signalpopup-content_text'>
            <p>Helps Us To Improve Our App In Case Of An Issue</p>
            <div className="tabs">
              <span style={{fontWeight:currentTab===0 ? "bold" : "",cursor: "pointer"}} onClick={() => setCurrentTab(0)}>Question Error</span>
              <span>|</span>
              <span style={{fontWeight:currentTab===1 ? "bold" : "",cursor: "pointer"}} onClick={() => setCurrentTab(1)}>App Error</span>
            </div>
            <textarea type="text" value={signalValue}  onChange={e =>setSignalValue(e.target.value)} />
            <button className='send' style={{backgroundColor:currentColor}}>Send</button>
        </div>
      </div>
    </div>
  )
}

export default SignalPopup