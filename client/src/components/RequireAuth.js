import React from 'react'
import { Navigate, Outlet,useLocation,} from 'react-router-dom'
import useAuth from "../hooks/useAuth"
const RequireAuth = ({Role="USER"}) => {
    const {auth} = useAuth()
    const location = useLocation()
    
    if (auth?.Role === "ADMIN" || auth?.Role ===  Role.toUpperCase()) {
        return <Outlet />;
    } else if (auth?.Email) {
        return <Navigate to={"/dashboard"} state={{ from: location }} replace />;
    } else {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

}

export default RequireAuth