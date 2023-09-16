import React, { useEffect, useState } from 'react';
// import "react-calendar/dist/Calendar.css";
import "./upcomingexam.css";
import PopupBaseComponent from '../popupbasecomponent/PopupBaseComponent';
import Calendar from "react-calendar";
import useAuth from '../../hooks/useAuth';
import CancelButton from '../CancelButton/CancelButton';
import useAxios from '../../hooks/useAxios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const UpcomingExamPopup = ({ onClose,date }) => {
  const {auth,setAuth} = useAuth()



  const axios = useAxios()
  const location = useLocation()
  const navigate = useNavigate()

  const modules = useSelector(state => state.module) 
  const currentSemester =  modules.currentSemester

  const [value, setValue] = useState(() =>{
   const today =  new Date()
   return date ? new Date(date) : today
  });
  const [daysLeft,setDaysLeft] = useState(null)
  const [daysType,setDaysType] = useState(null)

  const formatSQLDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
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
  const changeCalendar = (date) => {
    setValue(date)
    const calculation = calculateDaysSinceAndLeft(date)
    setDaysLeft(calculation.numberOfDays)
    setDaysType(calculation.type)
  };

  useEffect(()=>{
    const calculation = calculateDaysSinceAndLeft(value)
    setDaysLeft(calculation.numberOfDays)
    setDaysType(calculation.type)
  },[])

  function getCurrentSchoolYear() {
    const today = new Date();
    const currentMonth = today.getMonth(); // 0-based index
    const currentYear = today.getFullYear();
    const startYear = currentMonth >= 8 ? currentYear : currentYear - 1; // September is month 8
  
    const endYear = currentMonth <= 7 ? currentYear : currentYear + 1;
  
     return {startYear,endYear}
  
  }
  const resetDate = async () => {
    try{
        const respone = await axios.post("/users/date/reset",{
          id:auth?.Id,
          sem:currentSemester + 1
        })
        if(currentSemester ===0){
          setAuth({...auth,Date1:null})
        }
        if(currentSemester === 1){
          setAuth({...auth,Date2:null})
        }
        setDaysLeft(null)
        setDaysType(null)
        setValue(new Date())
        toast.success("Date successfully reset")
    }
    catch(error){
      if(error?.response?.status === 401){
        navigate("/signin",{state: {from:location},replace:true})
      }
    }
  }
  const saveDate = async () => {
    const today = new Date()
    if(today.getFullYear() === value.getFullYear() && today.getMonth() === value.getMonth() && today.getDay() === value.getDay() ){
      toast.info("select a date that is not today")
      return 
    }
    try{
        const respone = await axios.patch(`/users/date/${auth?.Id}/${currentSemester+ 1}`,{
            date:value
        })
        if(currentSemester ===0){
          setAuth({...auth,Date1:value})
        }
        if(currentSemester === 1){
          setAuth({...auth,Date2:value})
        }
        const calculation = calculateDaysSinceAndLeft(value)
        setDaysLeft(calculation.numberOfDays)
        setDaysType(calculation.type)
        toast.success("Date successfully saved")
    }
    catch(error){
      if(error?.response?.status === 401){
        navigate("/signin",{state: {from:location},replace:true})
    }
    }
  }
  return (
    <PopupBaseComponent title={"Choose a date"} onClose={onClose} color={"#707070"}>
      <div className="app__popupbasecomponent-calendar_container">
        <div className="app__popupbasecomponent-calendar_container-calendar">
          {/* minDate={new Date(`${getCurrentSchoolYear().startYear}-08-01`)} maxDate={new Date(`${getCurrentSchoolYear().endYear}-08-31`)} */}
          <Calendar maxDetail="month" defaultView='month'  minDetail='month' locale="en" minDate={new Date(`${getCurrentSchoolYear().startYear - 1}-08-01`)} maxDate={new Date(`${getCurrentSchoolYear().endYear + 1}-08-31`)} onChange={changeCalendar} value={value} />
          <div className="btns-container">
            <CancelButton backgroundColor='#38194E' text='Save' sendRequest={saveDate}/>
            <CancelButton backgroundColor='#191E4E' text='Reset' sendRequest={resetDate} />
            {/* <button>save</button>
            <button>reset</button> */}
          </div>
        </div>
        <div className="app__popupbasecomponent-calendar_container-daysleft">
          <p className="days">{daysLeft ? daysLeft : "?"}</p>
          <p className="details">{!daysLeft  ? "Select A Date" : daysType === 0 ? "Left" : "Passed"}</p>
        </div>
      </div>
    </PopupBaseComponent>
  );
};

export default UpcomingExamPopup;
