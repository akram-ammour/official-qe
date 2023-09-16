import React from 'react'
import useAuth from '../hooks/useAuth'
import axios from 'axios'
const useRefreshToken = () => {
    const {setAuth} = useAuth()
    const refresh = async ()=>{
        const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/auth/refresh`)
        setAuth(prev => ({...prev,accessToken:response.data.accessToken,Role:response.data.Role}))
        return response.data.accessToken
    }
  return refresh
}

export default useRefreshToken