import React from 'react'
import './home.css'
import { SideNav } from '../../../components'
const Home = () => {
  return (
    <div className='app__adminhome'>
      <SideNav activeBtn={0} pageSub="Home">
          {/* container */}
      </SideNav>
    </div>
  )
}

export default Home