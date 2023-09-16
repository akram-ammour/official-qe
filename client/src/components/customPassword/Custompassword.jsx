import React, { useState } from 'react';
import './custompassword.css';
import eye from "../../assets/eye.svg";
import noeye from "../../assets/no-eye.svg";

const Custompassword = ({ value, onChange, title }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isHidden,setIsHidden] = useState(true)

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleInput = (event) => {
    onChange(event.target.value);
    setIsValid(event.target.validity.valid);
  };

  const containerClassName = `app__custompassword ${isFocused || isValid ? 'active' : ''}`;

  return (
    <div className={containerClassName}>
      <div className="app__custompassword-input">
        <input
          type={isHidden ? "password" : "text"}
          value={value}
          onChange={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required
          
        />
        <span>{title}*</span>
      </div>
      <button onClick={ev => setIsHidden(prev => !isHidden)}>
        {isHidden ?
        <img src={eye} alt="Show Password" />
        :
        <img src={noeye} alt="Show Password" />
         }
      </button>
    </div>
  );
};

export default Custompassword;