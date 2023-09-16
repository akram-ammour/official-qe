import React, { useState } from 'react'
import "./errorcomp.css"
import CancelButton from  "./../CancelButton/CancelButton"
const ErrorComp = () => {
    const [isDeleted, SetIsDeleted] = useState(false)
  return (
    <div className='app__errorcomp' style={{marginLeft:isDeleted ? "100px": ""}}>
        <div className="image">
            AA
        </div>
        <div className="box">
            <div className="infos">
                <div className="user">
                    <p>akram ammour</p>
                    <p>2A</p>
                </div>
                <div className="question-infos">
                        s4&gt;anatomie&gt;orl&gt;mai 2023&gt;q14
                </div>
                <div className="time">
                    <p>22:21 26/05/2023</p>
                </div>
            </div>
            <div className="divider"/>
            <div className="message">
                <p>had la question fiha mouchkil mn na7iat anahu kayn muscle wahd li s7i7 li hwa muscle tenseurs du larynx cricothyroidien</p>
            </div>
            <div className="buttons">
            <CancelButton backgroundColor={"#06F"} text='send message'  sendRequest={() =>{
                console.log("hello world")
            }} />
            <CancelButton backgroundColor={"#28AD35"} text='pin' sendRequest={() =>{
                console.log("hello world")
            }} />
            <CancelButton backgroundColor={"#AD2828"} text='delete' sendRequest={() =>{
                console.log("hello world")
                SetIsDeleted(true)
            }} />
            {/* <CancelButton backgroundColor={"#28AD35"}  sendRequest={saveData} />
            <CancelButton backgroundColor={"#AD2828"}  sendRequest={saveData} />

                <>send message</>
                <button>pin</button>
                <button>delete</button> */}
            </div>
        </div>
    </div>
  )
}

export default ErrorComp