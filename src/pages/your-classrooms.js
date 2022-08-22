import SchoolIcon from "@mui/icons-material/School";
import Layout from "../components/layout/Layout";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import CancelIcon from "@mui/icons-material/Cancel";
import teacherPng from "../assets/images/teacher.png";
import studentPng from "../assets/images/student.png";
import { addDoc, setDoc, collection, doc, getDocs, getDoc } from "firebase/firestore";
import { dbase } from "../firebase";
import { useEffect, useState } from "react";
import { useSession } from "../firebase/UserProvider";
import { Link } from "react-router-dom";

function YourClassrooms() {
    const user = useSession()
    const [userStatus,setUserStatus] = useState(null)
    const [classesData,setClassesData] = useState([])
    const [btn,setBtn] = useState({link:"#",text:"Classroom"})
     
    useEffect(()=>{
        let status ;

        const settingStatus = async()=>{
        if(user?.user?.uid){
            const studentRef = doc(dbase,'Students',user.user.uid)
            const studentSnap = await getDoc(studentRef)
            const teacherRef = doc(dbase,'Teachers',user.user.uid)
            const teacherSnap = await getDoc(teacherRef)
            if(studentSnap.exists()){
                status= "Students"
                setUserStatus("Students")
            }else if(teacherSnap.exists()){
                status= "Teachers"

                setUserStatus("Teachers")
            } 
        }
        return status
    }
    settingStatus()
    .then(async (status)=>{ 
        let userRef = doc(dbase,status,user.user.uid)   
        let userSnap = await getDoc(userRef)
        let userClasses = userSnap.data().classroomIds
       
         
        userClasses.map(async (classroom)=>{
            let classRef = doc(dbase,"Classrooms",classroom)
            let classSnap = (await getDoc(classRef)).data()
             
            setClassesData((prev)=>{
                let newClasses = [...prev,classSnap]
                let uniqueData=[]
                newClasses.map((cls,index)=>{
                    if(index !== 0 ){
                        let duplication = false
                        uniqueData?.map(c=>{
                            if(c.id  ===cls.id){
                                 duplication = true
                            }
                        })
                        if(!duplication){
                            uniqueData.push(cls)
                        }
                    }else{
                        uniqueData.push(cls)
                    }
                })
                return [...uniqueData]
            })
        })
         

    })
         
        },[])

        useEffect(()=>{
            if(userStatus == "Students"){
                setBtn({link:'/join-class',text:'Join New Class'})    
            }
            
            if(userStatus == "Teachers"){
                setBtn({link:'/create-class',text:'Create New Class'})    
            }
            
        },[userStatus])
     

  return (
    <Layout>
      <section className={`min-h-[100vh] py-[40px] overflow-hidden bg-gray`}>
        <div className="container h-[100%]">
          <div className="flex justify-between lg:flex-col flex-col items-center h-[100%]">
            <div className="w-[100%] lg:text-center text-left">
              <h3 className="text-[24px] inline-block mb-[10px] text-blue relative">
                Your Classrooms
                <span className="absolute left-[0] bottom-[0] w-[55px] h-[2px] bg-blue "></span>
              </h3>
              <p className="text-gray-500">
                It's the Teacher that makes the difference not the classroom.
              </p>
            </div>
            <div className="mt-[20px] w-[100%] max-w-[600px] mx-auto">
              <h3 className="lg:text-[22px] text-[18px] text-left block mb-[10px]">
                Classrooms
              </h3>
           { classesData?.map((classroom)=>
            <div className="flex lg:gap-x-[1.5%] gap-x-[2.5%]">



                <div
                  className={`w-[100%] bg-white border rounded-lg overflow-hidden flex justify-start mb-4`}
                >
                  <div className="w-[130px] h-[100px] flex justify-center items-center">
                  <SchoolIcon className="scale-[3]" />
                  </div>
                  <div className="w-full bg-blue text-[#fff] text-left px-[15px] py-[8px] flex flex-col justify-center">
                    <div><span className="text-[19px]">Classroom:&nbsp;</span>{classroom.name}</div>
                    <div><span className="text-[19px]">Subject:&nbsp;</span>{classroom.subjectName}</div>
                  </div>
                </div>



              </div>
               )}
               { classesData?.map || <div>
                    <h3 className="text-center text-[35px] my-[15px]">
                        Sorry You Don't Have any Class!
                    </h3>
                </div>}

               <div className="flex justify-center mt-2">
               <Button
              variant="contained"
            //   size="large"
              data-aos="fade-right"
              data-aos-delay="700"
              data-aos-easing="ease-in-sine"
              data-aos-duration="700"
              
            >
              <Link to={btn.link} className="fim capitalize md:py-[10px] py-[2px] px-[16px] text-[20px]">
                {btn.text}
              </Link>
            </Button>   
               </div>
              
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default YourClassrooms;
