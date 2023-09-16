import React from 'react'
import './subscription.css'
import receipt from '../../assets/receipt.svg'
import phone from '../../assets/phone.svg'
import arrowright from '../../assets/arrowright.svg'
import person from '../../assets/person.svg'
import {Info} from "../../components"
const Subscription = () => {
  return (
    <div className='app__subscribe section__padding' id='subscribe'>
    <h1 className='gradient__text app__subscribe-title'>how to subscribe ?</h1>
      <div className="app__subscribe-container">
        <Info icon={phone} iconcolor={"#7A35AA"} title="Contacting us" text="contact us at  212+ 656571884 to get informations about the product and to get to know the features of every plan" />
        <img src={arrowright}/>
        <Info icon={receipt} iconcolor={"#3974AA"} title="processing payment" text="Paying the due amount via rIB and sending the payment receipt to our number: 212+ 656571884" />
        <img src={arrowright}/>
        <Info icon={person} iconcolor={"#189FCA"} title="activating account" text="Your account will be activated within 24H if not contact us to solve the issues" />
      </div>
    </div>
  )
}

export default Subscription