import React, { useState } from 'react'
import "./customtextarea.css"
// title="Message" value={message} onChange={setMessage}
const Customtextarea = ({title,value,onChange,name}) => {
  const [height,setHeight] = useState(100)
  const handleKeyUp = (e) => {
    const { scrollHeight } = e.target;
    setHeight(`${scrollHeight}px`);
  };
  return (
    <div className='app__customtextarea'>
      <textarea style={{ height: height }} name={name} onKeyUp={handleKeyUp} value={value} onChange={ev => onChange(ev.target.value)} required/>
      <span>{title}</span>
    </div>
  )
}

export default Customtextarea
