import React, { useEffect } from 'react'
import "./mod.css"
import { ModuleCard,CustomLabel,ModuleProgressCard } from '../../../components'
import { useDispatch, useSelector } from 'react-redux'
import { update } from '../../../features/viewSlice'
import { useState } from 'react'
import { resetQuestions, setCurrentMode, setCurrentQuestion, setModeId } from '../../../features/questionsSlice'
import useAuth from '../../../hooks/useAuth'
import useAxios from '../../../hooks/useAxios'
import { useLocation, useNavigate } from 'react-router-dom'
const Mod = () => {
  // auth infos
  const {auth,setAuth} = useAuth()
  const userId = auth?.Id

  // axios and react router hooks
  const axios = useAxios()
  const navigate = useNavigate()
  const location = useLocation()
  
  //todo modules
  const dispatch = useDispatch()
  // const modules = useSelector((state) => state.module)
  const modulesRedux = useSelector(state => state.module)
  const modules = modulesRedux.currentSemester === 0 ? modulesRedux.sem1 : modulesRedux.sem2 
  const currentModule = modules[modulesRedux.currentId] 
  
  // const userId = useSelector(state => state.auth).user?.id
  
  const [data,setData] = useState({}) //! courses and exams and stats data
  
  useEffect(() => {
    if(!currentModule?.Title){
      navigate("/dashboard")
      return
    }
    dispatch(update(
      {
        title:currentModule?.Title || "",
        subTitle:"check the information and the qcms regarding this module",
        isQcm:false
      }
    ))
  }, [currentModule])

  const getUserModuleStats = async () =>{
    try {
      const response = await axios.get(`/questions/progress/stats/${userId}?moduleId=${currentModule.Id}`)
    setData({...response.data})
    } catch (err) {
      // console.log(err?)
        if(err?.response?.status === 401){
          navigate("/signin",{state: {from:location},replace:true})
      }
    }
  }

  useEffect(()=>{
    getUserModuleStats()
  // },[currentModule.Id,userId])
  },[currentModule,userId])

  useEffect(()=>{
    dispatch(setCurrentQuestion(0))
    dispatch(resetQuestions())
    dispatch(setCurrentMode(null))
    dispatch(setModeId(null))
  },[])
  // useEffect(()=>{
  //   console.log(data)
  // },[data])
  if(!data){
    return <>Loading</>
  }



  return (
    
    <div className='app__mod'>
      <CustomLabel text={"Status"}/>
      <div className="app__mod-stats">
      {data?.courses && data?.exams &&(<>
      
        <ModuleProgressCard type={0} subtitle={currentModule?.Title || ""} title={"Cours"} score={`${data.courses.data.filter(cours => cours._count.UserCourseProgress === cours._count.Questions).length}/${data.courses.data.length}`} myper={data.courses.stats.user} promoper={data.courses.stats.promo} />
        <ModuleProgressCard type={1} subtitle={currentModule?.Title || ""} title={"Exams"} score={`${data.exams.data.filter(exam => exam._count.UserExamProgress === exam._count.Questions).length}/${data.exams.data.length}`} myper={data.exams.stats.user} promoper={data.exams.stats.promo} />
        <ModuleProgressCard type={2} subtitle={currentModule?.Title || ""} title={"Total"} score={`${data.courses.data.filter(cours => cours._count.UserCourseProgress === cours._count.Questions).length + data.exams.data.filter(exam => exam._count.UserExamProgress === exam._count.Questions).length}/${data.exams.data.length + data.courses.data.length}`} myper={data.totalStats.user} promoper={data.totalStats.promo} />
      
      </>)
        }
      </div>
      <CustomLabel text={"Courses"}/>
      <div className="app__mod-courses">
      {data.courses &&
          data.courses.data.map((course, index) => <ModuleCard key={index} data={course} Type={"COURS"} reset={getUserModuleStats} />)}
     



      </div>
      <CustomLabel text={"Exams"}/>

      <div className="app__mod-exams">
      {data.exams &&
          data.exams.data.filter((exam) => !exam?.isDifferent).map((exam, index) => <ModuleCard key={index} data={exam} Type={"EXAM"} reset={getUserModuleStats}/>)}
      </div>
      {data?.exams?.data?.filter((exam) => exam?.isDifferent).length !== 0 && (
          <>
            <CustomLabel text={"Special Exams"}/>

            <div className="app__mod-exams">
                {data?.exams?.data?.filter((exam) => exam?.isDifferent).map((exam, index) => <ModuleCard key={index} data={exam} Type={"EXAM"} reset={getUserModuleStats}/>)}
            </div>
          </>

        )
      }
      
    </div>
  )
}

export default Mod