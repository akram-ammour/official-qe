import React, { useEffect, useState } from "react";
import "./users.css";
import ticked from '../../../assets/tick.svg'
import unticked from '../../../assets/untick.svg'
import EditUserPopup from "../../../components/Admin/editUserPopupp/EditUserPopup"
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { useLocation, useNavigate } from "react-router-dom";
const Box = ({ filter, isActive = false, onClick }) => {
    const handleClick = () => {
        onClick(filter);
      };
  return (
    <div className={`filter ${isActive ? "filter-active" : ""}`} onClick={handleClick}>{filter}</div>
  );
};



const UsersContainer = () => {
  const {auth} = useAuth()
  const axios = useAxios()
  const location = useLocation()
  const navigate = useNavigate()
  
    const [activeLevel, setActiveLevel] = useState('');
    const [activeSubscription, setActiveSubscription] = useState('');
    const [isNone, setisNone] = useState(true)
    const [query, setQuery] = useState('')
    const [data,setData] = useState([])
    const [popupType,setPopupType] = useState(0) // 0 is add 1 is edit
    const [Popup,setPopup] = useState(false)
    const [PopupInfos,setPopupInfos] = useState(null)


    useEffect(()=>{
      document.title ="e-qe Admin Users"
    },[])

    const SearchUsers = async ()=>{
      try {
          const response = await axios.get(`/users/search?q=${query.trim()}&y=${activeLevel}&s=${activeSubscription}`)
          // console.log(`/users/search?q=${query}&y=${activeLevel}&s=${activeSubscription}`)
          setData([...response.data])
      } catch (error) {
          console.log(error)
          if(error?.response?.status === 401){
            navigate("/signin",{state: {from:location},replace:true})
        }

      }
    }

    const handleSearch = (e)=>{
        e.preventDefault()
        SearchUsers()
    }
    const handleCreateUser =(e) =>{
      e.preventDefault()
      setPopupInfos(null)
      setPopup(true)
      setPopupType(0)
    }

    const LevelFilters = (filter) => {
        setActiveLevel(filter);
        setisNone(false)
        setPopup(false)
        SearchUsers()
      };
    
    const subscriptionFilter = (filter) => {
        setActiveSubscription(filter);
        setisNone(false)
        setPopup(false)
        SearchUsers()
      };
    const NullifyFilters = (filter) => {
        setisNone(true)
        setActiveSubscription('');
        setActiveLevel('');
        setPopup(false)
        SearchUsers()
      };




      const onUserDelete = () =>{
        setPopup(false)
        SearchUsers()
      }
      
      // const onUserAdded = () =>{
      //   setPopup(false)
      //   setPopup(true)
      //   setPopupType(1)
      // }
      
      useEffect(()=>{
          SearchUsers()
      },[query,activeLevel,activeSubscription])

      const handleUser = (value) =>{
        const userId = value
        setPopup(true)
        setPopupType(1)
        setPopupInfos(data.find(user => user.Id === userId))

      }




      const closePopup = ()=>{
        SearchUsers()
        setPopup(false)
        setPopupInfos(null)

      }
      const onUserAdd = async (data) =>{
          await SearchUsers()
          setPopup(false)
          setPopupInfos(data)
          setPopup(true)
          setPopupType(1)
      } 
  return (
    <div className="app__userscontainer">
      {Popup && <div className="overlay" />}
      <div className="infos">
        <div className="search">
          <form className="input-container" onSubmit={handleSearch}>
            <input type="text" placeholder="Search for a user..." value={query} onChange={e => setQuery(e.target.value)} autoFocus />
            <span onClick={handleSearch} className="material-symbols-outlined">search</span>
          </form>
          <button onClick={handleCreateUser}>Create User</button>
        </div>
        <div className="filters">
          <p><span>Filters</span> :</p>
          <div className="container">
            <Box filter={"1A"} onClick={e => LevelFilters("FIRST")} isActive={activeLevel === "FIRST"}/>
            <Box filter={"2A"} onClick={e => LevelFilters("SECOND")} isActive={activeLevel === "SECOND"}/>
            <Box filter={"3A"} onClick={e => LevelFilters("THIRD")} isActive={activeLevel === "THIRD"}/>
            <Box filter={"4A"} onClick={e => LevelFilters("FOURTH")} isActive={activeLevel === "FOURTH"}/>
            <Box filter={"5A"} onClick={e => LevelFilters('FIFTH')} isActive={activeLevel === "FIFTH"}/>
            <div className="line"/>
            <Box filter={"Free"}  onClick={e => subscriptionFilter('FREE')} isActive={activeSubscription === "FREE"}/>
            <Box filter={"Basic"}  onClick={e => subscriptionFilter('PAID')} isActive={activeSubscription === "PAID"}/>
            <Box filter={"Plus"}  onClick={e => subscriptionFilter('PLUS')} isActive={activeSubscription === "PLUS"}/>
            <div className="line"/>
            <Box filter={"None"} isActive={isNone} onClick={NullifyFilters}/>
          </div>
        </div>
      </div>
      <div className="table">
        <div className="wrapper">

        <table>
            <thead>
                <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Subscription</th>
                    <th>Année d'étude</th>
                    <th>Semester 1</th>
                    <th>Semester 2</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map(row =>(
                        <tr key={row.Id} onClick={e => handleUser(row.Id)}>
                            <td>{row.Fname + " " + row.Lname}</td>
                            <td>{row.Email}</td>
                            <td>{row.Subscription == "PAID" ? "BASIC" :row.Subscription}</td>
                            <td>{row.Plan}</td>
                            <td>{row.Semester1 ? <img src={ticked}/> : <img src={unticked}/>}</td>
                            <td>{row.Semester2 ? <img src={ticked}/> : <img src={unticked}/>}</td>
                        </tr>
                    ))
                }

            </tbody>
        </table>

        </div>
      </div>
{/* here i will put the dialog popup */}
      {Popup && (
        //onAdd={onUserAdded}
        <EditUserPopup onClose={closePopup} type={popupType} infos={PopupInfos} onDelete={onUserDelete} search={SearchUsers} onAdd={onUserAdd}/>
      )}
    </div>
  );
};

export default UsersContainer;
