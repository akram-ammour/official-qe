import React, { useEffect, useState } from 'react'
import "./progressnav.css"
import Photo from "../../assets/photo.png"
import { useDispatch } from 'react-redux'
import { setCurrentIndex } from '../../features/questions/questionSlice'
// const data = {
//   username:"akram",
//   myTitle:"Grandmaster",
//   rank:"15/300",
//   title:"My Progress",
//   subtitle:"View your progress by class",

// }
// const data = {
//   username:"akram",
//   myTitle:"Grandmaster",
//   rank:"15/300",
//   isQcm:{
//     nb_of_questions:50
//   },
//   title:"My Progress",
//   subtitle:"View your progress by class",
//   color:"#893A96",
// }
const color = "#893A96"
const isQcm = false
const ProgressNav = () => {
  const dispatch = useDispatch()
  const [toggleMenu,setToggleMenu ] = useState(false)
  
  const questions = []
  for (let nb = 1; nb <= 200; nb++) {
    questions.push(nb)
  }
    // --scrollbar-thumb-color:var(--color-purple-300);
    // --scrollbar-thumb-color--hover:#1F1229ef;


    useEffect(()=>{
      document.documentElement.style.setProperty("--scrollbar-thumb-color",color)
      document.documentElement.style.setProperty("--scrollbar-thumb-color--hover",`${color}ef`)
    },[color])


  const showHideQuestion = ()=>{
    setToggleMenu(prev => !prev)
  }

  return (

    <div className='app__progressnav' >

        <div className="app__progressnav-right">
          {isQcm && (
          <button className="app__progressnav-right_return" ><span className="material-symbols-rounded" style={{color: color }}>arrow_back</span></button>)}
          
          <div className="app__progressnav-right_infos">
            <h3>generalité en anatomie</h3>
            <p>2023 janvier Q24,Q25,Q26,Q27,Q28</p>
          </div>
        
        </div>

        {isQcm && (

            <div className="app__progressnav-middle">
              <div className="app__progressnav-middle_btn" onClick={showHideQuestion}>
                <h1>1 - 50</h1>
                <span className="material-symbols-outlined" style={{color: color }}>arrow_drop_down</span>
              </div>

            
              {toggleMenu && (
                  <div className="app__progressnav-middle_questions scale-up-center" style={{scrollbarColor: `${color}`}}>

                  {questions.map((question,index) =>{
                    
                    return(
                        <div className={`app__progressnav-middle_questions-question `} key={index} onClick={() => dispatch(setCurrentIndex(index))}>
                            {question}
                        </div>)
                  })}

              </div>
            )}

          </div>
        )}

        <div className="app__progressnav-right">

          <div className="app__progressnav-right_rank" style={{backgroundColor: color }}>
            <span className="material-symbols-outlined">award_star</span>
            <p>25/300</p>
          </div>

          <div className="app__progressnav-right_profile">

            <div className="app__progressnav-right_profile-nametitle">
              <h3>hey, akram_am</h3>
              <p>Grandmaster</p>
            </div>

            <img src={Photo} alt=''/>
          
          </div>
        
        </div>
    </div>
  )
}

export default ProgressNav