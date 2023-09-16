import React, { useEffect, useState } from "react";
import PopupBaseComponent from "../../popupbasecomponent/PopupBaseComponent";
import "./edituserpopup.css";
import { toast } from "react-toastify";
import {LineProgress} from "../../../components";
import { CancelButton } from "../../../components";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { useLocation, useNavigate } from "react-router-dom";


const colors = [
  "#ADD628", // Analogous
  "#286AAD", // Analogous
  "#35AD28", // Green
  "#28AD8F", // Teal
  "#ADAD28", // Yellow
  "#282AAD", // Blue
  "#AD5728", // Amber
  "#5EAD28", // Green
  "#AD2860", // Rose
  "#287AAD", // Blue
  "#AD8F28", // Gold
  "#AD6D28", // Bronze
  "#2828AD", // Indigo
  "#28ADA6", // Cyan
  "#AD285B", // Coral
  "#AD8B28", // Mustard
  "#AD282E", // Reddish Orange
  "#AD28A3", // Purple
  "#2B28AD", // Blue
  "#AD28AF", // Pink
];

const EditUserPopup = ({ onClose, type = 0, infos,onDelete,search,onAdd }) => {
  const {auth} = useAuth()
  const axios = useAxios()

  const location = useLocation()
  const navigate = useNavigate()

  const [userInfos, setUserInfos] = useState({...infos});
  const [activeTab, setActiveTab] = useState(0);
  const [randomColor,setRandomColor] = useState("")
  const [passwords,setPasswords] = useState({
    password:"",
    confirm:""
  })
  useEffect(() => {
    setUserInfos((prevUserInfos) => ({ ...prevUserInfos, ...infos }));
  }, [infos]);

useEffect(() => {
  if (userInfos.Email) {
    const len = userInfos.Email.length;
    const index = len % colors.length;
    setRandomColor(colors[index]);
  } else {
    setRandomColor("#28AD35");
  }
}, [userInfos.Email]);

  function translateToNumber(str) {
    const lowerCaseStr = str?.toLowerCase();
    
    switch (lowerCaseStr) {
      case "first":
        return 1;
      case "second":
        return 2;
      case "third":
        return 3;
      case "fourth":
        return 4;
      case "fifth":
        return 5;
      default:
        return NaN; // Invalid input
    }
  }
  const handleCheckboxClick = (value) => {
    switch (value) {
      case 0:
        setUserInfos((prev) => ({ ...prev, Semester1: !prev.Semester1 }));
        break;
      case 1:
        setUserInfos((prev) => ({ ...prev, Semester2: !prev.Semester2 }));
        break;
      default:
        break;
    }
  };
  const handleSelects = (e) =>{
    setUserInfos((prev) => ({...prev,[e.target.name]:e.target.value}))
  }

  function getInitials(fullName) {
    if (!fullName.trim() ) {
      return "?";
    } else {
      const names = fullName.split(" ");
      const initials = names
        .map((name) => name.charAt(0).toUpperCase())
        .join("");
      return initials;
    }
  }

  // useEffect(() => {
  //   if(userInfos.Email){
  //     const len = userInfos.Email.length  
  //     const index = len % colors.length;
  //     setRandomColor(colors[index]);
  //   }
  //   else{
  //     setRandomColor("#28AD35")
  //   }
  // }, [userInfos]);


  const deleteUser = async () =>{

    try{
      const response = await axios.delete(`/users/${userInfos.Id}`)

      if(response?.data?.status === "success"){
        search()
        onDelete()
        toast.success(response?.data?.message)
      }
      if(response?.data?.status === 401){
        search()
        toast.success(response?.data?.message)
      }
    }
    catch(error){
      console.error(error)
        if(error?.response?.status === 401){
          navigate("/signin",{state: {from:location},replace:true})
      }

    }
  }

  const saveData = async () =>{
    try{
      const response = await axios.patch(`/users/${userInfos.Id}`,userInfos)
      // do stuff
      if(response?.data?.status === "success"){
        search()
        toast.success(response?.data?.message)
      }
      if(response?.data?.status === "Info"){
        toast.info(response?.data?.message)
      }
    }
    catch(error){
      console.error(error)
      if(error?.response?.status === 401){
        navigate("/signin",{state: {from:location},replace:true})
    }

    }
  }
  const updatePassword = async () =>{
    if (passwords.password.includes(" ") || passwords.confirm.includes(" ")) {
      toast.error("Passwords cannot contain spaces");
      return;
    }
    if(passwords.password === ""){
      toast.error("be sure to fill all the fields");
      return;
    }
    //check contains spaces password
    if(passwords.password === passwords.confirm){
      try{
        const response = await axios.patch(`/users/password`,{
          userId:userInfos.Id,
          password:passwords.password
        })
        if(response?.data?.status === "success"){
          search()
          toast.success(response?.data?.message)
          const interval = setInterval(() => {
            setPasswords({ password: "", confirm: "" });
            clearInterval(interval); // Clear the interval after resetting the passwords
          }, 6000);
        }

      }
      catch(error){
        console.error(error)
        if(error?.response?.status === 401){
          navigate("/signin",{state: {from:location},replace:true})
      }

      }
    }
    else{
      toast.error("warning: passwords do not match be cautious with changing password")
    }
  }
  // app__popupbasecomponent-content classname

  const addUser = async () =>{
    if (passwords.password.includes(" ") || passwords.confirm.includes(" ")) {
      toast.error("Passwords cannot contain spaces");
      return;
    }
    if(passwords.password !=passwords.confirm){
      toast.error("Passwords do not match");
      return;
    }

    if(userInfos.Fname && userInfos.Lname && userInfos.Email && userInfos.Subscription && userInfos.Plan && passwords.password && passwords.confirm){
      
      
      try{
      const response = await axios.post(`/users/`,{
        ...userInfos,
        password:passwords.password
      })
        if(response?.data?.status === "success"){
          toast.success("User created successfully")
          search()
          // setUserInfos({})
          setPasswords({
            password:"",
            confirm:""
          })
          onAdd(response.data?.infos)
        }
        else if (response?.data?.status === "exists"){
          toast.error("Email already exists");
          return;
        }
        else{
          toast.error("Something went wrong try again")
        }
    }
    catch (error){
    console.log(error)
      if(error?.response?.status === 401){
        navigate("/signin",{state: {from:location},replace:true})
    }

    }

    }
    else{
        toast.error("be sure to fill all the fields");
        return;
    }
  }
  return (
    <PopupBaseComponent
      title={type == 0 ? "Add User" : "Profile"}
      onClose={onClose}
      color={type === 0 ? "#28AD35" : randomColor}
    >
      {type !== 0 ? ( // type  1 means Profile so that means there is only two buttons gonna try with one
        <>
          <div className="edit-user">
            <div className="image" style={{ backgroundColor: randomColor }}>
              {getInitials(`${userInfos.Fname} ${userInfos.Lname}`)}
            </div>
            <div className="user-infos">
              <h1>{`${userInfos.Fname} ${userInfos.Lname} ${translateToNumber(userInfos.Plan)}A`}</h1>
              <h3>{userInfos.Email}</h3>
              <p>
                <span
                  style={
                    activeTab === 0
                      ? { fontWeight: "bold", color: "black" }
                      : {}
                  }
                  onClick={() => setActiveTab(0)}
                >
                  INFOS
                </span>
                |
                <span
                  style={
                    activeTab === 1
                      ? { fontWeight: "bold", color: "black" }
                      : {}
                  }
                  onClick={() => setActiveTab(1)}
                >
                  STATS
                </span>
                |
                <span
                  style={
                    activeTab === 2
                      ? { fontWeight: "bold", color: "black" }
                      : {}
                  }
                  onClick={() => setActiveTab(2)}
                >
                  PASSWORD
                </span>
              </p>
            </div>
          </div>
          <div className="infos-stats" style={
            {
              overflow:activeTab === 1 ? "scroll" : "",
              height:activeTab === 1 ? "75%" : "",
              paddingRight:activeTab === 1 ? "20px" : ""}}>
            {activeTab === 0 && (
              <>
              <div className="infos">
                    <div className="selects">

                        <div className="select">
                          <p>Year :</p>
                          <select name="Plan" value={userInfos.Plan || ""} onChange={e => handleSelects(e)}>
                            <option value="">selectionner une année</option>
                            <option value="FIRST">1A</option>
                            <option value="SECOND">2A</option>
                            <option value="THIRD">3A</option>
                            <option value="FOURTH">4A</option>
                            <option value="FIFTH">5A</option>
                          </select>
                        </div>
                        <div className="select">
                          <p>subscription :</p>
                          <select name="Subscription" value={userInfos.Subscription || ""} onChange={e => handleSelects(e)}>
                            <option value="">select a subscription plan</option>
                            <option value="FREE">FREE</option>
                            <option value="PAID">BASIC</option>
                            <option value="PLUS">PLUS</option>
                          </select>
                        </div>
                    </div>

                     <div className="options">
                      <div className="option">
                        <p>Semester 1 :</p>
                        <div className="checkbox" style={{borderColor: randomColor}} onClick={() => handleCheckboxClick(0)}>
                          {userInfos.Semester1 ? (
                            <div className="checked" style={{backgroundColor: randomColor}}/>
                            ): null}
                        </div>
                      </div>
                      <div className="option">
                        <p>Semester 2 :</p>
                        <div className="checkbox" style={{borderColor: randomColor}} onClick={() => handleCheckboxClick(1)}>
                        {userInfos.Semester2 ? (
                          <div className="checked" style={{backgroundColor: randomColor}}/>
                          ): null}
                        </div>
                      </div>
                     </div>
              </div>
              <div className="buttons-container">
                {/* <button style={{backgroundColor:randomColor}} onClick={saveData}>Save</button> */}
                <CancelButton backgroundColor={randomColor}  sendRequest={saveData} />
                <CancelButton backgroundColor={"#AD2828"}  sendRequest={deleteUser} text="Delete"/>
                {/* <button style={{backgroundColor:"#AD2828"}} onClick={deleteUser}>Delete</button> */}
              </div>
              </>
            ) }
            {activeTab== 1 && (
              <div className="stats">
                <div className="semestre1">
                  <p>Semestre {translateToNumber(userInfos.Plan)}</p>
                  <div className="stats-container">
                  <LineProgress
                  color={colors[0]}
                  percentage={20}
                  title={"hello"}
                />
                  <LineProgress
                  color={colors[1]}
                  percentage={50}
                  title={"hello2"}
                />
                  <LineProgress
                  color={colors[2]}
                  percentage={40}
                  title={"hello3"}
                />
                  <LineProgress 
                  color={colors[3]}
                  percentage={10}
                  title={"hello4"}
                />
                  <LineProgress
                  color={colors[0]}
                  percentage={20}
                  title={"hello"}
                />
                  <LineProgress
                  color={colors[1]}
                  percentage={50}
                  title={"hello2"}
                />
                  <LineProgress
                  color={colors[2]}
                  percentage={40}
                  title={"hello3"}
                />
                  <LineProgress 
                  color={colors[3]}
                  percentage={10}
                  title={"hello4"}
                />
                  <LineProgress
                  color={colors[0]}
                  percentage={20}
                  title={"hello"}
                />
                  <LineProgress
                  color={colors[1]}
                  percentage={50}
                  title={"hello2"}
                />
                  <LineProgress
                  color={colors[2]}
                  percentage={40}
                  title={"hello3"}
                />
                  <LineProgress 
                  color={colors[3]}
                  percentage={10}
                  title={"hello4"}
                />
                  <LineProgress
                  color={colors[0]}
                  percentage={20}
                  title={"hello"}
                />
                  <LineProgress
                  color={colors[1]}
                  percentage={50}
                  title={"hello2"}
                />
                  <LineProgress
                  color={colors[2]}
                  percentage={40}
                  title={"hello3"}
                />
                  <LineProgress 
                  color={colors[3]}
                  percentage={10}
                  title={"hello4"}
                />
                  <LineProgress
                  color={colors[0]}
                  percentage={20}
                  title={"hello"}
                />
                  <LineProgress
                  color={colors[1]}
                  percentage={50}
                  title={"hello2"}
                />
                  <LineProgress
                  color={colors[2]}
                  percentage={40}
                  title={"hello3"}
                />
                  <LineProgress 
                  color={colors[3]}
                  percentage={10}
                  title={"hello4"}
                />
                  <LineProgress
                  color={colors[0]}
                  percentage={20}
                  title={"hello"}
                />
                  <LineProgress
                  color={colors[1]}
                  percentage={50}
                  title={"hello2"}
                />
                  <LineProgress
                  color={colors[2]}
                  percentage={40}
                  title={"hello3"}
                />
                  <LineProgress 
                  color={colors[3]}
                  percentage={10}
                  title={"total"}
                />
                  </div>
                </div>
                <div className="semestre2">
                  <p>Semestre {translateToNumber(userInfos.Plan) * 2}</p>
                  <div className="stats-container">
                  <LineProgress
                  color={colors[0]}
                  percentage={20}
                  title={"hello"}
                />
                  <LineProgress
                  color={colors[1]}
                  percentage={50}
                  title={"hello2"}
                />
                  <LineProgress
                  color={colors[2]}
                  percentage={40}
                  title={"hello3"}
                />
                  <LineProgress 
                  color={colors[3]}
                  percentage={10}
                  title={"hello4"}
                />
                  <LineProgress
                  color={colors[0]}
                  percentage={20}
                  title={"hello"}
                />
                  <LineProgress
                  color={colors[1]}
                  percentage={50}
                  title={"hello2"}
                />
                  <LineProgress
                  color={colors[2]}
                  percentage={40}
                  title={"hello3"}
                />
                  <LineProgress 
                  color={colors[3]}
                  percentage={10}
                  title={"hello4"}
                />
                  <LineProgress
                  color={colors[0]}
                  percentage={20}
                  title={"hello"}
                />
                  <LineProgress
                  color={colors[1]}
                  percentage={50}
                  title={"hello2"}
                />
                  <LineProgress
                  color={colors[2]}
                  percentage={40}
                  title={"hello3"}
                />
                  <LineProgress 
                  color={colors[3]}
                  percentage={10}
                  title={"hello4"}
                />
                  <LineProgress
                  color={colors[0]}
                  percentage={20}
                  title={"hello"}
                />
                  <LineProgress
                  color={colors[1]}
                  percentage={50}
                  title={"hello2"}
                />
                  <LineProgress
                  color={colors[2]}
                  percentage={40}
                  title={"hello3"}
                />
                  <LineProgress 
                  color={colors[3]}
                  percentage={10}
                  title={"hello4"}
                />
                  <LineProgress
                  color={colors[0]}
                  percentage={20}
                  title={"hello"}
                />
                  <LineProgress
                  color={colors[1]}
                  percentage={50}
                  title={"hello2"}
                />
                  <LineProgress
                  color={colors[2]}
                  percentage={40}
                  title={"hello3"}
                />
                  <LineProgress 
                  color={colors[3]}
                  percentage={10}
                  title={"hello4"}
                />
                  <LineProgress
                  color={colors[0]}
                  percentage={20}
                  title={"hello"}
                />
                  <LineProgress
                  color={colors[1]}
                  percentage={50}
                  title={"hello2"}
                />
                  <LineProgress
                  color={colors[2]}
                  percentage={40}
                  title={"hello3"}
                />
                  <LineProgress 
                  color={colors[3]}
                  percentage={10}
                  title={"hello4"}
                />
                  </div>
                </div>
              </div>
            )}
            {activeTab== 2 && (
              <div className="pass">
                <input type="text" placeholder="Password"  value={passwords.password} onChange={(e) => setPasswords((prev)=> ({...prev,password:e.target.value}))} autoFocus/>
                <input type="text" placeholder="Confirm Password" value={passwords.confirm} onChange={(e) => setPasswords((prev)=> ({...prev,confirm:e.target.value}))} />
                {/* <button onClick={updatePassword} >update Password</button> */}
                <CancelButton backgroundColor={"black"}  sendRequest={updatePassword}  text="update Password"/>

              </div>
            )}
          </div>
        </>
      ) : (
        <>
        <div className="add-user">
          <div className="image">{getInitials(`${userInfos.Fname || ""} ${userInfos.Lname || ""}`)}</div>
          <div className="user-infos">
            <div className="credentials">
              <input type="text" placeholder="First Name"  value={userInfos.Fname || ""} onChange={(e) => setUserInfos((prev)=> ({...prev,Fname:e.target.value}))}  autoFocus/>
              <input type="text" placeholder="Last Name"  value={userInfos.Lname || ""} onChange={(e) => setUserInfos((prev)=> ({...prev,Lname:e.target.value}))} />
              <input type="text" placeholder="Email" value={userInfos.Email || ""}  onChange={(e) => setUserInfos((prev)=> ({...prev,Email:e.target.value}))}/>
            </div>
            <div className="passwords">
            <input type="text" placeholder="Password"  value={passwords.password} onChange={(e) => setPasswords((prev)=> ({...prev,password:e.target.value}))} />
                <input type="text" placeholder="Confirm Password" value={passwords.confirm} onChange={(e) => setPasswords((prev)=> ({...prev,confirm:e.target.value}))} />
            </div>
          </div>
        </div>
        <div className="infos-parent">
              <div className="infos">
                    <div className="selects">

                        <div className="select">
                          <p>Year :</p>
                          <select name="Plan" value={userInfos.Plan || ""} onChange={e => handleSelects(e)}>
                            <option value="">selectionner une année</option>
                            <option value="FIRST">1A</option>
                            <option value="SECOND">2A</option>
                            <option value="THIRD">3A</option>
                            <option value="FOURTH">4A</option>
                            <option value="FIFTH">5A</option>
                          </select>
                        </div>
                        <div className="select">
                          <p>subscription :</p>
                          <select name="Subscription" value={userInfos.Subscription || ""} onChange={e => handleSelects(e)}>
                            <option value="">select a subscription plan</option>
                            <option value="FREE">FREE</option>
                            <option value="PAID">BASIC</option>
                            <option value="PLUS">PLUS</option>
                          </select>
                        </div>
                    </div>

                     <div className="options">
                      <div className="option">
                        <p>Semester 1 :</p>
                        <div className="checkbox" style={{borderColor: "#0055D5"}} onClick={() => handleCheckboxClick(0)}>
                          {userInfos.Semester1 ? (
                            <div className="checked" style={{backgroundColor: "#0055D5"}}/>
                            ): null}
                        </div>
                      </div>
                      <div className="option">
                        <p>Semester 2 :</p>
                        <div className="checkbox" style={{borderColor: "#0055D5"}} onClick={() => handleCheckboxClick(1)}>
                        {userInfos.Semester2 ? (
                          <div className="checked" style={{backgroundColor: "#0055D5"}}/>
                          ): null}
                        </div>
                      </div>
                     </div>
              </div>
              <div className="buttons-container">
                {/* <button style={{backgroundColor:"#28AD35"}} onClick={addUser}>Save</button> */}
                <CancelButton backgroundColor={"#28AD35"}  sendRequest={addUser}/>

              </div>
          </div>
        </>
        
      )}
    </PopupBaseComponent>
  );
};

export default EditUserPopup;
