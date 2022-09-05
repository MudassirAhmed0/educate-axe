import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import StudyMaterialHero from '../../components/dashboard/study-material'
import Bookmarks from '../../components/common/Bookmarks'
import { useSession } from '../../firebase/UserProvider'
import { doc, getDoc } from 'firebase/firestore'
import { dbase } from '../../firebase'

const StudyMaterial = () => {
    const [isTeacher,setIsTeacher] = useState(false) 
    const user = useSession()
  
    useEffect(()=>{
      const checkingAccess = async()=>{
       
           
          const teacherRef = doc(dbase,'Teachers',user.user.uid)
          const teacherSnap = await getDoc(teacherRef)
           if(teacherSnap.exists()){
            setIsTeacher(true)
          } else{
            setIsTeacher(false) 
          }
     
  }
  checkingAccess()
      },[])
    return (
        <Layout>
            <Bookmarks bookmarks={[['Dashboard','/dashboard'],["Study Material"]]} container={"w-[100%] max-w-[800px]   mx-auto"}/>
            <StudyMaterialHero isTeacher={isTeacher}/>
        </Layout>
    )
}

export default StudyMaterial