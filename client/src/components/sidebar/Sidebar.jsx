import React, { useEffect, useState } from 'react';
import "./sidebar.css";

const module = [
  {
    id: 1,
    name: "Anatomie 1",
    progress: 47,
    rank: 234,
    icon: "tibia",
    primary: "#592626",
    secondary: "#9f424270",
    isactive: false,
  },
  {
    id: 2,
    name: "Santé publique",
    progress: 20,
    rank: 155,
    icon: "bar_chart_4_bars",
    primary: "#233B52",
    secondary: "#3974AA70",
    isactive: false,
  },
  {
    id: 3,
    name: "Biologie",
    progress: 80,
    rank: 1,
    icon: "genetics",
    primary: "#2C4D20",
    secondary: "#377E4270",
    isactive: false,
  },
  {
    id: 4,
    name: "Biochimie Clinique",
    progress: 65,
    rank: 143,
    icon: "science",
    primary: "#44204D",
    secondary: "#70377E70",
    isactive: false,
  },
  {
    id: 5,
    name: "Tec & Communiation",
    progress: 47,
    rank: 50,
    icon: "computer",
    primary: "#19121B",
    secondary: "#30303070",
    isactive: false,
  },
  {
    id: 6,
    name: "Termino & Methodo",
    progress: 20,
    rank: 125,
    icon: "match_word",
    primary: "#826604",
    secondary: "#E1B51970",
    isactive: false,
  },
];

const semester = 1
const activeBtnIndex = 0
const Sidebar = ({onClick}) => {

  const [hoveredBtnId, setHoveredBtnId] = useState(null);
  const [btns, setbtns] = useState([{id: 0,icon: "Home",primary: "#70377E",secondary: "#70377E70",isactive: false,name:"Home"},...module]);
  
  // setting activeBtnIndex
  useEffect(() => {
    setbtns(prevbtns => prevbtns.map((btn,index)=>({...btn,isactive: activeBtnIndex === index ? true : false})))
  },[activeBtnIndex])

  // handling events 
  //! handling click button
  const handleBtnClick = (id)=>{
    setbtns(prevBtns => prevBtns.map(btn => ({...btn,isactive: btn.id == id ? true : false})));
  }


  //! handling hover effects
  const handleBtnEnter = (id) => {
    setHoveredBtnId(id);
  };
  const handleBtnLeave = () => {
    setHoveredBtnId(null);
  };


  return (
    <div className='app__sidebar'>

      <div className="app__sidebar-top">
        <p onClick={onClick}>S{semester}</p>
      </div>


      <div className="app__sidebar-middle">
        
        {btns.map(item => {
          const style = item.isactive
          ? { backgroundColor: item.secondary, color: item.primary }
          : hoveredBtnId === item.id
          ? { backgroundColor: item.secondary, color: item.primary }
          : { backgroundColor: "#F8F8F8", color: "#78768D" };
        return (
          <div className="app__sidebar-middle_link" style={style}  key={item.id} onMouseEnter={ () => handleBtnEnter(item.id)} onMouseLeave={ () => handleBtnLeave(item.id)}  onClick={() => handleBtnClick(item.id)}>
            <span className={item.id == 0 ? "material-symbols-rounded" : "material-symbols-outlined"} >{item.icon}</span>
            <span className='app__sidebar-middle_link-tooltip' style={{ backgroundColor: "white", color: item.primary,display : item.name ? "block" : "none", }}>{item?.name}</span>
          </div>
        )})}

      </div>


      <div className="app__sidebar-bottom">
        <div title='logout' className="app__sidebar-bottom_link">
          <span className="material-symbols-rounded">logout</span>
        </div>
      </div>
    </div>
  )
}

export default Sidebar