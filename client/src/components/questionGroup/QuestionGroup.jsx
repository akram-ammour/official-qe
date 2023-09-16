import React, { useEffect, useState } from 'react'
import QuestionSkeleton from './QuestionSkeleton'
import { useDispatch, useSelector } from 'react-redux'
import { nextQuestion, prevQuestion } from '../../features/questionsSlice'
import { toast } from 'react-toastify'
import useAuth from '../../hooks/useAuth'
import useAxios from '../../hooks/useAxios'

function deepEqual(obj1, obj2) {
  // Check if the objects are of the same type
  if (typeof obj1 !== typeof obj2) {
    return false;
  }

  // Handle special cases for null and non-object types
  if (obj1 === null || obj2 === null || typeof obj1 !== 'object') {
    return obj1 === obj2;
  }

  // Get the keys of both objects
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Check if the number of keys is the same
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Iterate through keys and recursively compare values
  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}


const QuestionGroup = ({Questions,setDisplayImage,setImage,rootIndex,isDisabled,setGlobalUserAnswers,selectedOptions,mode,modeId}) => {

  const colors = useSelector(state => state.theme)
  const currentColor = colors.Colors[colors.Current].primary 
  
  const axios = useAxios()

  const {auth} = useAuth()

  const dispatch = useDispatch()

  const [groupUserAnswers,setGroupUserAnswers] = useState(selectedOptions)
  const [isGroupDisabled, setIsGroupDisabled] = useState(isDisabled)
  
  useEffect(()=>{
    setIsGroupDisabled(isDisabled)
  },[isDisabled])

  const handleGroup = (i, optionNum, check) => {
    if(!isGroupDisabled){
    setGroupUserAnswers((prev) => {
      if (check) {
        return {
          ...prev,
          [i]: { ...(prev[i] || {}), [optionNum]: check },
        };
      } else {
        const updatedGroup = { ...prev };
        if (updatedGroup[i]) {
          delete updatedGroup[i][optionNum];
          if (Object.keys(updatedGroup[i]).length === 0) {
            delete updatedGroup[i];
          }
        }
        return updatedGroup;
      }
    });
  }
};
  
  const correctGroup = async () => {
    if(Object.keys(groupUserAnswers).length !== Questions.length){
      toast.info('please fill all the questions before correcting')
    }
    else{
      setIsGroupDisabled(true) // disable questions
      //! send usergroupanswers to global answers container
      // the group user answers looks like this {16:{432:true,1341:true}}
      //!send the request first to create useranswers progress and points

      //check if groupUserAnswer === correctQuestionAnswer
      const correctQuestionAnswer = {}
      Questions.forEach((question, index) => {
        const Choices = Object.values(question.Options).filter(choice => choice.Value === true)
        const answers = {}
        Choices.map(choice => {
          answers[choice.Id] = true
        })
        correctQuestionAnswer[Number(rootIndex) + index] = answers
      });
      

    const isCorrect = deepEqual(correctQuestionAnswer,groupUserAnswers)

      //stats like this [{questionId:142,Options:[optionId1,optionId2,optionId3]}]
      if(isCorrect){
        try{
          const Stats = []
          Object.keys(groupUserAnswers).forEach((question, index) => {
            Stats.push({
              questionId:Number(Questions[index].Id),
              Options:Object.keys(groupUserAnswers[question]).filter(key => groupUserAnswers[question][key] === true ).map(key => Number(key))
            })
          })


          const response = await axios.post(`/questions/userProgress`,{
            mode:mode,
            userId:auth?.Id,
            Stats:[...Stats],
            modeId:modeId,
          })
        }
        catch (error){
          console.log(error)
        }
      }

      const questionINdexes = Object.keys(groupUserAnswers).map(quesIndex => Number(quesIndex))
      for (const questionIndex of questionINdexes){
        const transformed = Object.keys(groupUserAnswers[questionIndex]).map(optionIndex => Number(optionIndex))
        setGlobalUserAnswers(prev => ({...prev,[questionIndex]:transformed}))
      }
    }
  }
  useEffect(()=>{
    setGroupUserAnswers({})
    setGroupUserAnswers(selectedOptions)
  },[rootIndex,selectedOptions])




  const handleLastImage = () =>{
    setImage(Questions.at(-1)?.Image)
    setDisplayImage(true)
  }
  return (
    <div className='app__questionGroup'>
      {Questions.map((question,i) => {
      const passedValuesObject = groupUserAnswers[Number(rootIndex) + i];
      const passedValuesArray = passedValuesObject ? Object.values(passedValuesObject).map(key => Number(key)) : [];
        return (
        <QuestionSkeleton currentQuestion={question} currentQuestionIndex={Number(rootIndex) + i} key={i} isLast={question?.Id === Questions.at(-1)?.Id} isDisabled={isGroupDisabled} onChange={handleGroup} questionOptions={passedValuesArray} setDisplayImage={setDisplayImage} setImage={setImage}/>
      ) 
    }
      )}
      <div className="app__qcmquestion-container_question-propositions_btns">
          <button
            style={{ backgroundColor: currentColor }}
            onClick={() => {
              setGroupUserAnswers({})
              dispatch(prevQuestion())}}
          >
            <span className="material-symbols-outlined">navigate_before</span>
          </button>

          <button
            onClick={
              isGroupDisabled
                ? null
                : correctGroup
            }
            style={{ backgroundColor: currentColor }}
            className={"app__qcmquestion-content_corrected"}
          >
            Correct
          </button>
          {Questions.at(-1)?.Image && (
            <button
              onClick={handleLastImage}
              style={{ backgroundColor: currentColor }}
            >
              <span className="material-symbols-outlined">photo_library</span>
            </button>
          )}
          <button
            style={{ backgroundColor: currentColor }}
            onClick={() => {
              setGroupUserAnswers({})
              dispatch(nextQuestion())
            }}
          >
            <span className="material-symbols-outlined">navigate_next</span>
          </button>
        </div>
    </div>
  )
}

