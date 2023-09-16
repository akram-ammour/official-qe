import React, { useEffect, useState } from "react";
import "./modulepopup.css";
import PopupBaseComponent from "../popupbasecomponent/PopupBaseComponent";
import LineProgress from "../lineprogress/LineProgress";
import { useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import useRanking from "../../hooks/useRanking";

const ModulePopup = ({ title = "Progress Pannel", onClose, infos}) => {
  const {auth,setAuth} = useAuth() // auth 
  const userId = auth?.Id; // user Id
  const {getSpecificRanking} = useRanking() 
  
  const [moduleRanking,setModuleRanking] = useState()

  const axios = useAxios()
  const location = useLocation()
  const navigate = useNavigate()

  // theme and colors
  const theme = useSelector((state) => state.theme);
  const color = theme.Colors[infos.color];

  const moduleId = infos.Id; // moduleId
  
  const [data, setdata] = useState({});
  useEffect(() => {
    axios
      .get(
        `/questions/progress/stats?moduleId=${moduleId}&userId=${userId}`)
      .then((res) => {
        setdata(res.data);
        
      })
      .catch((err) => {
        console.log(err)
        if(err?.response?.status === 401){
          navigate("/signin",{state: {from:location},replace:true})
      }

      });

  }, [moduleId,auth?.Id]);
  useEffect(()=>{
    if(!moduleRanking && userId !== undefined && auth?.accessToken){
      getSpecificRanking(userId,moduleId,navigate,location).then(res =>{
        setModuleRanking(res)
      })
    }
  },[moduleRanking,auth?.Id,auth?.accessToken])
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--scrollbar-thumb-color",
      color.primary
    );
    document.documentElement.style.setProperty(
      "--scrollbar-thumb-color--hover",
      `${color.primary}ef`
    );
  }, [color]);
  return (
    <PopupBaseComponent title={title} onClose={onClose} color={color.primary}>
      <div className="app__popupbasecomponent-content_moduleinfo">
        <span
          className="material-symbols-rounded"
          style={{ color: color.primary }}
        >
          {infos.Icon}
        </span>
        <div className="infos">
          <p style={{ color: color.primary }}>{infos.Title}</p>
          <p style={{ color: color.primary }}>{!moduleRanking?.ranking ? "?/? searching..." : `${moduleRanking?.ranking?.userRank}/${moduleRanking?.ranking?.totalUsers}`}</p>
          {/* {
    "ranking": {
        "userRank": 4,
        "totalUsers": 4
    },
    "title": {
        "title": "Noob",
        "percentage": 0
    }
} */}
          <p style={{ color: color.primary }}>{moduleRanking?.title?.title || "searching..."}</p>
        </div>
      </div>
      <div className="app__popupbasecomponent-content_moduleinfo-progress">
        <div className="myprogress">
          <p>Your Progress</p>
          <div className="progress">
            {data &&
              data?.courses?.map((course,index) => (
                <LineProgress
                key={index}

                  color={color.primary}
                  percentage={course.UserPercentage}
                  title={course.title}
                />
              ))}
            {data &&
                <LineProgress
                color={color.primary}
                percentage={data?.total?.totalUserPercentage || 0}
                title={"total"}/>
              }

          </div>
        </div>
        <div className="promoprogress">
          <p>Promo Progress</p>
            <div className="progress">
            {data &&
              data?.courses?.map((course,index) => (
                <LineProgress
                key={index}
                  color={color.primary}
                  percentage={course.PromoPercentage || 0}
                  title={course.title}
                />
              ))}
            {data && (
                <LineProgress
                color={color.primary}
                percentage={data?.total?.totalPromoPercentage || 0}
                title={"total"}/>)
              }
  
            </div>
        </div>
      </div>
    </PopupBaseComponent>
  );
};

export default ModulePopup;
