import React, { useEffect, useState } from 'react'
import "./moduleprogress.css"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useSelector } from 'react-redux';
import useAuth from '../../hooks/useAuth';
import useRanking from '../../hooks/useRanking';
import { useLocation, useNavigate } from 'react-router-dom';
// {
//   "Id": 13,
//   "Title": "Physiologie 1",
//   "Icon": "pulmonology",
//   "color": "YELLOW",
//   "percentage": 0
// }
const ModuleProgress = ({mod,onClick}) => {
  // const percentage = mod.percentage
  const {auth} = useAuth()
  const {getSpecificRanking} = useRanking()
  const [moduleRanking,setModuleRanking] = useState()

  const navigate = useNavigate()
  const location = useLocation()
  useEffect(()=>{
    if(!moduleRanking &&  auth?.Id !== undefined && auth?.accessToken){
      getSpecificRanking(auth?.Id,mod?.Id,navigate,location).then(res =>{
        setModuleRanking(res)
      })
    }
  },[moduleRanking,auth?.Id,auth?.accessToken])
  const theme = useSelector(state => state.theme)
  const colors = theme.Colors
  const color = colors[mod.color]
  const percentage = mod.percentage

  function TruncatedText(text, maxLength) {
    const truncatedText = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    return truncatedText
  }

  return (
    <div className='app__moduleprogress' style={{backgroundColor: color.primary}} onClick={onClick}>
      <div className="app__moduleprogress-iconrank">
        <span className="material-symbols-outlined">{mod.Icon}</span>
        <p>#{moduleRanking?.ranking?.userRank || "??"}</p>
      </div>
      <p title={TruncatedText(mod.Title,12) === mod.Title ? null : mod.Title}>{TruncatedText(mod.Title,12)}</p>
       <div className="app__moduleprogress-progress">
              <CircularProgressbar strokeWidth="9"  
                value={percentage}
                text={`${percentage}%`}
                styles={{
                  // Customize the root svg element
                  root: {},
                  // Customize the path, i.e. the "completed progress"
                  path: {
                    // Path color
                    stroke: `${color.secondary}`,
                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: 'round',
                    // Customize transition animation
                    strokeWidth:"10",
                    transition: 'stroke-dashoffset 0.5s ease 0s',
                  },
                  // Customize the circle behind the path, i.e. the "total progress"
                  trail: {
                    // Trail color
                    stroke: "linear-gradient(180deg, #EAEAEA 0%, rgba(234, 234, 234, 0.22) 100%)" ,
                  },
                  // Customize the text
                  text: {
                    // Text color
                    fill: color.secondary,
                    fontFamily: "var(--font-poppins)",
                    fontSize: '14px',
                    fontWeight: "600"
                  },
                }}
              />  
        </div>

    </div>
    
  )
}

export default ModuleProgress
