import React, { useEffect, useState } from 'react'
import "./question.css"
import { Option,QuestionFooter, SignalPopup } from "../../../components"
import { useDispatch, useSelector } from 'react-redux'

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from 'react-router-dom'
import { nextQuestion, prevQuestion } from '../../../features/questionsSlice'
import useAuth from '../../../hooks/useAuth'
import useAxios from '../../../hooks/useAxios'
import CommentsList from '../../../components/comments/CommentsList'
import SingleQuestion from '../../../components/singleQuestion/SingleQuestion';
import QuestionGroup from '../../../components/questionGroup/QuestionGroup';

function arrayToObjectWithTrueValue(array) {
  const resultObject = {};
  
  for (const item of array) {
    resultObject[item] = true;
  }
  
  return resultObject;
}

// todo figure out how to handle states with api requests since it returns an error if request is taking ms longer
const Question = () => {

  //! axios hook
  const axios = useAxios()
  
  //! auth hook
  const {auth} = useAuth()
  const user = auth?.Id
  
  // helpers
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()



  
  // getting the question data 
  const {currentQuestionIndex,Questions,mode,modeId} = useSelector(state => state.questions)
  const currentQuestion = Questions[currentQuestionIndex]
  const hasChildren = currentQuestion?.Children.length >=1
  const hasParent = currentQuestion?.ParentId !== null;
  // logic might be to  
  const [userSelects, setUserSelects] = useState({})
  // {questionId:[...optionId]}


  useEffect(()=>{
    const fetchUserAnswers = async ()=>{
      try {
        const Base_URL = `/questions/answers?mode=${mode}&userId=${user}&modeId=${modeId}`
        const response = await axios.get(Base_URL)
        for (const answer of response.data){
          const ids = Object.values(answer?.Choices).map(choice => Number(choice?.Id))
          const QuestionOrderIndex = Questions.findIndex(value => Number(value?.Id) === Number(answer?.questionId));
          setUserSelects(prev => ({...prev,[QuestionOrderIndex]:[...ids]}))
        }
        // console.log(userSelects)
      } catch (err) {
        console.log(err)
        if(err?.response?.status === 401){
          navigate("/signin",{state: {from:location},replace:true})
      }
      }
    }
    Questions.length !== 0 && fetchUserAnswers()
  },[Questions,mode,modeId])

  //   useEffect(()=>{
//     const fetchUserAnswers = async ()=>{
//       try {
//         const Base_URL = `/questions/answers?mode=${mode}&userId=${user}&modeId=${modeId}`
//         const response = await axios.get(Base_URL)
//         // per question 

//         // const questionAnswers = currentQuestion.Options
//         // const userAnswers = (response.data).filter(question => question.questionId ===currentQuestion.Id)?.first?.Choices
//         // if (userAnswers){
//         //   const SelectedAns = transformOptionsToSelected(userAnswers,questionAnswers)
//         //   setCorrrected({...corrected,[currentQuestionIndex]:{selected:SelectedAns}})
//         // }

//         // let's now apply it for all questions at once
//         let obj = {}
//         Questions.forEach((question,index) => {
//           const op = question.Options
//           const userAnswers = (response.data).filter(ques => ques.questionId === question.Id)[0]?.Choices
//           if (userAnswers !== undefined){
//             obj[index]={selected:transformOptionsToSelected(userAnswers,op)}
//           }
//         })
//         setCorrrected(obj)
//       } catch (err) {
//         console.log(err)
//         if(err?.response?.status === 401){
//           navigate("/signin",{state: {from:location},replace:true})
//       }
//       }
//     }
//     fetchUserAnswers()
//   },[Questions])






  const [currentImage,setcurrentImage] = useState(null)
  const [showImage,setShowImage] = useState(false)

  const [showSignal, setShowSignal] = useState(false)
  const [showForum, setShowForum] = useState(false)
  
  const handleSignal = () =>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Use smooth scrolling animation
    });
    setShowImage(prev => false)
    setShowSignal(prev => !prev)
  }

  const handleForum = () =>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Use smooth scrolling animation
    });
    setShowForum(prev => !prev)
    
  }

  // 16 17 18 => 15 16 18 => 15 0 16 1 17 2
  const getGroupOfQuestionSelects = (rootQuestionIndex) =>{
    const Selects = {}
    let length = (Questions[rootQuestionIndex]?.Children.length) + 1
    if(length === 1){
      return {}
    }
    else{
      for (let index = 0; index < length; index++) {
        Selects[rootQuestionIndex + index] = userSelects[rootQuestionIndex + index]
      }
      return Selects
    }
  }

  const handleSubmitQuestion = (object) => {
    setUserSelects(prev => ({...prev,...object}))
  }


  if (!currentQuestion) {
    // Handle the case where data is still undefined (e.g., show a loading indicator)
    return <div>Loading...</div>;
  }
  return (
    <div className="app__qcmquestion">
      <div className="app__qcmquestion-container">
        {!hasChildren && !hasParent ? (
            <SingleQuestion currentQuestion={currentQuestion} currentQuestionIndex={currentQuestionIndex} isDisabled={userSelects.hasOwnProperty(currentQuestionIndex)} onSubmit={handleSubmitQuestion} setDisplayImage={setShowImage} setImage={setcurrentImage} selectedOptions={userSelects.hasOwnProperty(currentQuestionIndex) ? arrayToObjectWithTrueValue(userSelects[currentQuestionIndex]) : {}}
            mode={mode} modeId={modeId} currentQuestionId={currentQuestion?.Id}/>
        )
        :
        (
          // <QuestionGroup rootQuestion={currentQuestion} rootQuestionIndex={currentQuestionIndex} questionChilds={currentQuestion?.Children} isDisabled={userSelects.hasOwnProperty(currentQuestionIndex)}
          // setImage={setcurrentImage}
          // setDisplayImage={setShowImage}
          // onSubmit={handleSubmitQuestion}
          // selectedOptions={userSelects.hasOwnProperty(currentQuestionIndex) ? getGroupOfQuestionSelects(currentQuestionIndex) : {}}
          // // selectedOptions={userSelects.hasOwnProperty(currentQuestionIndex) ? arrayToObjectWithTrueValue(userSelects[currentQuestionIndex]) : {}}
          // />
          <QuestionGroup Questions={[currentQuestion,...currentQuestion.Children]}  rootIndex={currentQuestionIndex} isDisabled={userSelects.hasOwnProperty(currentQuestionIndex)}
          setGlobalUserAnswers={setUserSelects} setDisplayImage={setShowImage} setImage={setcurrentImage}
          selectedOptions={userSelects.hasOwnProperty(currentQuestionIndex) ? getGroupOfQuestionSelects(currentQuestionIndex) : {}} mode={mode} modeId={modeId}
          />
          )}
      </div>
      <QuestionFooter questionDesc={`${currentQuestion.Exam.Year} ${currentQuestion.Exam.Session} Q${currentQuestion.Number}`} correction={"officielle"} showSignalFunc={handleSignal} showForumFunc={handleForum} />
      
      {showImage && (
        <div className="app__qcmquestion-imagepopup">
          <span onClick={() => setShowImage(prev => !prev)}>&times;</span>
          <img src={`${process.env.REACT_APP_API_ENDPOINT}/${currentImage}`} alt="" />
        </div>

      )}

      {showSignal && (
          <SignalPopup onClose={handleSignal}/>
      )}
      {showForum && (
        <div className={`app__qcmquestion-forum open`}>
          <CommentsList onHide={handleForum}/>
        </div>

      )}



    </div>)
};

