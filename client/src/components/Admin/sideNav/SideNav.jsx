import React, { useEffect } from "react";
import "./sideNav.css";
import img from "../../../assets/photo.png";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";

const SideNav = ({ activeBtn = 0,pageSub, children }) => {
  const {auth,setAuth} = useAuth()
  const axios = useAxios()
  const navigate = useNavigate()
  const location = useLocation()


  useEffect(()=>{
    const getUserInfos = async() =>{
        try{
            const response = await axios.get("/auth/user")
            setAuth(prev => ({...prev,...response?.data?.user}))
        }
        catch (error){
            console.log(error)
            if(error?.response?.status === 401){
              navigate("/signin",{state: {from:location},replace:true})
          }

        }
    }
    !auth?.Fname && getUserInfos()
},[auth])
  const handleClick = (index) => {
    switch (index) {
      case 0:
        navigate("/admin/home")
        break;
      case 1:
        navigate("/admin/edit")
        break;
      case 2:
          navigate("/admin/users")
          break;
        case 3:
            navigate("/admin/signals")
        break;
      default:
        navigate("/admin/home")
        break;
    }
  };

  return (
    <div className="app__sidenav">
      <div className="app__sidenav-sidebarcontainer">
        <div className="btns">
          <div
            className="btn"
            style={{
              color: activeBtn === 0 ? "#C738B9" : null,
              backgroundColor: activeBtn === 0 ? "#EEBEFF" : null,
            }}
            onClick={() => handleClick(0)}
          >
            <span className="material-symbols-outlined">home</span>
          </div>
          <div
            className="btn"
            style={{
              color: activeBtn === 1 ? "#0066FF" : null,
              backgroundColor: activeBtn === 1 ? "#BED8FF" : null,
            }}
            onClick={() => handleClick(1)}
          >
            <span className="material-symbols-outlined">post_add</span>
          </div>
          <div
            className="btn"
            style={{
              color: activeBtn === 2 ? "#28AD35" : null,
              backgroundColor: activeBtn === 2 ? "#C7FFBE" : null,
            }}
            onClick={() => handleClick(2)}
          >
            <span className="material-symbols-outlined">person</span>
          </div>
          <div
            className="btn"
            style={{
              color: activeBtn === 3 ? "#AD2828" : null,
              backgroundColor: activeBtn === 3 ? "#FFBEBE" : null,
            }}
            onClick={() => handleClick(3)}
          >
            <span className="material-symbols-outlined">feedback</span>
            <span
              className="badgenb"
              style={{ backgroundColor: activeBtn === 3 ? "#FF3232" : null }}
            >
              2
            </span>
          </div>
          <div
            className="btn"
            onClick={() => navigate("/dashboard")}
          >
            <span className="material-symbols-outlined">dashboard</span>
          </div>
        </div>
      </div>
      <div className="app__sidenav-navbarcontainer">
        <div className="nav">
          <div className="left">
            <h1>Dashboard</h1>
            <p>{pageSub}</p>
          </div>
          <div className="right">
            <div className="text">
              <h3>hey, {auth?.Fname}</h3>
              <p>admin</p>
            </div>
            <div className="img">
              <img src={img} alt="Profile" />
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default SideNav;
