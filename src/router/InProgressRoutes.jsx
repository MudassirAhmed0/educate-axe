import React, { useEffect } from "react";
import { useSession } from "../firebase/UserProvider";
import { Navigate, Outlet } from 'react-router-dom'
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { dbase } from "../firebase";

const InProgressRoutes = () => {
  const user = useSession()
  const [isStudent,setIsStudent] = useState(false)
  const [isTeacher,setIsTeacher] = useState(false)
  const [isInProgress,setIsInProgress] = useState(false)


  useEffect(()=>{
    const checkingAccess = async()=>{
    if(user?.user?.uid){
        const studentRef = doc(dbase,'Students',user.user.uid)
        const studentSnap = await getDoc(studentRef)
        const teacherRef = doc(dbase,'Teachers',user.user.uid)
        const teacherSnap = await getDoc(teacherRef)
        if(studentSnap.exists()){
  
          setIsStudent(true)
        }else if(teacherSnap.exists()){
          setIsTeacher(true)
        }else{
          setIsInProgress(true)
        }
    }
}
checkingAccess()
    },[])

  

  if(!user?.user?.uid){
    return <Navigate to='/login'/>
}else if(isStudent){
    return <Navigate to='/join-class'/>

}else if(isTeacher){
      return <Navigate to='/create-class'/>
  }else if(isInProgress){
    return <Outlet/>
  }
}

export default InProgressRoutes