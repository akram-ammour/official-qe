import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Option from '../option/Option'

const QuestionSkeleton = ({currentQuestion,currentQuestionIndex,isLast,isDisabled,onChange,questionOptions,setDisplayImage,setImage}) => {
    const colors = useSelector(state => state.theme)
    const currentColor = colors.Colors[colors.Current].primary 
    const ALPHABET = ["A","B","C","D","E","F","G"]

    const [isQuestionDisabled,setIsQuestionDisabled] = useState(isDisabled)

    useEffect(()=>{
        setIsQuestionDisabled(isDisabled)
    },[isDisabled])

    const handleOptionClick = (optionNum,checked) => {
        onChange(currentQuestionIndex,optionNum,checked)
    }
// useEffect(()=>{
//   console.log("questionOptions",questionOptions)
// },[questionOptions])
    //questionOptions is a 100% now an array
    const handleImage = () =>{
      setImage(currentQuestion?.Image)
      setDisplayImage(true)
    }
  return (
    <>
      {currentQuestion?.CasClinique && (
        <div className="app__qcmquestion-container_casclinique">
          {currentQuestion.CasClinique}
        </div>
      )}

      <div className="app__qcmquestion-container_question" style={{marginBottom:!isLast ? "4rem" : "0"}}>
        <p style={{ color: currentColor }}>
          {currentQuestionIndex + 1} - {currentQuestion?.Text}
        </p>

        <div className="app__qcmquestion-container_question-propositions">
          {currentQuestion?.Options.map((option, index) => {
              const optionId = option?.Id;
              
              // Ensure that questionOptions is an array before using .includes()
              const isChecked = Array.isArray(questionOptions) && questionOptions.includes(optionId);
            return (
              <Option
                key={index}
                optionNum={optionId}
                Text={`${ALPHABET[index]} - ${option.Choice}`}
                isCorrect={option.Value}
                // isChecked={optionsCheck[option?.Id] !== undefined && optionsCheck[option?.Id] === true ? true : false }
                // isChecked={questionOptions !== undefined && questionOptions.includes(option?.Id) ? true : false}
                isChecked={isChecked}
                // isDisabled={isQuestionDisabled} // set to disabled when 
                isDisabled={isQuestionDisabled} // set to disabled when 
                // onChange={isQuestionDisabled ? null : handleOptionClick}
                onChange={isQuestionDisabled ? null : handleOptionClick}
              />
            );
          })}
        </div>
        <div className="app__qcmquestion-container_question-propositions_btns">
          {currentQuestion?.Image && !isLast && (
            <button
              onClick={handleImage}
              style={{ backgroundColor: currentColor }}
            >
              <span className="material-symbols-outlined">photo_library</span>
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default QuestionSkeleton