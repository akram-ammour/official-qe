import React, { useEffect, useState } from 'react'
import "./upcomingexam.css"
import useAuth from '../../hooks/useAuth'
import { useDispatch, useSelector } from 'react-redux'
const UpcomingExam = ({onClick}) => {
  const {auth} = useAuth()

  const dispatch = useDispatch()
  const modules = useSelector(state => state.module) 
  const currentSemester =  modules.currentSemester
  const [userSemester,setUserSemester] = useState(1)
  // const currentDate = currentSemester === 0 ? auth?.Date1 : auth?.Date2 
  const currentDate = currentSemester === 0 ? auth?.Date1 : auth?.Date2 

  const getSemester = (Year, semester) => {
    switch (Year) {
      case "FIRST":
        return semester;
      case "SECOND":
        return 2 + semester;
      case "THIRD":
        return 4 + semester;
      case "FOURTH":
        return 6 + semester;
      case "FIFTH":
        return 8 + semester;
      default:
        throw new Error("Invalid year");
    }
  };

  useEffect(()=>{
      if(auth?.Plan){
          setUserSemester(getSemester(auth?.Plan,currentSemester + 1))
      }
  },[auth,currentSemester,dispatch])
  function getCurrentSchoolYear() {
    const today = new Date();
    const currentMonth = today.getMonth(); // 0-based index
    const currentYear = today.getFullYear();
    const startYear = currentMonth >= 8 ? currentYear : currentYear - 1; // September is month 8
  
    const endYear = currentMonth <= 7 ? currentYear : currentYear + 1;
  
    return `${startYear}-${endYear}`;
  
  }
  function calculateDaysSinceAndLeft(date) {
    const today = new Date();
    const targetDate = new Date(date)
    const timeDiff = targetDate - today;
  
    if (timeDiff < 0) {
      const daysPassed = Math.abs(Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1);
      return { numberOfDays: daysPassed, type: 1 }; // Passed days
    } else {
      const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24) + 1);
      return { numberOfDays: daysLeft, type: 0 }; // Left days
    }
  }
  function formatDateToReadable(dateString) {
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', options);
    const day = date.getDate();
    const daySuffix = (day >= 11 && day <= 13) ? 'th' : ['st', 'nd', 'rd', 'th'][day % 10 - 1] || 'th';
    
    return formattedDate.replace(day.toString(), `${day}${daySuffix}`);
  }
  return (
    <div className='app__upcomingexam' title={currentDate ? formatDateToReadable(String(currentDate)) : ''}>
      <div className="app__upcomingexam-pannel">
        <h3>Upcoming Exam</h3>
        <span onClick={onClick} title=''>view more</span>
      </div>
      <div className="app__upcomingexam-container" >
        <div className="app__upcomingexam-container_content">
        <p className="title">exam S{userSemester} {getCurrentSchoolYear()}:</p>
          {!currentDate ? (
            <>
            <p className="days">?</p>
            <p className="infos">Select A Date</p>
            </>
          ):(
            <>
            <p className="days">{calculateDaysSinceAndLeft(currentDate).numberOfDays}</p>
            <p className="infos">{calculateDaysSinceAndLeft(currentDate).type === 0 ? "days left" : "days passed"}</p>
            </>
          )}
          
          
        </div>
      </div>
    </div>
  )
}

export default UpcomingExam