import React, { useState, useRef, useEffect } from "react";

import OptionComponent from "./OptionComponent";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import ExamDescriptionPopup from "./ExamDescriptionPopup";
import ImagePopup from "../../../components/Admin/ImagePopup/ImagePopup";
import Option from "../../../components/Admin/Option"
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
//todo  what i need todo is do the image thing and then retrieve the exams if conditions are met then save them or delete them so crud operations
const ExamsContainer = () => {
  useEffect(()=>{
    document.title ="e-qe Admin Exams"
  },[])

  //? axios for querying data   
  const axios = useAxios()

  //? auth hook
  const {auth} = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  
  //? gets the current Year help with the Select
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2014 },
    (_, index) => 2015 + index
  );
  const [isCreation,setIsCreating] = useState(true) //! means that i m creating not updating


  //! questionSchema if no Id/creation
  const QuestionSchema = {
    Text: "",
    CasClinique: "",
    CoursId: null,
    Number:1,
    Image: null, //todo image
    ParentId: null,
    Options: [],
  };

  const [questions, setQuestions] = useState([{...QuestionSchema}]);

  const addQuestion = () => {
    if (questions.length < 50) {
      setQuestions((prev) => [...prev, { ...QuestionSchema,Number:(questions.length + 1) }]);
    }
  };

  const handleQuestion = (index, event) => {
    const updatedQuestions = [...questions];
    if (event.target.name === "CasClinique") {
      updatedQuestions[index].CasClinique = event.target.value;
    } else {
      updatedQuestions[index].Text = event.target.value;
    }
    setQuestions(updatedQuestions);
  };

  // helper function
  const findClosestParentIndex = (index) => {
    const currentQuestion = questions[index];
    if (currentQuestion.ParentId === null) {
      return index;
    } else {
      return findClosestParentIndex(index - 1);
    }
  };

  const handleIsChild = (index, event) => {
    const isChecked = event.target.checked;
    const updatedQuestions = [...questions];
    if (isChecked) {
      updatedQuestions[index].ParentId = findClosestParentIndex(index - 1) + 1;
    } else {
      updatedQuestions[index].ParentId = null;
    }
    setQuestions(updatedQuestions);
  };


  function extractTaskItems(data) {
    const taskItems = data.content[0].content;
    const result = [];

    taskItems.forEach((taskItem) => {
      let text;
      if (taskItem?.content) {
        text = taskItem.content[0].text;
      } else {
        return;
      }
      const checked = taskItem?.attrs?.checked;
      result.push({ Choice: text, Value: checked });
    });

    return result.slice(0, 5);
  }

  const handleOptions = (index, args) => {
    const updatedQuestions = [...questions];
    const Options = extractTaskItems(args);
    updatedQuestions[index].Options = [...Options];
    setQuestions(updatedQuestions);
  };

  
  const [cours, setCours] = useState([]);
  const [infos, setInfos] = useState({});
  const [modules, setModules] = useState([]);
  const [notes, setNotes] = useState(false)
  const [imgPopup, setImgPopup] = useState(false)

  const handleIsUnique = (e) =>{
    if(!e.target.checked) setInfos((prev) => ({ ...prev, Title:null }));
      setInfos(prev => ({...prev,isUnique:e.target.checked}))
  }
  
  const handleSelects = (e) => {
    setInfos((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCoursSelect = (index, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].CoursId = Number(event.target.value);
    setQuestions(updatedQuestions);
  };

  useEffect(() => {
    if (infos.Level && infos.Semester) {
      const fetchModules = async () => {
        try {
          const response = await axios.get(
            `/modules/specific?Year=${infos.Level}&Semester=${infos.Semester}`);
          setModules(response.data);
        } catch (error) {
          console.log(error);
          if (error?.response?.status === 401) {
            navigate("/signin", { state: { from: location }, replace: true });
          }
        }
      };
      fetchModules();
      if (infos.Module) {
        const fetchCours = async () => {
          try {
            const response = await axios.get(
              `/courses/specific?moduleId=${infos.Module}`);
            setCours([...response.data]);
            // console.log(response.data)
          } catch (error) {
            console.log(error);
            if (error?.response?.status === 401) {
              navigate("/signin", { state: { from: location }, replace: true });
            }
          }
        };
        fetchCours();
      }
    }
    // console.log(infos)
  }, [infos]);

  useEffect(() => {
    if (
      infos.Level &&
      infos.Semester &&
      infos.Module &&
      infos.Year &&
      infos.Session
    ) {
      //launch a request to find
      const fetchExam = async () => {
        try {
          const response = await axios.get(
            `/exams/search?y=${infos.Year}&s=${infos.Session}&m=${infos.Module}&u=${infos?.isUnique || false}`
          );
          setQuestions([...response?.data?.questions]);
          const ExamTitle =response?.data?.exam?.Title
          const Id =response?.data?.exam?.Id
          const Description =response?.data?.exam?.Description
          setInfos(prev => ({...prev,Title:ExamTitle,Id:Id,Description:Description}))
          setIsCreating(false)
        } catch (error) {
          setIsCreating(true)
          // console.log(error?.response?.data);
          setQuestions([{ ...QuestionSchema }]);
          setInfos(prev => ({...prev,Title:""}))
          if (error?.response?.status === 401) {
            navigate("/signin", { state: { from: location }, replace: true });
          }
        }
      };
      fetchExam();
    }
  }, [infos?.Level, infos?.Semester, infos?.Module, infos?.Year, infos?.Session,infos?.isUnique]);
  
  // useEffect(()=>{
  //   console.log(questions)
  // },[questions])

  const setExamDescription = (Description) =>{
    setInfos(prev => ({...prev,Description:Description}))
  }
  const checkIfValidBeforeRequest = () => {
    const isInvalid = questions.some(quest => {
      if (quest.CoursId === null || quest.Text === null) {
        return true;
      }
  
      const hasInvalidOption = quest.Options.some(option => !option.Choice);
      if (hasInvalidOption) {
        return true;
      }
  
      return false;
    });
  
    return !isInvalid;
  };
  

  /*! Saving or Updating mode */
  const saveExam = async () =>{
      // First, check if the data is valid
    if (!checkIfValidBeforeRequest()) {
      toast.error("make the sure to fill all the infos");
      return;
    }
    //! creating
    if(isCreation){
      try {
        const response = await axios.post(
          `/exams/create`,
          {
            // Year, Session, ModuleId, Questions,isUnique=false,Title=null,Description=null 
            // infos?.Semester, infos?.Module, infos?.Year, infos?.Session,infos?.isUnique
            Year:infos?.Year, // 2020
            Session:infos?.Session, // N R E
            ModuleId:infos?.Module, // id
            isUnique:infos?.isUnique, // true or false
            Title:infos?.Title, // Title
            Description:infos?.Description || null, // Description
            Questions:questions, // questions
          }
        );

        //when i create the exam i wanna set the isCreation to false and set the questions to response given by the post requests that provides the Id's of the options and of the question for further editing
        if(response?.data?.status === 'success'){
          setIsCreating(false) //? updating mode
          setQuestions([...response?.data?.createdExam?.Questions])
          setInfos(prev => ({...prev,Id:response?.data?.createdExam?.Id}))
          if(response?.data?.createdExam?.isDifferent){
            const ExamTitle =response?.data?.createdExam?.Title
            setInfos(prev => ({...prev,Title:ExamTitle}))
          }
          toast.success(`${infos?.Year} ${infos?.Session} isUnique: ${infos?.isUnique ? true : false} created successfully`)
        }

      }
      catch (error){
        console.log(error)
        if (error?.response?.status === 401) {
          navigate("/signin", { state: { from: location }, replace: true });
        }
      }
    }
    //! updating
    else{
      try {
        const response = await axios.patch(
          `/exams/update/${infos?.Id}`,
          {
            Questions:questions,
            Description:infos?.Description || null
          });
        if(response?.data?.status === "success"){
          setQuestions([...response?.data?.updatedExam?.Questions])
          toast.success(`${infos?.Year} ${infos?.Session} isUnique: ${infos?.isUnique ? true : false} updated successfully`)
        }
        //ig only changing the questions content
      }
      catch (error){
        console.log(error)
        if (error?.response?.status === 401) {
          navigate("/signin", { state: { from: location }, replace: true });
        }
      }
    }
    // console.log("exam will be saved")
  }
  const deleteExam = async () =>{
    //! check if there is a current exam or not then if it exists delete it 
    //!cancel maybe too
    // console.log("exam will be deleted")
    if(isCreation){
      //! first: clear exam
      //! second: setquestion to questionSchema or nothing maybe ig
      setQuestions([{ ...QuestionSchema }]);
      setInfos({})
      toast.info(`exam cleared successfully`)
      
    }
    else{ // updating delete exam
      //! first: delete exam 
      //! second: setInfos to null
      //! third: setquestion to questionSchema or nothing maybe ig
      
      try{
        const response = await axios.delete(`/exams/delete/${infos?.Id}`)
        if(response?.data?.status === "success"){
          toast.success(`${infos?.Year} ${infos?.Session} isUnique: ${infos?.isUnique ? true : false} deleted successfully`)
          setQuestions([{ ...QuestionSchema }]);
          setIsCreating(true)

        }
      }
      catch (error){
        console.log(error)
        if (error?.response?.status === 401) {
          navigate("/signin", { state: { from: location }, replace: true });
        }

      }
      // toast.success(`exam deleted successfully`)
    }
  }

  
  const setQuestionOptions = (questionIndex,newOptions) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].Options = newOptions
    setQuestions(updatedQuestions);
  }
  const setQuestionImage = (questionNumber,Image) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionNumber - 1].Image = Image
    setQuestions(updatedQuestions);
  }

  const [currentQuestionIndex,setCurrentQuestionIndex] = useState(0)

  return (
    <div className="app__editcontainer-content_exams">
      {notes && <div className="overlay"/>}
      {imgPopup && <div className="imageOverlay"/>}
      <div className="buttons-container">
        <button className="save" onClick={saveExam}>{isCreation ? "Create" : "Update"}</button>
        <button className="delete" onClick={deleteExam}>{isCreation ? "Clear" : "Delete"}</button>{/* clear or delete*/}
      </div>

      <div className="infos">
        <div className="exam-infos">
          <div className="select">
            <p>Level : </p>
            <select
              name="Level"
              onChange={handleSelects}
              value={infos.Level || ""}
            >
              <option value={null}>Selectionner un Level</option>
              <option value="FIRST">1A</option>
              <option value="SECOND">2A</option>
              <option value="THIRD">3A</option>
              <option value="FOURTH">4A</option>
              <option value="FIFTH">5A</option>
            </select>
          </div>
          <div className="select">
            <p>Semestre : </p>
            <select
              name="Semester"
              onChange={handleSelects}
              value={infos.Semester || ""}
            >
              <option value={null}>Selectionner un semestre</option>
              <option value="SEMESTER1">Semestre 1</option>
              <option value="SEMESTER2">Semestre 2</option>
            </select>
          </div>
          <div className="select">
            <p>Module : </p>
            <select
              name="Module"
              onChange={handleSelects}
              value={infos.Module || ""}
            >
              <option value={null}>Selectionner un module</option>
              {modules.map((mod) => (
                <option key={mod?.Id} value={mod?.Id}>
                  {mod?.Title}
                </option>
              ))}
            </select>
          </div>
          <div className="select">
            <p>Année : </p>
            <select
              name="Year"
              onChange={handleSelects}
              value={infos.Year || ""}
            >
              <option value={null}>Selectionner une année</option>

              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="select">
            <p>Session : </p>
            <select
              name="Session"
              onChange={handleSelects}
              value={infos.Session || ""}
            >
              <option value={null}>Selectionner une session</option>
              <option value="N">Normal</option>
              <option value="R">Rattrapage</option>
              <option value="E">Exceptionnelle</option>
            </select>
          </div>
          <div className="checkbox">
            <p>Is unique Exam :</p>
            <input type="checkbox" checked={infos?.isUnique || false} onChange={handleIsUnique}/>
          </div>

        </div>
        
        <div className="exam-notes" >
          <div className="inner" onClick={() => setNotes(true)}>Notes</div>
        </div>
      </div>


      <div className="questions-container">
          {
            infos?.isUnique && (
              <input type="text" name="Title" className="uniqueExamTitle" value={infos.Title || ""} onChange={handleSelects} placeholder="Title of unique exam"/>
            )
          }

        {questions.map((quest, index) => {
          return(

          <div key={index + 1} className="question-component" style={{ marginLeft: `${quest.ParentId !== null ? "200px" : ""}` }}>
            <div className="top">
              <div className="text-content">
                <p className="Number">
                  Q{index + 1}
                  {": "}
                </p>
                <textarea
                  style={{ wordBreak: "break-word" }}
                  placeholder="write questions's content"
                  value={quest.Text || ""}
                  name="text"
                  onChange={(event) => handleQuestion(index, event)}
                />
              </div>
              <div className="icons">

                {/* i first create the image  */}
                {quest?.Id && (
                  <span className={`material-symbols-outlined ${quest?.Image ? "image-exists" : ''}`} onClick={() => {
                    setImgPopup(true)
                    setCurrentQuestionIndex(index)
                  }}>image</span>
                )}
                {/* <span className="material-symbols-outlined">close</span> */}
              </div>
            </div>

            <div className="separator" />

            <div className="casClinique">
              <p
                style={{
                  textDecoration: "underline",
                  color: "#06f",
                  marginBottom: "10px",
                }}
              >
                Cas Clinique:
              </p>
              <textarea
                style={{ wordBreak: "break-word" }}
                placeholder="write questions's Cas Clinique"
                value={quest.CasClinique || ""}
                name="CasClinique"
                onChange={(event) => handleQuestion(index, event)}
              />
            </div>



            <div className="middle">
              {quest?.Id 
              ? quest.Options.map((option,optionIndex) =>(
                // <p>{option.Value ? "✅" : "❎"}  {option.Choice}</p>
                <Option isLast={quest.Options.length === optionIndex +1 ? true : false} questionId={quest?.Id} optionIndex={optionIndex} questionIndex={index} setQuestionOptions={setQuestionOptions} key={optionIndex} checked={option?.Value} optionId={option?.Id}>{option?.Choice}</Option>
              ))
              : (
                  <OptionComponent
                  id={index}
                  onChange={handleOptions}
                  // initialValue={quest.Options|| []}
                />
              )}

            </div>




            <div className="bottom">
              <select
                name="course"
                onChange={(e) => handleCoursSelect(index, e)}
                value={questions[index]?.CoursId || ""}
                title={
                  cours.find((c) => c?.Id == questions[index]?.CoursId)
                    ?.title || "selectionnez un cours"
                }
              >
                <option value={null}>Selectionner un cours</option>
                {cours.map((c) => (
                  <option key={c?.Id} value={c?.Id}>
                    {c?.title}
                  </option>
                ))}
              </select>
              {index !== 0 && (
                <div className="checkbox">
                  <input
                    type="checkbox"
                    checked={quest?.ParentId !== null}
                    onChange={(event) => handleIsChild(index, event)}
                  />
                  <p>child of cas clinique</p>
                </div>
              )}
            </div>



          </div>
        )})}


      </div>




      {/* addQuestion button */}
      <button className="question-add-button" onClick={addQuestion}>
        <span className="material-symbols-rounded">add</span> add new question
      </button>

      {/* Notes Description */}
      {notes &&(
        <ExamDescriptionPopup isCreation={isCreation} examDescription={infos?.Description || ""} setExamDescription={setExamDescription} onClose={() => setNotes(false)}/>
      )}
      {imgPopup &&(
        <ImagePopup setQuestionImage={setQuestionImage} Questions={questions} currentQuestionIndex={currentQuestionIndex} onClose={() => setImgPopup(false)}/>
      )}
    </div>
  );
};

export default ExamsContainer;
