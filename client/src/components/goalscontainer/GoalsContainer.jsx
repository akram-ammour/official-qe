import React from 'react'
import "./goalscontainer.css"
import Goal from '../goal/Goal'

const GoalsContainer = ({showgGoals}) => {
  
  return (
    <div className='app__goalscontainer'>
        <div className="app__goalscontainer-pannel">
            <p>My goals</p>
            <span onClick={showgGoals}>show more</span>
        </div>
        <div className="app__goalsconatiner-goals">
            {/* <Goal date={{day:29,month:"jun"}} percentage={50} name={"Goal 1"} module={"Anatomie 1"}/>
            <Goal date={{day:30,month:"jun"}} percentage={50} name={"Goal 1"} module={"Anatomie 1"}/>
            <Goal date={{day:30,month:"jun"}} percentage={50} name={"Goal 1"} module={"Anatomie 1"}/>
            <Goal date={{day:30,month:"jun"}} percentage={50} name={"Goal 1"} module={"Anatomie 1"}/>
            <Goal date={{day:30,month:"jun"}} percentage={50} name={"Goal 1"} module={"Anatomie 1"}/>
            <Goal date={{day:30,month:"jun"}} percentage={50} name={"Goal 1"} module={"Anatomie 1"}/>
            <Goal date={{day:30,month:"jun"}} percentage={50} name={"Goal 1"} module={"Anatomie 1"}/>
            <Goal date={{day:1,month:"jun"}} percentage={35} name={"Goal 1"} module={"Anatomie 1"}/>
            <Goal date={{day:24,month:"jun"}} percentage={35} name={"Goal 1"} module={"Anatomie 1"}/>
            <Goal date={{day:18,month:"jun"}} percentage={35} name={"Goal 1"} module={"Anatomie 1"}/>
            <Goal date={{day:18,month:"jun"}} percentage={35} name={"Goal 1"} module={"Anatomie 1"}/>
            <Goal date={{day:18,month:"jun"}} percentage={35} name={"Goal 1"} module={"Anatomie 1"}/>
            <Goal date={{day:18,month:"jun"}} percentage={35} name={"Goal 1"} module={"Anatomie 1"}/>
            <Goal date={{day:18,month:"jun"}} percentage={35} name={"Goal 1"} module={"Anatomie 1"}/>
            <Goal date={{day:18,month:"jun"}} percentage={35} name={"Goal 1"} module={"Anatomie 1"}/>
            <Goal date={{day:18,month:"jun"}} percentage={35} name={"Goal 1"} module={"Anatomie 1"}/>
            <Goal date={{day:20,month:"jun"}} percentage={35} name={"finish anatomie 1 and all the modules in concern i guess something like that maybe"} module={"Anatomie 1"}/> */}
            <p className='not-available'>Coming soon...</p>
        </div>
    </div>
  )
}

export default GoalsContainer