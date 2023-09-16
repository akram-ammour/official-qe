import React from 'react'
import './signal.css'
import { SideNav } from '../../../components'
import SignalsContainer from '../../../containers/Admin/signals/SignalsContainer'
const Signal = () => {
  return (
    <div className='app__adminsignal'> 
        <SideNav activeBtn={3} pageSub="Signals">
            <SignalsContainer/>
        </SideNav>
    </div>
  )
}

export default Signal