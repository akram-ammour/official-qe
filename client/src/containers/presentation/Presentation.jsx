import React from 'react'
import './presentation.css'
import { Feature } from '../../components'
const Presentation = () => {
  return (
    <div className='app__presentation section__margin section__padding' id='whatis'>
      <div className="app__presentation-feature">
        <Feature title="What is E-QE ?" text="e-qe is a platform that hosts online qcms mainly official fmpm exams with interactive solutions and also answers giving you instant feedback and rating your progress."/>
      </div>
      <h1 className="gradient__text app__presentation-title">Why E-QE ?</h1>
      <div className="app__presentation-container">
        <Feature title="QCMS" text="With our website, users can explore a wide-ranging and regularly updated database of Multiple Choice Questions (QCMs). This provides a dynamic learning experience, ensuring that users always have access to the most up-to-date information. Unlike traditional books, which can become outdated over time, our website keeps its content relevant and current."/>
        <Feature title="Progresss" text="Our website allows users to track their individual progress. This feature provides valuable feedback to users, enabling them to identify areas where they excel and areas where they need improvement. Additionally, the ability to compare progress with other users using the same app creates a sense of healthy competition and motivation to strive for better results."/>
        <Feature title="Customization" text="Our website offers a personalized experience by allowing users to customize their dashboard according to their preferences. Users can organize their study materials, set goals, and access specific features that suit their learning style. This level of customization enhances user engagement and makes the studying process more efficient and enjoyable."/>
      </div>
    </div>
  )
}

export default Presentation