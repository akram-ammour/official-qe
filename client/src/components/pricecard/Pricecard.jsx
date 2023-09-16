import React from 'react'
import './pricecard.css'
import {Planfeature} from "../../components/index"
const Pricecard = ({title,price,isPopular=false,featuresDescription="",featuresList=[]}) => {
  return (
    <div className={isPopular? "app__pricecard popular-card":"app__pricecard"}>
      <div className="app__pricecard-type">
        <h4>{title}</h4>
        {isPopular &&(
          <p>Popular</p>
        )}
      </div>
      <div className="app__pricecard-price">
        <h1>{price}<span className='app__pricecard-price_currency'> DH</span></h1>
        <div className='app__pricecard-price_duration'>
          <p>Per User</p>
          <p>Per Semester</p>
        </div>
      </div>
      {isPopular
      ? <a href="#subscribe" className="app__pricecard-subscribe btn-popular">Subscribe</a>
      : <a href="#subscribe" className="app__pricecard-subscribe">Subscribe</a>
      }
      <div className='app__pricecard-line'/>
      <div className="app__pricecard-features">
        <h2>Features :</h2>
        {featuresDescription 
        ? <p className='app__pricecard-features_description'>{featuresDescription}</p>
        : null}
        {featuresList
        ?
        <div className="app__pricecard-features_container">
          <ul>
            {featuresList.map((feature,index)=>(
              <Planfeature Feature={feature} key={index}/>
            ))}
          </ul>
        </div>
        : null}
      </div>
    </div>
  )
}

export default Pricecard