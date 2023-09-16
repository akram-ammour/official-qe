import React, { useEffect } from 'react'
import "./main.css"
import {ProgressSideLay} from"../../../components"
import {Home} from "../../../containers/"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Main = () => {
  // const navigate = useNavigate()
  // const user = useSelector((state) => state.auth.user);
  // const dispatch = useDispatch();



  useEffect(()=>{
    document.title ="e-qe Dashboard"
  },[])
  return (
    <div className='app__dashboard'>
        <ProgressSideLay>
          <Home/>
        </ProgressSideLay>
    </div>
  )
}

export default Main