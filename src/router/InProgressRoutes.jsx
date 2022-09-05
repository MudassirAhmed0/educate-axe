import React, { useEffect } from "react";
import { useSession } from "../firebase/UserProvider";
import { Navigate, Outlet } from 'react-router-dom'
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { dbase } from "../firebase";

const InProgressRoutes = () => {
  const user = useSession()
  const [isStudent, setIsStudent] = useState(false)
  const [isTeacher, setIsTeacher] = useState(false)
  const [isInProgress, setIsInProgress] = useState(false)
  const [isClasses,setIsClasses] = useState(false) 

  useEffect(() => {
    const checkingAccess = async () => {
      if (user?.user?.uid) {
        const studentRef = doc(dbase, 'Students', user.user.uid)
        const studentSnap = await getDoc(studentRef)
        const teacherRef = doc(dbase, 'Teachers', user.user.uid)
        const teacherSnap = await getDoc(teacherRef)
        if (studentSnap.exists()) {
          if( studentSnap.data().classroomIds.length > 0){
            setIsClasses(true)
          }
          setIsStudent(true)
        } else if (teacherSnap.exists()) {
          if( teacherSnap.data().classroomIds.length > 0){
            setIsClasses(true)
          }
          setIsTeacher(true)
        } else {
          setIsInProgress(true)
        }
      }
    }
    checkingAccess()
  }, [])

  

  if(!user?.user?.uid){
    return <Navigate to='/login'/>
}else if(isClasses){
  return <Navigate to='/dashboard'/>
}else if(isStudent){
    return <Navigate to='/join-class'/>

}else if(isTeacher){
      return <Navigate to='/create-class'/>
  }else if(isInProgress){
    return <Outlet/>
  }
}

export default InProgressRoutes