import axios from "axios";
import { useEffect } from "react";
import useRefreshToken from "../components/useRefreshToken";
import useAuth from "./useAuth";

const useAxios = () => {
    const refresh = useRefreshToken()
    const {auth} = useAuth()    
    const api = axios.create({
        baseURL:`${process.env.REACT_APP_API_ENDPOINT}`
    })
    useEffect(()=>{
        const requestInterceptors = api.interceptors.request.use(
            config => {
                if(!config.headers["Authorization"]){
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
                }
                return config
            }, (error) => Promise.reject(error)

        )
        const responseInterceptors = api.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config
                if(error?.response?.status === 403 && !prevRequest.sent) {
                    prevRequest.sent = true
                    const newAccessToken = await refresh()
                    prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`
                    return api(prevRequest)
                }
                return Promise.reject(error)
            }
        ) 

        return () => {
            api.interceptors.request.eject(requestInterceptors)
            api.interceptors.response.eject(responseInterceptors)
        }
    },[auth,refresh])
    return api
}

export default useAxios