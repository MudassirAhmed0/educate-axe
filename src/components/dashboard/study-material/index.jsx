import React, { useContext, useEffect, useState } from 'react'
import img from '../../../assets/images/dashboard/1.webp'
import CreateMaterialDialog from './CreateMaterialDialog'
import { useSession } from '../../../firebase/UserProvider';
import { dbase } from '../../../firebase';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import StudyMaterial from './StudyMaterial';
import MaterialsListComponent from './MaterialsListComponent';

const StudyMaterialHero = ({isTeacher}) => {
    const [studyMaterials,setStudyMaterials] = useState([])
    const [classroomId,setClassroomId] = useState('')
    const [materials,setMaterials] = useState([])
    const userSession = useSession()
    useEffect(()=>{
        const fetchClassroomId = async ()=>{
            const docRef = doc(dbase,isTeacher ? "Teachers":"Students",userSession?.user?.uid );
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {  
                 setClassroomId(docSnap.data().classroomIds[0])
                } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                }
        }
        fetchClassroomId()
    },[isTeacher])
    const fetchStudyMaterials = async ()=>{

        const docRef = collection(dbase, "Classrooms", classroomId,"StudyMaterialTopic");
        const docSnaps = await getDocs(docRef);
        let data =[]
        docSnaps?.forEach(docSnap =>{
            data.push(docSnap.data())
        })
        setStudyMaterials([...data])
         
       
    }
    useEffect(()=>{
       
        classroomId && fetchStudyMaterials()

    },[classroomId])

    const noMaterial = (<>
        <img
            src={img}
            className='w-[200px] mr-[20px]'
        />
        <span className=' mb-3 text-[20px] text-center' >
            No Study Material
        </span>
    </>)
    

    return (
        <section className='container flex flex-col items-center min-h-[60vh] py-[32px]'>
            <h2 className='text-[40px]   text-center  before:content-[""] relative before:absolute before:left-[50%] before:transform before:translate-x-[-50%] before:bottom-[0px] font-bold before:w-[45%] before:h-[2px] before:bg-black '>
                Study Material
            </h2>
           { !materials.length >0 &&
             <>
           <div className='flex w-[100%] flex-col gap-y-6 items-center  my-6'>

               {
                studyMaterials?.map(studyMaterial=>(
                    <StudyMaterial  isTeacher={isTeacher} fetchStudyMaterials={fetchStudyMaterials} setMaterials={setMaterials} classroomId={classroomId} key={studyMaterial.id} studyMaterial={studyMaterial}/>
                ))
              } 
             

                { studyMaterials.length > 0 || noMaterial }

            </div>
               { isTeacher && <CreateMaterialDialog fetchClasses={fetchStudyMaterials} classroomId={classroomId} />}
                </> 
                }
        </section>
    )
}

export default StudyMaterialHero