import React, { useEffect } from 'react'
import "./module.css"
import { useNavigate, useParams } from 'react-router-dom';
import { ProgressSideLay } from '../../../components';
import {Mod} from "../../../containers"
import { useSelector } from 'react-redux';
// const data = [
//   {
//     id: 1,
//     name: "Anatomie 1",
//     progress: 47,
//     rank: 234,
//     icon: "tibia",
//     primary: "#592626",
//     secondary: "#9f424270",
//     isactive: false,
//   },
//   {
//     id: 2,
//     name: "Santé publique",
//     progress: 20,
//     rank: 155,
//     icon: "bar_chart_4_bars",
//     primary: "#233B52",
//     secondary: "#3974AA70",
//     isactive: false,
//   },
//   {
//     id: 3,
//     name: "Biologie",
//     progress: 80,
//     rank: 1,
//     icon: "genetics",
//     primary: "#2C4D20",
//     secondary: "#377E4270",
//     isactive: false,
//   },
//   {
//     id: 4,
//     name: "Biochimie Clinique",
//     progress: 65,
//     rank: 143,
//     icon: "science",
//     primary: "#44204D",
//     secondary: "#70377E70",
//     isactive: false,
//   },
//   {
//     id: 5,
//     name: "Tec & Communiation",
//     progress: 47,
//     rank: 50,
//     icon: "computer",
//     primary: "#19121B",
//     secondary: "#30303070",
//     isactive: false,
//   },
//   {
//     id: 6,
//     name: "Termino & Methodo",
//     progress: 20,
//     rank: 125,
//     icon: "match_word",
//     primary: "#826604",
//     secondary: "#E1B51970",
//     isactive: false,
//   },
// ];

const Module = () => {
  useEffect(()=>{
    document.title ="e-qe Module"
  },[])

  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user);

  return (
    <div className='app__module'>
    <ProgressSideLay>
      <Mod/>
    </ProgressSideLay>
</div>
  )
}

export default Module