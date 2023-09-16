
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";

const   Cours = ({ children,coursId,fetch,key }) => {
  const axios = useAxios()
    const [isEditable, setIsEditable] = useState(false);
    const [currentValue, setCurrentValue] = useState(children);
    const [previousValue, setPreviousValue] = useState("");
  
    const location = useLocation()
    const navigate = useNavigate()

    const handleCoursClick = () => {
      setIsEditable(true);
      setPreviousValue(currentValue); 
    };

  

  
    const handleSave = async () => {
      setIsEditable(false);
      const value = document.querySelector(`.editable-content-${coursId}`).textContent
      setCurrentValue(value)
      if(value !== previousValue){
        //send api request
        try{

        const response = await axios.patch(`/courses/${coursId}`, {
          title: value,
        })
        if (response?.data?.status === "success"){
          toast.success(`${response?.data?.message} from prev: ${previousValue} to: ${value}`)
        }
        else if(response?.data?.status === 'exists'){
          toast.error(response?.data?.message)
          handleClose()
        }
      }
      catch (error){
        console.log(error)
          if(error?.response?.status === 401){
            navigate("/signin",{state: {from:location},replace:true})
        }

      }
      }
    };
    const handleDelete = async () => {
      try{
        const response = await axios.delete(`/courses/${coursId}`)
        if (response?.data?.status === "success"){
          toast.success(`${response?.data?.message}`)
          fetch()
        }
      }
      catch (error){
        console.log(error)
          if(error?.response?.status === 401){
            navigate("/signin",{state: {from:location},replace:true})
        }

      }
    };
  
    const handleClose = () => {
      document.querySelector(`.editable-content-${coursId}`).textContent = previousValue
      setCurrentValue(previousValue)
      setIsEditable(false)
    };
  
  
  
    // const handleOnChange = (e) =>{
    //   setCurrentValue(e.target.value)
    // }
    
    const handleKeyDown = (e) => {
      if (e.keyCode === 13) {
        // Enter key was pressed
        e.preventDefault(); // Prevent the default behavior (line break in contentEditable)
        handleSave(); 
      } else if (e.keyCode === 27) {
      // Escape key was pressed
      handleClose(); 
    }
    };
    return (
      <div className="cours" key={key}>
        <p>
          •{" "}
          <span
            onKeyDown={handleKeyDown}
            onDoubleClick={handleCoursClick}
            contentEditable={isEditable}
            suppressContentEditableWarning
            className={`editable-content-${coursId}`}
            // onChange={handleOnChange}
            // value={currentValue}
          >
            {currentValue}
          </span>
        </p>
        <div className="btns">
          {isEditable && (
            <>
              <button onClick={handleSave}>
                <span className="material-symbols-outlined">save</span>
              </button>
              <button onClick={handleClose}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </>
          )}
          <button>
            <span className="material-symbols-outlined" onClick={handleDelete}>delete</span>
          </button>
        </div>
      </div>
    );
  };

export default Cours