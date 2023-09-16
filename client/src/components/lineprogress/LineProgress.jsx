import React from 'react'
import "./lineprogress.css"

const LineProgress = ({title,percentage,color}) => {
    if (percentage > 100){
        percentage = 100
    }
    const truncateText = (text, maxCharacters) => {
        if (text.length > maxCharacters) {
            return text.substring(0, maxCharacters) + '...';
        }
        return text;
        };
  return (
    <div className='app__lineprogress'>
        <div className="title_percentage" style={{color:color}}>
            <p title={title}>{truncateText(title,70)}</p>
            <p>{percentage}%</p>
        </div>
        <div className="grey">
            <div className="progress" style={{width:`${percentage}%`,backgroundColor:color}}/>
        </div>
    </div>
  )
}

export default LineProgress