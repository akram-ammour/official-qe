import React, { useState } from 'react'
import "./signals.css"
import QuestionContainer from './QuestionContainer';
import BugContainer from './BugContainer';
const SignalsContainer = () => {
    const [tab, setTab] = useState(0);
  const handleTabChange = (index) => {
    setTab(index);
  };

  return (
    <div className='app__signalscontainer'>
      <div className="app__signalscontainer-tabs">
        <div
          className={`app__signalscontainer-tabs_tab ${tab === 0 ? "active" : ""}`}
          onClick={() => handleTabChange(0)}
        >
          Questions
        </div>
        <div className="app__signalscontainer-tabs_divider"></div>
        <div
          className={`app__signalscontainer-tabs_tab ${tab === 1 ? "active" : ""}`}
          onClick={() => handleTabChange(1)}
        >
          Bugs
        </div>
      </div>
      <div className="app__signalscontainer-content">
        {tab === 0 && (
          <QuestionContainer/>
        )}
        {tab === 1 && <BugContainer/>}

      </div>
    </div>
  )
}

export default SignalsContainer