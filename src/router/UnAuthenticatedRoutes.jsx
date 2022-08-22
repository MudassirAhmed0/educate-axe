import React from "react";
import { useSession } from "../firebase/UserProvider";
import { Navigate, Outlet } from 'react-router-dom'

const UnAuthenticatedRoutes = () => {
  const user = useSession()
return (
    !user.user ? <Outlet/> : <Navigate to='/'/>
  )
}

export default UnAuthenticatedRoutes