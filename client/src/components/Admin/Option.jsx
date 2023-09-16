import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import useAxios from "../../hooks/useAxios";
import "./css/option.css"
import useAuth from "../../hooks/useAuth";

const Option = ({ children,questionId,isLast,optionId,checked,optionIndex,questionIndex,setQuestionOptions}) => {
    const axios = useAxios()
  const {auth} = useAuth()
    //wheter the option isEditable
  const [isEditable, setIsEditable] = useState(false);
  const [disabledCheckbox, setDisabledCheckbox] = useState(true);

  const [currentValue, setCurrentValue] = useState(children);
  const [previousValue, setPreviousValue] = useState("");



  const [currentChecked,setCurrentChecked] = useState(checked)
  const [previousChecked,setPreviousChecked] = useState()

  const location = useLocation();
  const navigate = useNavigate();

  const handleOptionClick = () => {
    setDisabledCheckbox(false)
    setIsEditable(true);
    // setCheckEditable(true);

    setPreviousValue(currentValue);
    setPreviousChecked(currentChecked)
  };

  const handleSave = async () => {
    setIsEditable(false); // no longer editable
    setDisabledCheckbox(true)
    const value = document.querySelector(
      `.editable-content-${optionId}`
    ).textContent;
    setCurrentValue(value); // making the current value comme telle
    if (value !== previousValue || currentChecked !== previousChecked) {
      //send api request
      try {
        const response = await axios.patch(
          `/exams/option/${optionId}`,
          {
            Choice: value,
            Value: currentChecked
          }
        );
        if (response?.data?.status === "success") {
          toast.success(
            `${response?.data?.message} from prev: ${previousChecked ? "✅" : "❎"}:${previousValue} to: ${currentChecked ? "✅" : "❎"}:${value}`
          );
        } 
      } catch (error) {
        console.log(error);
        if (error?.response?.status === 401) {
          navigate("/signin", { state: { from: location }, replace: true });
        }
      }
    }
  };
  
  const handleDelete = async () => {
    // console.log('deleting optionId: ',optionId)
    if(optionIndex === 0) {
      toast.info("You can't delete first option but you can modify it")
      return
    }
    try {
      const response = await axios.delete(
        `/exams/option/${optionId}`
      );
      if (response?.data?.status === "success") {
        toast.success(`${response?.data?.message}`);
        // fetch(); // fetch the options update
        const newOptions = response?.data?.newOptions?.Options
        setQuestionOptions(questionIndex,newOptions)
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.status === 401) {
        navigate("/signin", { state: { from: location }, replace: true });
      }
    }
  };

  const handleClose = () => {
    document.querySelector(`.editable-content-${optionId}`).textContent = previousValue;
    setCurrentValue(previousValue);
    setIsEditable(false);
    setCurrentChecked(previousChecked)
    setDisabledCheckbox(true)
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && e.shiftKey) {
      // Enter key was pressed
      e.preventDefault(); // Prevent the default behavior (line break in contentEditable)
      handleSave();
    } else if (e.keyCode === 27) {
      // Escape key was pressed
      handleClose();
    }
  };
  // const handleCheckDouble = ()=>{
  //   // setCheckEditable(true);
  //   console.log("hello world")
  //   setIsEditable(true);
  //   setDisabledCheckbox(false)
  //   setPreviousValue(currentValue);
  //   setPreviousChecked(currentChecked)
    
  // }
  const handleCheck = (e)=>{
    if(disabledCheckbox) return
    //   console.log("hello world")
    setCurrentChecked(e.target.checked)
    // make the api request to change the option
  }
  const handleAdd =   async () =>{
    // add question after
    if(optionIndex === 4) {
      toast.info("You can't add more than 5 options")
      return
    }
    try {
      const response = await axios.post(
        `/exams/option/question/${questionId}`,{
          Choice:"insert New Option here",
          Value:false
        }
      );
      if (response?.data?.status === "success") {
        toast.success(`${response?.data?.message}`);
        const newOptions = response?.data?.createdOption?.Question?.Options
        setQuestionOptions(questionIndex,newOptions)
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.status === 401) {
        navigate("/signin", { state: { from: location }, replace: true });
      }
    }
  }
  return (
    <div className="option" >
      <div className="checkbox">
        <input type="checkbox" 
        checked={currentChecked} 
        onChange={handleCheck}
        
        disabled={disabledCheckbox} 
        // onDoubleClick={handleCheckDouble} 
        />

        <div
          onKeyDown={handleKeyDown}
          onDoubleClick={handleOptionClick}
          className={`editable-content-${optionId}`}
          
          contentEditable={isEditable}
          suppressContentEditableWarning
          autoFocus
        >
          {currentValue}
        </div>
      </div>
      <div className="btns">
        {isEditable && (
          <>
          {/* updating new value  */}
            <button onClick={handleSave}> 
              <span className="material-symbols-outlined">save</span>
            </button>
            {/* handling cancel */}
            <button onClick={handleClose}>
              <span className="material-symbols-outlined">close</span>
            </button>
          </>
        )}
            {/* handles deleting the option */}
        <button>
          <span className="material-symbols-outlined" onClick={handleDelete}>delete</span>
        </button>
        {isLast && optionIndex < 4 && (
          <button>
              <span className="material-symbols-outlined" onClick={handleAdd}>add</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Option;