export default Question
// import React, { useEffect, useState } from 'react'
// import "./question.css"
// import { Option,QuestionFooter, SignalPopup } from "../../../components"
// import { useDispatch, useSelector } from 'react-redux'

// import {Comments} from "../../../components"
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useLocation, useNavigate } from 'react-router-dom'
// import { nextQuestion, prevQuestion } from '../../../features/questionsSlice'
// import useAuth from '../../../hooks/useAuth'
// import useAxios from '../../../hooks/useAxios'

// // todo figure out how to handle states with api requests since it returns an error if request is taking ms longer
// const Question = () => {

//   //! axios hook
//   const axios = useAxios()
  
//   //! auth hook
//   const {auth} = useAuth()
//   const user = auth?.Id
  
//   // helpers
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const location = useLocation()

//   //? themes
//   const colors = useSelector(state => state.theme)
//   const currentColor = colors.Colors[colors.Current].primary 


//   // const [corrected,setCorrrected] = useState({0:{selected:["A","D","E"]}})
//   const [selectedAnswers, setSelectedAnswers] = useState([]);
//   const [corrected,setCorrrected] = useState({})


  
//   // getting the question data 
//   const {currentQuestionIndex,Questions,mode,modeId} = useSelector(state => state.questions)
//   const currentQuestion = Questions[currentQuestionIndex]



