import React from 'react'
import './goal.css'
const Goal = ({ date, name, module, percentage }) => {
    if (percentage > 100) {
        percentage = 100
    }
    const truncateText = (text, maxCharacters) => {
        if (text.length > maxCharacters) {
            return text.substring(0, maxCharacters) + '...';
        }
        return text;
    };
    return (
        <div className='app__goal'>
            <div className="date">
                <p>{date.day}</p>
                <span>{date.month}</span>
            </div>
            <div className="goal">
                <h3 title={name}>{truncateText(name,50)}</h3>
                <span>{module}</span>
                <div className="progressbar">
                    <div className="progress">    
                        <div className="white">
                            <div className="progress" style={{ width: `${percentage}%`, backgroundColor: "#6A6A6A" }} />
                        </div>
                    </div>
                    <span>{percentage}%</span>
                </div>
            </div>
            {/* <div className="white">
            <div className="progress" style={{width:`${percentage}%`,backgroundColor:color}}/>
        </div> */}
        </div>
    )
}

export default Goal