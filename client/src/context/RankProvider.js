import { createContext, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";

const rankContext = createContext({});

export const RankProvider = ({ children }) => {
    const [ranking,setRanking] = useState()
    const {auth} = useAuth()
    const axios = useAxios()

    // get specific ranking 
    // get global ranking 
    // get
    const getUserGlobalRanking = async (userId,navigate,location)=>{
        try{
              //   //send points
        const response = await axios.get(`/ranking/${userId}`,{
          headers:{
            "Authorization": `Bearer ${auth?.accessToken}`
          }
        })
          setRanking(response?.data)
          return response?.data
        }

        catch (err) {
        //   if(err?.response?.status === 401){
        //     navigate("/signin",{state: {from:location},replace:true})
        // }
        }

        
    }

    const createPoints = async (userId,params,navigate,location)=>{
      try{
        //   //send points
        const response = await axios.post(`/ranking/${userId}`,params,{
          headers:{
            "Authorization": `Bearer ${auth?.accessToken}`
          }
        })
        }

        catch (err) {
        //   if(err?.response?.status === 401 ){
        //     navigate("/signin",{state: {from:location},replace:true})
        // }
        }
    }
    
    const getSpecificRanking = async (userId,moduleId,navigate,location)=>{
        ///:userId/:moduleId
        try{
            //   //send points
      const response = await axios.get(`/ranking/${userId}/${moduleId}`,{
        headers:{
          "Authorization": `Bearer ${auth?.accessToken}`
        }
      })
        // setRanking(response?.data)
        return response?.data?.data
      }
      catch (err){
      //   if(err?.response?.status === 401){
      //     navigate("/signin",{state: {from:location},replace:true})
      // }
      }

    }

    return (
        <rankContext.Provider value={{ranking,setRanking,getUserGlobalRanking,getSpecificRanking,createPoints}}>
            {children}
        </rankContext.Provider>
    )
}

export default rankContext;