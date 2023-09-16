import React, { useEffect } from 'react'
import "./qcm.css"
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { ProgressSideLay } from '../../../components';
import {Question} from "../../../containers"
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../../../hooks/useAuth';





const Qcm = () => {
    useEffect(()=>{
      document.title ="e-qe Questions"
    },[])

  // --------------------------




  return (

    <div className='app__qcm'>
      {/* do stuff to figure out the id of the sidebar */}
      <ProgressSideLay>
        <Question/>
      </ProgressSideLay>
    </div>
  )
}

export default Qcm