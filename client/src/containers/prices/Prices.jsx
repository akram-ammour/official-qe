import React from 'react'
import './prices.css'
import {Pricecard} from "../../components/index"
const Prices = () => {
  return (
    <div id='prices' className='app_prices section__padding'>
      <h1 className='gradient__text'>find the perfect plan for your studies</h1>
      <div className="app__prices-container">
        <Pricecard title='Free' price='0' featuresDescription="We want you to try our product so we have decided that the best approach is to give you a module for free that you can try whenever you want though you won't have access to the features of history and  progress and most features that are available in the normal plan though this free trial is enough to give you a taste of our powerful web app."/>
        {/* is popular gives the user a dark background and the popular mark in top right */}
        {/* <Pricecard title='Normal' price='100' isPopular={true} featuresList={["Gain access to all the modules in the semester.","have your own customizable dashboard.","track your progress with history.","Courses with their own qcms.","know your rank compared to your promo.","exams are updated and checked for valid answers every once in a while","exams are added every once in a while and you don't have to pay more."]}/> */}
        {/* <Pricecard title='Plus' price='150' featuresDescription="Everything that is available in the Normal plan plus:" featuresList={["get your own dedicated chatbot that answers your questions","more customization","priority access to new features ","An enhanced version with ai"]}/> */}
      </div>
    </div>
  )
}

export default Prices
