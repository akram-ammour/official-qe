import React, { useEffect, useState } from 'react'
import "./popup.css"

const setCaretToEnd = (element) => {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
    element.focus();
  };

const ExamDescriptionPopup = ({onClose,examDescription,isCreation,setExamDescription}) => {
    const [editedDescription, setEditedDescription] = useState(examDescription);
    const descriptionRef = React.createRef(); 

    useEffect(() => {
        // Focus the descriptionRef element when the component mounts
        if (descriptionRef.current) {
            descriptionRef.current.focus();
            setCaretToEnd(descriptionRef.current)
        }
    }, []);

    const handleClose = () =>{
        //send to api
        setExamDescription(editedDescription)
        onClose()
    }

    const handleDescriptionChange = event => {
            // Store current selection
        const selection = window.getSelection();
        const anchorNode = selection.anchorNode;
        const anchorOffset = selection.anchorOffset;
        const focusNode = selection.focusNode;
        const focusOffset = selection.focusOffset;
        setEditedDescription(event.target.textContent);
            // Restore previous selection
        if (anchorNode && focusNode) {
            const newRange = document.createRange();
            newRange.setStart(anchorNode, anchorOffset);
            newRange.setEnd(focusNode, focusOffset);
            selection.removeAllRanges();
            selection.addRange(newRange);
        }
        else{
            setCaretToEnd(descriptionRef.current)
        }
    };

    useEffect(() => {
        // Update the edited description when the examDescription prop changes
        setExamDescription(editedDescription)
    }, [editedDescription]);

  return (
    <div className='app__examdescriptionpopup'>
        <div className="title-pannel">
            <div className="title">notes</div>
            <span className="material-symbols-rounded" onClick={handleClose}>
                close
            </span>
        </div>
        <div className="divider"></div>
        <div ref={descriptionRef} contentEditable suppressContentEditableWarning onBlur={handleDescriptionChange} className="exam-description">{editedDescription}</div>
    </div>
  )
}

export default ExamDescriptionPopup