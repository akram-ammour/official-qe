import React, { useState } from 'react'
import "./contact.css"
import {Custominput,Customselect,Customtextarea,} from "../../components/index"
import { toast } from 'react-toastify';
const Contact = () => {
  const [inputValue,setInputValue] = useState('');
  const [inputEmail,setInputEmail] = useState('');
  const [inputLastName,setInputLastName] = useState('');
  const [message,setMessage] = useState('');
// drarkwzwgmkkcaly
// nodemailer
// irprqizwmgcnjfbn
// Accédez aux paramètres de votre compte Google dans l'application ou l'appareil que vous essayez de configurer. Remplacez le mot de passe par celui de 16 caractères indiqué ci-dessus.
// Tout comme votre mot de passe classique, ce mot de passe spécifique à une application permet d'accorder un accès complet à votre compte Google. Étant donné que vous n'avez pas besoin de le mémoriser, ne le notez nulle part ni ne le partagez avec personne.
  return (
    <div id='contact' className='app__contact section__padding'>
      <h1>Would love to hear from you contact us 👋.</h1>      
      <div className="app__contact-conatainer">
        <Custominput title="first-name" value={inputValue} onChange={setInputValue} />
        <Custominput title="last-name" value={inputEmail} onChange={setInputEmail}/>
        <Custominput title="Email" value={inputLastName} onChange={setInputLastName}/>
        <Customselect placeholder="selectionner une année" choices={["1A","2A","3A","4A","5A"]}/>
        <div className='app__contact-conatainer_innercontainer'>
        <Customtextarea title="Message" value={message} onChange={setMessage}/>
        <button>Send Now</button>
        </div>
      </div>
    </div>
  )
}

export default Contact