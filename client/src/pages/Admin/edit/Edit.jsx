import React from 'react'
import "./edit.css"
import {SideNav} from  "../../../components/index"
import { Edit as EditContainer } from '../../../containers'
const Edit = () => {
  return (
    <div className='app__adminEdit'>
        <SideNav activeBtn={1} pageSub="Exam">
            <EditContainer/>
        </SideNav>
    </div>
  )
}

export default Edit