//   const transformOptionsToSelected = (userAnswersOptions,Options) =>{
//     //! userAnswerOption is the userAnswers 
//     //! options is the global option
    
//     const alphabet = ["A","B","C","D","E","F","G"]
//     const OptionIdWithAlphabets = {}
//     // for example the result would be for an id which is 4 the object 
//     // would be 4:"A",

//     Options.forEach((option,index) => {
//       OptionIdWithAlphabets[option.Id] = alphabet[index]
//     });

//     const result = userAnswersOptions.map(choice => {
//       return OptionIdWithAlphabets[choice.Id]
//     })
//     return result // ["A","B","C"]
//   }
  




//   const handlePropoClick = (name) => {
//     const isSelected = selectedAnswers.includes(name);
//     let updatedAnswers;

//     if (isSelected) {
//       updatedAnswers = selectedAnswers.filter((answer) => answer !== name);
//     } else {
//       updatedAnswers = [...selectedAnswers, name];
//     }

//     updatedAnswers.sort();
//     setSelectedAnswers(updatedAnswers);
//   };
  
//   const retrieveOptionsIdFromSelected = (Options,Selected) =>{
//     const indexes = Selected.map(char =>{
//       return char.toUpperCase().charCodeAt(0) - 65
//     })
//     const result = indexes.map(index => Options[index]) 
//     return result 
//   }




//   const  correctQcm = async ()=>{
//     setCorrrected({...corrected,[currentQuestionIndex]:{selected:selectedAnswers}})
//     const userAnswers = retrieveOptionsIdFromSelected(currentQuestion.Options,selectedAnswers)
//     const questionAnswers = currentQuestion.Options.filter((option) => option.Value === true )
//     const isCorrect = userAnswers.length === questionAnswers.length && userAnswers.every((value, index) => value === questionAnswers[index]);
//     //! send api request to db
//     if ((mode === "COURS" || mode === "EXAM") ) {
//       if(isCorrect){ 
//       //send request to cours Answers
//       axios.post("/questions/answers",{
//         mode:mode,
//         userId:user,
//         questionId:currentQuestion.Id,
//         Options:retrieveOptionsIdFromSelected(currentQuestion.Options,selectedAnswers),
//         modeId:modeId,
//       }).catch(err => {
//       console.log(err)
//       if(err?.response?.status === 401){
//         navigate("/signin",{state: {from:location},replace:true})
//     }
    
//     })
      
//       //send request to Progress
  
//         axios.post("/questions/progress",{
//           mode:mode,
//           userId:user,
//           questionId:currentQuestion.Id,
//           modeId:modeId,
//         }).catch(err => {
//         console.log(err)
//           if(err?.response?.status === 401){
//             navigate("/signin",{state: {from:location},replace:true})
//         }
//       })
//       }
//     }
//     else{
//       toast.error("an error occured contact us");
//       navigate("/dashboard")
//     }

//   }



//   //! start Images
//   const [Image,setImage] = useState(null)
//   const [showImage,setShowImage] = useState(false)
//   useEffect(()=>{
//     if(currentQuestion?.Image){
//       setImage(currentQuestion?.Image)
//     }
//   },[currentQuestion?.Image])
//   //! end Images

// // issue from here when i move to next question the selected options are still selected which is a grave issue 
// // which means i need either a useEffect that checks if 

//   useEffect(()=>{
//     setSelectedAnswers([])
//   },[currentQuestionIndex])


//   const [showSignal, setShowSignal] = useState(false)
//   const [showForum, setShowForum] = useState(false)
  
//   const handleSignal = () =>{
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth' // Use smooth scrolling animation
//     });
//     setShowImage(prev => false)
//     setShowSignal(prev => !prev)
//   }

//   const handleForum = () =>{
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth' // Use smooth scrolling animation
//     });
//     setShowForum(prev => !prev)
    
