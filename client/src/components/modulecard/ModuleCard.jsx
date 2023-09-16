import React from 'react'
import "./modulecard.css"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { update } from '../../features/viewSlice';
import { setQuestions,setCurrentMode, setModeId } from '../../features/questionsSlice';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';



const ModuleCard = ({ isExam = false,data,Type,reset }) => {
  const {auth,setAuth} = useAuth() // auth hook
  const userId = auth?.Id // user Id from auth returns undefined if there is no Id

  const axios = useAxios() // axios with refresh hook
  const location = useLocation() // location nav hook

  const dispatch = useDispatch()
  const navigate = useNavigate()

  //? current Module Color
  const colors = useSelector(state => state.theme)
  const currentColor = colors.Colors[colors.Current].primary 

  //todo here module 
  // const modules = useSelector(state => state.module)
  const modulesRedux = useSelector(state => state.module)
  const modules = modulesRedux.currentSemester === 0 ? modulesRedux.sem1 : modulesRedux.sem2 
  const Icon = modules[modulesRedux.currentId]?.Icon 
  // const userId = useSelector(state => state.auth).user?.id 

  //? modeId like course or exam id 
  let Id = data?.Id 

  //? set the percentage based on module or cours data
  const percentage = Type === "COURS" ? Math.trunc((data._count.UserCourseProgress/data._count.Questions) * 100) : Math.trunc((data._count.UserExamProgress/data._count.Questions) * 100)
  
  // truncating text like ( maladie infectieuse... )
  const truncateText = (text, maxCharacters) => {
    if (text.length > maxCharacters) {
      return text.substring(0, maxCharacters) + '...';
    }
    return text;
  };


  const sendReset = async () =>{
    try {
      const response = await axios.post("/questions/progress/reset",{
        mode:Type,
        userId:userId,
        modeId:Id
      })
    } catch (error) {
      console.log(error)
      if(error?.response?.status === 401){
        navigate("/signin",{state: {from:location},replace:true})
    }
    }
    try {
      const response = await axios.post("/questions/answers/reset",{
        mode:Type,
        userId:userId,
        modeId:Id
      })
    } catch (error) {
      console.log(error)
      if(error?.response?.status === 401){
        navigate("/signin",{state: {from:location},replace:true})
    }
    }
  }

  const handleReset = async (e) => {

    //? prevent action
    e.stopPropagation();

    // console.log("reset click");
    await sendReset() //? sending the reset request
    await reset() //! resetting the interface data so like fetching data again

  }

  
  const handleBoxClicked = () => {
    //? Changing the navbar View
    const isDifferent = data?.isDifferent
    if(!isDifferent){
      dispatch(update({
        title:data?.title || `${data.Year} ${data.Session}` ,
        subTitle:"available questions",
        isQcm:true
      }))
    }
    else{
      dispatch(update({
        title:data?.Title ,
        subTitle:"available questions",
        isQcm:true
      })) 
    }

    //! i ve implemented the mode and the id for the fetching of the data wether to fetch from course or exam

    // setting the current Mode of the questions
    dispatch(setCurrentMode(Type))
    // setting the current ModeId 
    dispatch(setModeId(Id))

    const mode = Type === "COURS" ? "course" : "exam" // the mode

    const BaseUrl = `/questions/${Id}/${mode}` // the base url for fetching data
    
    axios.get(BaseUrl).
    then(res => {
      // setting the questions
      dispatch(setQuestions(res.data))
    })
    .catch(err => {
      console.log(err)
      if(err?.response?.status === 401){
        navigate("/signin",{state: {from:location},replace:true})
    }
    })
    navigate('/question')
  }
  




  return (
    <div className='app__modulecard' onClick={handleBoxClicked} >
      <div className="app__modulecard-top">
        <div className="app__modulecard-top_icon" style={{backgroundColor: currentColor}}>
          <span className="material-symbols-outlined">{Icon}</span>
        </div>
        <div className="app__modulecard-top_reset" onClick={handleReset}>
          <span className="material-symbols-outlined ">restart_alt</span>
        </div>
      </div>
      <div className="app__modulecard-center" title={Type === 'COURS' ? data?.title : `${data?.Year} ${data?.Session}`} >
        {data?.isDifferent ? 
        (
          <>
          <p className='app__modulecard-center_specialexamtitle' >{truncateText(data?.Title, 70)}</p>
          <p className='app__modulecard-center_specialsubtitle'>{data?.Year} {data?.Session}</p>
        </>

        ) 
        : Type === 'COURS'
          ? <p className='app__modulecard-center_coursetitle' >
            {truncateText(data?.title, 70)}
          </p>
          : (
            <>
              <p className='app__modulecard-center_examtitle'>{data?.Year}</p>
              <p className='app__modulecard-center_examsubtitle'>{data?.Session === "N" ? "Normal" :data?.Session === "R" ? "Rattrapage" : "Exceptionnelle"}</p>
            </>
          )
        }
      </div>
      <div className="app__modulecard-bottom">
        <p>{Type === "COURS" ? data._count.UserCourseProgress : data._count.UserExamProgress } out of {data._count.Questions}</p>
        <div className="app_modulecard-bottom_progress">
          <CircularProgressbar strokeWidth="9" className='app_modulecard-bottom_progress-circular'
            value={percentage}
            text={`${percentage}%`}
            styles={{
              // Customize the root svg element
              root: {},
              // Customize the path, i.e. the "completed progress"
              path: {
                // Path color
                stroke: currentColor,
                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: 'round',
                // Customize transition animation
                strokeWidth: "10",
                transition: 'stroke-dashoffset 0.5s ease 0s',
              },
              // Customize the circle behind the path, i.e. the "total progress"
              trail: {
                // Trail color
                stroke: "#33313D",
              },
              // Customize the text
              text: {
                // Text color
                fill: "white",
                fontFamily: "var(--font-poppins)",
                fontSize: '30px',
                fontWeight: "600"
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ModuleCard