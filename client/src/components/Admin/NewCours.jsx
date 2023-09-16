import axios from "axios";
import React, { useState, useRef } from "react";
import ContentEditable from "react-contenteditable";

const Cours = ({ children, coursId }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [currentValue, setCurrentValue] = useState(children);
  const [previousValue, setPreviousValue] = useState("");

  const contentRef = useRef(null);

  const handleCoursClick = () => {
    setIsEditable(true);
    setPreviousValue(currentValue);
    setTimeout(() => {
      contentRef.current.focus();
      // Place the cursor at the end of the content
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(contentRef.current);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }, 0);
  };

  const handleSave = async () => {
    setIsEditable(false);
    if (currentValue !== previousValue) {
      // Send API request
      axios
        .patch(`/courses/${coursId}`, {
          title: currentValue,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  const handleClose = () => {
    setCurrentValue(previousValue);
    setIsEditable(false);
  };

  const handleChange = (event) => {
    setCurrentValue(event.target.value);
  };

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
    <div className="cours">
      <p>
        •{" "}
        <ContentEditable
          innerRef={contentRef}
          html={currentValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onDoubleClick={handleCoursClick}
          tagName="span"
          className={`editable-content-${coursId}`}
          contentEditable={true}
          suppressContentEditableWarning
        />
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
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>
    </div>
  );
};

export default Cours;
