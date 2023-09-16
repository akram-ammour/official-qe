import React from 'react'
import "./moduleprogresscard.css"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useSelector } from 'react-redux';

const ModuleProgressCard = ({type= 0,subtitle,title,score,myper,promoper}) => {
  const colors = useSelector(state => state.theme)
  const currentColor = colors.Colors[colors.Current].primary === "#303030" ? "gray" : colors.Colors[colors.Current].primary
    let icon;
    switch (type) {
        case 0:
            icon = "menu_book"
            break;
    
        case 1:
            icon = "article"
            break;
    
        case 2:
            icon = "functions"
            break;
    
        default:
            break;
    }
    const truncateText = (text, maxCharacters) => {
      if (text.length > maxCharacters) {
        return text.substring(0, maxCharacters) + '...';
      }
      return text;
    };
  return (
    <div className='app__moduleprogresscard'>
        <span className='material-symbols-outlined'>{icon}</span>
        <div className="app__moduleprogresscard-text">
            <p className='app__moduleprogresscard-text_sub' title={subtitle}>{truncateText(subtitle,20)}</p>
            <h1 className='app__moduleprogresscard-text_title'>{title}</h1>
            <p className='app__moduleprogresscard-text_score' style={{color:currentColor}}> Score : {score}</p>
        </div>
        <div className="app__moduleprogresscard-progress">
            <div className="app__moduleprogresscard-progress-promoprogress">
            <CircularProgressbar strokeWidth="9"  
                value={promoper}
                text={`${promoper}%`}
                styles={{
                  // Customize the root svg element
                  root: {},
                  // Customize the path, i.e. the "completed progress"
                  path: {
                    // Path color
                    stroke: `white`,
                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: 'round',
                    // Customize transition animation
                    strokeWidth:"10",
                    transition: 'stroke-dashoffset 0.5s ease 0s',
                  },
                  // Customize the circle behind the path, i.e. the "total progress"
                  trail: {
                    // Trail color
                    stroke: "#33374C" ,
                  },
                  // Customize the text
                  text: {
                    // Text color
                    fill: "white",
                    fontFamily: "var(--font-poppins)",
                    fontSize: '30px',
                    fontWeight: "600"
                  },
                }}
              />  
            </div>
            <div className="app__moduleprogresscard-progress-myprogress">
            <CircularProgressbar strokeWidth="9"  
                value={myper}
                text={`${myper}%`}
                styles={{
                  // Customize the root svg element
                  root: {},
                  // Customize the path, i.e. the "completed progress"
                  path: {
                    // Path color
                    stroke: currentColor,
                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: 'round',
                    // Customize transition animation
                    strokeWidth:"10",
                    transition: 'stroke-dashoffset 0.5s ease 0s',
                  },
                  // Customize the circle behind the path, i.e. the "total progress"
                  trail: {
                    // Trail color
                    stroke: "#33374C" ,
                  },
                  // Customize the text
                  text: {
                    // Text color
                    fill: "white",
                    fontFamily: "var(--font-poppins)",
                    fontSize: '30px',
                    fontWeight: "600"
                  },
                }}
              />  
            </div>
        </div>
    </div>
  )
}

export default ModuleProgressCard