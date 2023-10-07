import React, { useRef, useState } from 'react'
import "./contact.css"
import {Custominput,Customselect,Customtextarea,} from "../../components/index"
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';
const Contact = () => {
  const [inputValue,setInputValue] = useState('');
  const [inputEmail,setInputEmail] = useState('');
  const [inputLastName,setInputLastName] = useState('');
  const [message,setMessage] = useState('');


  const form = useRef()

  const sendEmail = (e) => {
    e.preventDefault()
    e.preventDefault();

    emailjs.sendForm('service_28udnmi', 'template_mwzduri', form.current, '6ABGC8gfcUEg9IZHi')
      .then((result) => {
        if(result.text === "OK"){
          toast.success('successfully sent a message')
        }
      }, (error) => {
      });
      e.target.reset()
      setInputEmail('')
      setInputValue('')
      setInputLastName('')
      setMessage('')
  }
// drarkwzwgmkkcaly
// nodemailer
// irprqizwmgcnjfbn
// Accédez aux paramètres de votre compte Google dans l'application ou l'appareil que vous essayez de configurer. Remplacez le mot de passe par celui de 16 caractères indiqué ci-dessus.
// Tout comme votre mot de passe classique, ce mot de passe spécifique à une application permet d'accorder un accès complet à votre compte Google. Étant donné que vous n'avez pas besoin de le mémoriser, ne le notez nulle part ni ne le partagez avec personne.
  return (
    <div id='contact' className='app__contact section__padding'>
      <h1>Would love to hear from you contact us 👋.</h1>      
      <div >
        <form ref={form} onSubmit={sendEmail} className='app__contact-conatainer'>
        <Custominput name="first_name" title="first-name" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <Custominput name="last_name" title="last-name" value={inputLastName} onChange={(e) => setInputLastName(e.target.value)}/>
        <Custominput name="Email" title="Email" value={inputEmail} onChange={(e) => setInputEmail(e.target.value)}/>
        <Customselect name="select" placeholder="selectionner une année" choices={["1A","2A","3A","4A","5A"]}/>
        <div className='app__contact-conatainer_innercontainer'>
        <Customtextarea name="message" title="Message" value={message} onChange={setMessage}/>
        <button type='submit'>Send Now</button>
        </div>
        </form>
      </div>
    </div>
  )
}

export default Contact
