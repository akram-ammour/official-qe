import React, { useEffect, useState } from 'react';
import "./option.css";
import { useSelector } from 'react-redux';


//disabled => corrected
const Option = ({ Text, isCorrect, onChange,isDisabled,isChecked,optionNum, }) => {
  const colors = useSelector(state => state.theme)
  const currentColor = colors.Colors[colors.Current].primary 
  
  const [checked, setChecked] = useState(isChecked);
  const [isQuestionDisabled, setIsQuestionDisabled] = useState(isDisabled);

  const handleOptionClick = () => {
    setChecked(!checked); // Toggle the selected state
    onChange(optionNum,!checked); // Call the onClick prop to notify the parent component about the selection
  };

  useEffect(()=>{
    setChecked(isChecked)
  },[isChecked])
  useEffect(()=>{
    setIsQuestionDisabled(isDisabled)
  },[isDisabled])

  return (//${selected ? 'selected' : ''}`
                                    // isCorrected ? isCorrect ? "option__correct" :  "option__incorrect" : null}
    <div className={`app__option ${ isDisabled && isCorrect ? "option__correct" : isDisabled && checked ? "option__incorrect":null}`} style={checked ? isDisabled ? {border:`3px solid #aaa `} : {border:`3px solid ${currentColor} `} : isDisabled ? {cursor:"auto"} : null}  onClick={isDisabled ? null :handleOptionClick}>
      <p>{Text}</p>
        {checked && (
      <div className="app__option-circle" style={checked ? isDisabled ? {border:`3px solid white `} : {border:`3px solid ${currentColor} `} : isDisabled ? null : null}>
          <span className="material-symbols-outlined" style={checked ? isDisabled ? {color:"white"} : {color:currentColor} : isDisabled ? null : null}>
            check
          </span>
      </div>
        )}
    </div>
  );
};

export default Option;



// import React, { useEffect, useState } from 'react';
// import "./option.css";
// import { useSelector } from 'react-redux';

// const Option = ({ Text, isCorrect, onClick,isCorrected,isSelected,optionNum }) => {
//   const colors = useSelector(state => state.theme)
//   const currentColor = colors.Colors[colors.Current].primary 
  
//   const [selected, setSelected] = useState(isSelected);

//   const handleOptionClick = () => {
//     setSelected(!selected); // Toggle the selected state
//     onClick(); // Call the onClick prop to notify the parent component about the selection
//   };

//   // issue here seems like the is selected isn't working

//   useEffect(() => {
//     setSelected(isSelected);
//   }, [isSelected]);
//   return (//${selected ? 'selected' : ''}`
//                                     // isCorrected ? isCorrect ? "option__correct" :  "option__incorrect" : null}
//     <div className={`app__option ${ isCorrected && isCorrect ? "option__correct" : isCorrected && selected ? "option__incorrect":null}`} style={selected ? isCorrected ? {border:`3px solid #aaa `} : {border:`3px solid ${currentColor} `} : isCorrected ? null : null}  onClick={isCorrected ? null :handleOptionClick}>
//       <p>{Text}</p>
//         {selected && (
//       <div className="app__option-circle" style={selected ? isCorrected ? {border:`3px solid white `} : {border:`3px solid ${currentColor} `} : isCorrected ? null : null}>
//           <span className="material-symbols-outlined" style={selected ? isCorrected ? {color:"white"} : {color:currentColor} : isCorrected ? null : null}>
//             check
//           </span>
//       </div>
//         )}
//     </div>
//   );
// };

// export default Option;
