import React, { useState } from 'react'
import "./popupbasecomponent.css"

const PopupBaseComponent = ({ title, showColors = false,onClose, children,color }) => {
    const [makeColorsShow, setMakeColorsShow] = useState(false)

    const handleColors = () =>{
        setMakeColorsShow(prev => !prev)
    }
    return (
        <div className='app__popupbasecomponent'>
            <div className="app__popupbasecomponent-titlepannel">
                <p style={{color:color}}>{title}</p>
                <div className='app__popupbasecomponent-titlepannel_right'>
                    {showColors && (
                        <div className='app__popupbasecomponent-titlepannel_right-color' style={{background:"#7E3737"}} onClick={handleColors}>
                            {makeColorsShow && (

                            <div className="app__popupbasecomponent-titlepannel_right-color_container">
                                <div style={{backgroundColor:"#7E3737"}} /> {/* red grouna  */}
                                <div style={{backgroundColor:"#3974AA"}} /> {/* blue  */}
                                <div style={{backgroundColor:"#377E42"}} /> {/* green */}
                                <div style={{backgroundColor:"#70377E"}} /> {/* purple */}
                                <div style={{backgroundColor:"#303030"}} /> {/* black */}
                                <div style={{backgroundColor:"#E1B519"}} /> {/* yellow */}
                                <div style={{backgroundColor:"#FF8101"}} /> {/* orange */}
                                <div style={{backgroundColor:"#0066FF"}} /> {/* bleu ciel */}
                            </div>
                            )}
                        </div>
                    )}
                    <span className="material-symbols-rounded" style={{color:color}} onClick={onClose}>close</span>
                </div>
            </div>
            <div className="app__popupbasecomponent-content">
                {children}
            </div>
        </div>
    )
}

export default PopupBaseComponent
// //                                 <div style={{backgroundColor:"#7E3737"}} /> {/* red grouna */}
// <div style={{backgroundColor:"#3974AA"}} /> {/* blue  */}
// <div style={{backgroundColor:"#377E42"}} /> {/* green */}
// <div style={{backgroundColor:"#70377E"}} /> {/* yellow */}
// <div style={{backgroundColor:"#303030"}} /> {/* purple */}
// <div style={{backgroundColor:"#E1B519"}} /> {/* black */}
// <div style={{backgroundColor:"#FF8101"}} /> {/* orange */}
// <div style={{backgroundColor:"#0066FF"}} /> {/* bleu ciel */}