export default QuestionGroup
// import React, { useEffect, useState } from "react";
// import SingleQuestion from "../singleQuestion/SingleQuestion";
// import Option from "../option/Option";
// import { useDispatch, useSelector } from "react-redux";
// import { nextQuestion, prevQuestion } from "../../features/questionsSlice";
// import { toast } from "react-toastify";
// const QuestionSkeleton = ({ currentQuestion, currentColor, currentQuestionIndex,isLast,setQuestionGroupSelects,questionGroupSelects,isGroupDisabled,setImage,setDisplayImage,selected=[]}) => {
  
//   const ALPHABET = ["A", "B", "C", "D", "E", "F", "G"];

//   const [optionsCheck,setOptionCheck] = useState({})
//   const [isQuestionDisabled,setISQuestionDisabled] = useState(isGroupDisabled)
//   const [isLoading,setIsLoading] = useState(true)
//     useEffect(()=>{
//       // console.log("this is selected",selected)


//       // if(Object.Keys(questionGroupSelects).length!== 0){
//       //   const res = {}
//       //   const selectedOp = questionGroupSelects[currentQuestionIndex] || []
//       //   if(selectedOp.length === 0 ){
//       //     return
//       //   }
//       //   for (const option of selectedOp){
//       //     res[option] = true
//       //   }
//       //   setOptionCheck(res)
//       // }
      
//       console.log(selected,currentQuestionIndex)
//       console.log('hello world')
//     },[selected,currentQuestionIndex])

//   // useEffect(()=>{
//   //   if(questionGroupSelects[currentQuestionIndex] === undefined) {
//   //     console.log({})
//   //   }
//   //   else{
//   //     console.log(questionGroupSelects[currentQuestionIndex])
//   //   }
//   // },[currentQuestionIndex])


//   const handleOptionClick = (optionIndex,isChecked) =>{
//     setOptionCheck(prev => ({...prev,[optionIndex]:isChecked}))
// }

//   // useEffect(()=>{
//   //   if(selected.length === 0){
//   //     const optionsArray = Object.keys(optionsCheck).filter(key => optionsCheck[key] === true).map(option=> Number(option))
//   //     setQuestionGroupSelects(prev => ({...prev,[currentQuestionIndex]:[...optionsArray]}))
//   //   }
//   // },[optionsCheck])

//   useEffect(()=>{
//     setISQuestionDisabled(isGroupDisabled)
//   },[isGroupDisabled])


//   const handleImage = () => {
//     if(currentQuestion?.Image !== null){
//       setImage(currentQuestion?.Image)
//       setDisplayImage(true)
//     }
//   }

//   return (
//     <>
//       {currentQuestion?.CasClinique && (
//         <div className="app__qcmquestion-container_casclinique" >
//           {currentQuestion.CasClinique}
//         </div>
//       )}

//       <div className="app__qcmquestion-container_question" style={{marginBottom: isLast ? 0 : "4rem"}}>
//         <p style={{ color: currentColor }}>
//           {currentQuestionIndex + 1} - {currentQuestion?.Text}
//         </p>

//         <div className="app__qcmquestion-container_question-propositions">
//           {currentQuestion?.Options.map((option, index) => {
//             return (
//               <Option
//                 key={index}
//                 optionNum={option?.Id}
//                 Text={`${ALPHABET[index]} - ${option.Choice}`}
//                 isCorrect={option.Value}
//                 isChecked={optionsCheck[option?.Id] !== undefined && optionsCheck[option?.Id] === true ? true : false }
//                 isDisabled={
//                   isQuestionDisabled
//               } // set to disabled when
//                 onChange={
//                   isQuestionDisabled ? null : handleOptionClick
//               }
//               />
//             );
//           })}
//         </div>
//         {!isLast && currentQuestion?.Image !== null && (
//         <div className="app__qcmquestion-container_question-propositions_btns">
//           <button
//             onClick={
//               handleImage
//             }
//             style={{ backgroundColor: currentColor }}
//           >
//             <span className="material-symbols-outlined">photo_library</span>
//           </button>
//       </div>
//         )}
//       </div>
//     </>
//   )