//   }
//   if (!currentQuestion) {
//     // Handle the case where data is still undefined (e.g., show a loading indicator)
//     return <div>Loading...</div>;
//   }
//   return (
//     <div className="app__qcmquestion">
//       <div className="app__qcmquestion-container">
//         {currentQuestion.CasClinique && (
//           <div className="app__qcmquestion-container_casclinique">{currentQuestion.CasClinique}</div>
//         )}

//         <div className="app__qcmquestion-container_question">
//           <p  style={{ color: currentColor }}>{currentQuestionIndex + 1} - {currentQuestion.Text}</p>

//           <div className="app__qcmquestion-container_question-propositions">
//             {currentQuestion.Options.map((option, index) => 
//             {
//               const correctClick = corrected.hasOwnProperty(currentQuestionIndex)
//               const alphabet = ["A","B","C","D","E","F","G"]
//             return (<Option
//                 key={index}
//                 optionNum={index}
//                 Text={`${alphabet[index]} - ${option.Choice}`}
//                 isCorrect={option.Value}
//                 isSelected = {corrected[currentQuestionIndex]?.selected?.includes(alphabet[index]) ? true : false}
//                 isCorrected = {correctClick}
//                 onClick={correctClick ? null : () => handlePropoClick(alphabet[index])}
//               />
//             )})}
//           </div>
//           {currentQuestion?.Children && (
//         currentQuestion?.Children?.map((question,ind) =>(
//         <div className="app__qcmquestion-container">
//         {question.CasClinique && (
//           <div className="app__qcmquestion-container_casclinique">{question.CasClinique}</div>
//         )}
//           <div className="app__qcmquestion-container_question">
//             <p  style={{ color: currentColor }}>{question.Number} - {question.Text}</p>
  
//             <div className="app__qcmquestion-container_question-propositions">
//               {question.Options.map((option, index) => 
//               {
//                 const correctClick = corrected.hasOwnProperty(question.Number - 1)
//                 const alphabet = ["A","B","C","D","E","F","G"]
//               return (<Option
//                   key={index}
//                   optionNum={index}
//                   Text={`${alphabet[index]} - ${option.Choice}`}
//                   isCorrect={option.Value}
//                   isSelected = {corrected[question.Number - 1]?.selected?.includes(alphabet[index]) ? true : false}
//                   isCorrected = {correctClick}
//                   onClick={correctClick ? null : () => handlePropoClick(alphabet[index])}
//                 />
//               )})}
//             </div>
//           </div>
//         </div>
//         ))
//       )} 

//               <div className="app__qcmquestion-container_question-propositions_btns">
//               <button style={{backgroundColor:currentColor}} onClick={() =>  dispatch(prevQuestion())} ><span className="material-symbols-outlined">navigate_before</span></button>

                
//                 <button onClick={corrected.hasOwnProperty(currentQuestionIndex) ? null :selectedAnswers.length === 0 ? null : correctQcm } style={{backgroundColor:currentColor}} className={"app__qcmquestion-content_corrected"}>Correct</button>
//                 {Image && (
//                 <button onClick={() => setShowImage(prev => !prev)} style={{backgroundColor:currentColor}}>
//                   <span className="material-symbols-outlined" >photo_library</span>
//                   </button>
//                 )}
//                 <button style={{backgroundColor:currentColor}}  onClick={() => dispatch(nextQuestion())}><span className="material-symbols-outlined">navigate_next</span></button>

//               </div>
//         </div>


//       </div>

 
//       <QuestionFooter questionDesc={`${currentQuestion.Exam.Year} ${currentQuestion.Exam.Session} Q${currentQuestion.Number}`} correction={"officielle"} showSignalFunc={handleSignal} showForumFunc={handleForum} />
      
//       {showImage && (
//         <div className="app__qcmquestion-imagepopup">
//           <span onClick={() => setShowImage(prev => !prev)}>&times;</span>
//           <img src={`/${Image}`} alt="" />
//         </div>

//       )}

//       {showSignal && (
//           <SignalPopup onClose={handleSignal}/>
//       )}
//       {showForum && (
//         <div className={`app__qcmquestion-forum open`}>
//           <Comments onHide={handleForum}/>
//         </div>

//       )}



//     </div>)
// };

// export default Question