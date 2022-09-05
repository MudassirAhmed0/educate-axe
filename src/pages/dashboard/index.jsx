import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { useState } from 'react'
import DashboardHeaderSlider from '../../components/dashboard/home/DashboardHeaderSlider'
import DashboardOverview from '../../components/dashboard/home/DashboardOverview'
import ShareClassRoomIdCTA from '../../components/dashboard/home/ShareClassRoomIdCTA' 
import Timetable from '../../components/dashboard/home/Timetable'
import Layout from '../../components/layout/Layout'
import Video from '../../components/video/Video'
import { dbase } from '../../firebase'
import { useSession } from '../../firebase/UserProvider'

const DashboardHome = () => {
  const [isTeacher,setIsTeacher] = useState(false)
  const [classroomId,setClassroomId] = useState('')
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

    useEffect(()=>{
      const fetchClassroomId = async ()=>{
          const docRef = doc(dbase,isTeacher ? "Teachers":"Students",user?.user?.uid );
              const docSnap = await getDoc(docRef);
              
              if (docSnap.exists()) {  
            
               setClassroomId(docSnap.data().classroomIds[0])
              } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
              }
      }
      fetchClassroomId()
  },[user,isTeacher])
  return (
    <Layout>
        <DashboardHeaderSlider classroomId={classroomId} isTeacher={isTeacher}/>
        <DashboardOverview />
        <Video>
        <h2 className='text-[40px]  mb-[32px] text-center  before:content-[""] relative before:absolute before:left-[50%] before:transform before:translate-x-[-50%] before:bottom-[3px] font-bold before:w-[45%] before:h-[2px] before:bg-black '>
            How to Use
         </h2>
        </Video>
        <ShareClassRoomIdCTA/>
        <Timetable classroomId={classroomId} isTeacher={isTeacher}/> 
    </Layout>
  )
}

export default DashboardHome