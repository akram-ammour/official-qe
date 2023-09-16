import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'


const action = async () =>{
    console.log('hello world')
}
const CancelButton = ({backgroundColor="red",textColor="white",sendRequest=action,defaultCounter=5,className="",text="save"}) => {
    const [isCancel, setIsCancel] = useState(false)
    const [counter, setCounter] = useState(defaultCounter)

  useEffect(() => {
    let countdownInterval;

    if (isCancel && counter > 0) {
      countdownInterval = setInterval(() => {
        setCounter(prevCounter => prevCounter - 1);
      }, 1000);
    } else if (counter === 0) {
      sendRequest();
      setIsCancel(false);
      setCounter(defaultCounter);
    }

    return () => clearInterval(countdownInterval); // Clear the interval when the component unmounts or when the effect runs again
  }, [isCancel, counter,sendRequest,defaultCounter]);


    const hanldeLaunch = async () =>{
        if (!isCancel) {
            setIsCancel(true);
          } else {
            setIsCancel(false);
            setCounter(defaultCounter);
            toast.warning("Action Aborted/Cancelled")
          }
    }
  return (
    <button className={className}  onClick={hanldeLaunch} style={{backgroundColor: isCancel ? "#B8B8B8" : backgroundColor,color:textColor}}>{isCancel ? `cancel ${counter}...` : text}</button>
  )
}

export default CancelButton