// };

// function arrayToObjectWithTrueValue(array) {
//   const resultObject = {};
//   if(array ===undefined) return {}
//   for (const item of array) {
//     resultObject[item] = true;
//   }
//   return resultObject;
// }

// //todo random thought what if there is a 500 error or the server crashes the moment the user answers a cas clinique and instead of sending all the requests :
// //! it only sends two instead of three

// const QuestionGroup = ({ rootQuestion,questionChilds, onSubmit,rootQuestionIndex,isDisabled,setImage,setDisplayImage,selectedOptions }) => {
//   const colors = useSelector(state => state.theme)
//   const currentColor = colors.Colors[colors.Current].primary 

//   const [questionGroupSelects,setQuestionGroupSelects] = useState({})
//   const [isGroupDisabled,setIsGroupDisabled] = useState(isDisabled)

//   const dispatch = useDispatch()
//   // useEffect(()=>{
//   //   console.log("this is group selected",selectedOptions)
//   // },[selectedOptions])
//   // useEffect(()=>{
//   //   console.log(rootQuestionIndex)
//   // },[rootQuestionIndex])


//   useEffect(()=>{
//     setQuestionGroupSelects(selectedOptions)
//   },[rootQuestionIndex])

  
//   useEffect(()=>{
//     setIsGroupDisabled(isDisabled)
//   },[isDisabled])



//   const handleCorrectQuestionGroup = () =>{
//     const hasNotAnsweredAllQuestions = Object.keys(questionGroupSelects).length === 0 || Object.values(questionGroupSelects).find(value => value.length === 0)

//     if(hasNotAnsweredAllQuestions){
//       toast.info("please fill all the questions before correcting")
//       return
//     }

//     setIsGroupDisabled(true)
//     onSubmit(questionGroupSelects)
//   }

//   const handleLastImage = () => {
//     setImage(questionChilds.at(-1)?.Image)
//     setDisplayImage(true)
//   }
//   return (
//     <>
//       <QuestionSkeleton currentColor={currentColor} currentQuestion={rootQuestion} currentQuestionIndex={Number(rootQuestionIndex)} setQuestionGroupSelects={setQuestionGroupSelects} questionGroupSelects={questionGroupSelects} isGroupDisabled={isGroupDisabled} setImage={setImage} setDisplayImage={setDisplayImage} selected={questionGroupSelects[Number(rootQuestionIndex)]}/>

//       {questionChilds.map((child,index)=> (
//         <QuestionSkeleton key={child?.Id} currentQuestion={child} currentQuestionIndex={Number(rootQuestionIndex) + (index + 1)} currentColor={currentColor} isLast={questionChilds.length === (index + 1)} setQuestionGroupSelects={setQuestionGroupSelects} questionGroupSelects={questionGroupSelects} isGroupDisabled={isGroupDisabled} setImage={setImage}
//         setDisplayImage={setDisplayImage} selected={questionGroupSelects[Number(rootQuestionIndex + (index + 1))]}/>
//       ))}
//       <div className="app__qcmquestion-container_question-propositions_btns">
//         <button
//           style={{ backgroundColor: currentColor }}
//           onClick={() => dispatch(prevQuestion())}
//         >
//           <span className="material-symbols-outlined">navigate_before</span>
//         </button>

//         <button
//           onClick={
//             isGroupDisabled
//               ? null
//               : // if there is not a single true value don't correct question
//               // Object.values(optionsCheck).filter((value) => value === true)
//               //     .length === 0
//               null //todo gotta think of a condition here where i only can answer if i ve selected at least one option in all questions
//               ? null
//               : handleCorrectQuestionGroup
//           }
//           style={{ backgroundColor: currentColor }}
//           className={"app__qcmquestion-content_corrected"}
//         >
//           Correct
//         </button>
//         {/* {questionChilds.at(-1)?.Image && ( */}
//         {questionChilds.at(-1)?.Image !== null && (
//           <button
//             onClick={handleLastImage}
//             style={{ backgroundColor: currentColor }}
//           >
//             <span className="material-symbols-outlined">photo_library</span>
//           </button>
//         )}
//         <button
//           style={{ backgroundColor: currentColor }}
//           onClick={() => dispatch(nextQuestion())}
//         >
//           <span className="material-symbols-outlined">navigate_next</span>
//         </button>
//       </div>
//     </>
//   );
// };

// export default QuestionGroup;
