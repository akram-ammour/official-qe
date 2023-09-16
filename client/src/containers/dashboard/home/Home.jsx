import React, { useEffect, useState } from 'react'
import "./home.css"
import {useDispatch,useSelector} from "react-redux"
import { update } from '../../../features/viewSlice'


import { 
  ModuleProgress, 
  LineProgress, 
  PopupBaseComponent, 
  QuotesContainer, 
  GoalsContainer,
  UpcomingExam
} from "../../../components"
import { ModulePopup } from '../../../components'
import useAuth from '../../../hooks/useAuth'
import UpcomingExamPopup from '../../../components/upcomingExamPopup/UpcomingExamPopup'

const Home = ({}) => {
  const {auth} = useAuth()
  const view = useSelector((state) => state.view) //? getting the views infos

  //todo redux modules
  const dispatch = useDispatch()
  const modulesRedux = useSelector(state => state.module)
  const modules = modulesRedux.currentSemester === 0 ? modulesRedux.sem1 : modulesRedux.sem2 
  const date = modulesRedux.currentSemester === 0 ? auth?.Date1 : auth?.Date2 
  //! setting the views
  useEffect(() => {
    dispatch(update(
      {
        title:"My Progress",
        subTitle:"view your Progress by class",
        isQcm:false
      }
    ))
  }, [])

    
  const [isModulePopUp, setIsModulePopUp] = useState(false) //? is Module Active
  const [currentPopUp, setcurrentPopUp] = useState(null) // currentModule that is active
  
  // based on .map index i get the module 
  const ShowPopup = (index) => {
    //? scroll to TOP
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
    setIsUpcomingExamPopup(false)
    setIsModulePopUp(true) //? setting the module to active
    setcurrentPopUp(modules[index]) //? which module that is active

  }
  const showUpcomingExam = () => {
    //? scroll to TOP
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
    setIsUpcomingExamPopup(true)
    setIsModulePopUp(false)
    setcurrentPopUp(null)

  }

  // hiding the popup using the close button
  const HidePopup = (index) => {
    setIsUpcomingExamPopup(false)
    setIsModulePopUp(false)
    setcurrentPopUp(null)
  }

  const [isUpcomingExamPopup, setIsUpcomingExamPopup] = useState(false) //? is Module Active
  useEffect(()=>{
    if(isModulePopUp || isUpcomingExamPopup){
      setIsUpcomingExamPopup(false)
      setIsModulePopUp(false)
      setcurrentPopUp(null)
    }
  },[modulesRedux.currentSemester])

  return (
    <div className='app__dashboardhome'>
      <div className="app__dashboardhome-left">
        <div className="app__dashboardhome-left_modules">
          {modules.map((mod, index) => (
            <ModuleProgress key={index} mod={mod} onClick={e => ShowPopup(index)} />
          ))}

        </div>
        <div className="app__dashboardhome-left_quotes">
        <QuotesContainer />
        </div>
      </div>
      <div className="app__dashboardhome-right">
        <div className="app__dashboardhome-right_mygoals">
        <GoalsContainer />
        </div>
        <div className="app__dashboardhome-right_mycalendar">
        <UpcomingExam  onClick={showUpcomingExam} />
        </div>

      </div>
      {isModulePopUp && (
        <ModulePopup onClose={HidePopup} infos={currentPopUp} />
      )}
      {isUpcomingExamPopup && (
        <UpcomingExamPopup onClose={HidePopup} date={date} />
      )}
    </div>
  )
}

export default Home