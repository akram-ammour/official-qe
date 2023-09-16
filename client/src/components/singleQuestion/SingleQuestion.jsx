import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Option from "../option/Option";
import { nextQuestion, prevQuestion } from "../../features/questionsSlice";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const SingleQuestion = ({ currentQuestionIndex,currentQuestionId,currentQuestion,setDisplayImage,onSubmit,isDisabled=false,setImage,selectedOptions,mode,modeId }) => {
    const axios = useAxios()
    const {auth} = useAuth()
    const colors = useSelector(state => state.theme)
    const currentColor = colors.Colors[colors.Current].primary 

    const dispatch = useDispatch()
    const ALPHABET = ["A","B","C","D","E","F","G"]

    const [optionsCheck,setOptionCheck] = useState({selectedOptions})
    const [isQuestionDisabled,setISQuestionDisabled] = useState(isDisabled)

    const handleOptionClick = (optionIndex,isChecked) =>{
        setOptionCheck(prev => ({...prev,[optionIndex]:isChecked}))
        // console.log({optionIndex,isChecked})
    }

    const correctQuestion = async () =>{
        setISQuestionDisabled(true)
        // onSubmit({currentQuestionIndex,})
        const submittedOptions = Object.keys(optionsCheck).filter(key => optionsCheck[key] === true).map(option=> Number(option)).sort()
        
        //todo only if it's correct
        const correctOptions = currentQuestion?.Options.filter(option => {
          if(option?.Value === true){
            return option?.Id
          }
        }).map(option => option?.Id).sort()


        const isCorrect = submittedOptions.length === correctOptions.length && submittedOptions.every((value, index) => value === correctOptions[index]);
        if(isCorrect){
        try{
          const response =  await axios.post('/questions/userProgress',{
            mode:mode,
            userId:auth?.Id,
            Stats:[{questionId:currentQuestionId,Options:[...submittedOptions]}],
            modeId:modeId
          })

        }
        catch (error){
          console.log(error)
        }
      }

        
        
        
        //todo submit that on success
        onSubmit({[currentQuestionIndex]:submittedOptions})  
    }

    useEffect(()=>{
      if(currentQuestion?.Image !== null){
        setImage(currentQuestion?.Image)
      }
    },[currentQuestion])
    
    useEffect(()=>{
      setOptionCheck({}) //! in case of an error remove this
      setOptionCheck(selectedOptions)
    },[currentQuestionIndex])

    useEffect(()=>{
      setISQuestionDisabled(isDisabled)
    },[isDisabled])
  return (
    <>
      {currentQuestion?.CasClinique && (
        <div className="app__qcmquestion-container_casclinique">
          {currentQuestion.CasClinique}
        </div>
      )}

      <div className="app__qcmquestion-container_question">
        <p style={{ color: currentColor }}>
          {currentQuestionIndex + 1} - {currentQuestion?.Text}
        </p>

        <div className="app__qcmquestion-container_question-propositions">
          {currentQuestion?.Options.map((option, index) => {
            return (
              <Option
                key={index}
                optionNum={option?.Id}
                Text={`${ALPHABET[index]} - ${option.Choice}`}
                isCorrect={option.Value}
                isChecked={optionsCheck[option?.Id] !== undefined && optionsCheck[option?.Id] === true ? true : false }
                isDisabled={isQuestionDisabled} // set to disabled when 
                onChange={isQuestionDisabled ? null : handleOptionClick}
              />
            );
          })}
        </div>
        <div className="app__qcmquestion-container_question-propositions_btns">
          <button
            style={{ backgroundColor: currentColor }}
            onClick={() => {
              setOptionCheck({})
              dispatch(prevQuestion())
            }}
          >
            <span className="material-symbols-outlined">navigate_before</span>
          </button>

          <button
            onClick={
              isDisabled
                ? null
                // if there is not a single true value don't correct question
                : Object.values(optionsCheck).filter(value => value === true).length === 0
                ? null  
                : correctQuestion
            }
            style={{ backgroundColor: currentColor }}
            className={"app__qcmquestion-content_corrected"}
          >
            Correct
          </button>
          {currentQuestion?.Image && (
            <button
              onClick={() => setDisplayImage(true)}
              style={{ backgroundColor: currentColor }}
            >
              <span className="material-symbols-outlined">photo_library</span>
            </button>
          )}
          <button
            style={{ backgroundColor: currentColor }}
            onClick={() => {
              setOptionCheck({})
              dispatch(nextQuestion())}}
          >
            <span className="material-symbols-outlined">navigate_next</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SingleQuestion;
