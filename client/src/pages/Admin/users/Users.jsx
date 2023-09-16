import React from 'react'
import "./users.css"
import { SideNav } from '../../../components'
import UsersContainer from '../../../containers/Admin/users/UsersContainer'
const Users = () => {
  return (
    <div className='app__adminusers'>
      <SideNav activeBtn={2} pageSub="Users">
          <UsersContainer/>

      </SideNav>
    </div>
  )
}

export default Users