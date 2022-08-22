import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import ClassroomPng from "../assets/images/classroom.png";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { onAuthStateChanged, RecaptchaVerifier } from "firebase/auth";
import { dbase } from "../firebase";
import {
  setDoc,
  addDoc,
  collection,
  doc,
  Firestore,
  getDocs,
  onSnapshot,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { useSession } from "../firebase/UserProvider";

const CreateClassroom = ({ bgGray, bgWhite }) => {
  const [className, set_className] = useState("");
  const [subjectName, set_subjectName] = useState(""); 
  const user = useSession()

  const [enterClass, set_enterClass] = useState(false);
  const [enterSubject, set_enterSubject] = useState(false); 
  
 
  const createClassroom = async () => {
    if (className == "") {
      set_enterClass(true);
    } else {
      set_enterClass(false);
    }
    if (subjectName == "") {
      set_enterSubject(true);
    } else {
      set_enterSubject(false);
    }

    if (className !== "" && subjectName !== "") {
      const id = generateRandomId()
      const classroomRef= doc(dbase,'Classrooms',id)
      const classroomSnap = await getDoc(classroomRef)
      if(classroomSnap.exists()){
          createClassroom(generateRandomId())
      }else{
      let classRoomObj ={
          instituteName: className,
          name: className,
          subjectName: subjectName,
          creatorId: user.user.uid,
          creatorName: user.user.displayName,
          fees:null,
          id,
          instituteId:user.user.displayName,
          paymentType:null,
          pendingStudentIds:[],
          pendingTeacherIds:[],
          teacherIds:[user.user.uid,],
          studentIds:[],
          timestamp:serverTimestamp()
      }
      
      setDoc(doc(dbase,'Classrooms',id),classRoomObj)
      .then(async()=>{
          const teacherRef=doc(dbase,'Teachers',user.user.uid)
          const teacherSnap = await getDoc(teacherRef)
          const classes= teacherSnap.data().classroomIds
          updateDoc(teacherRef,{
              classroomIds: [...classes,id]
          })
          window.location.href='/class-room-created';

      })
      .catch(err=>{
          console.log(err)
      })
  }
    }
  }; 
  const generateRandomId=()=>{
    return  Math.floor(Math.random() *  10000000000).toString()
 }
  return (
    <Layout>
      <section
        className={`min-h-[100vh] py-[40px] overflow-hidden  ${
          bgGray ? "bg-gray" : ""
        } ${bgWhite ? "bg-white" : ""}`}
      > 
        <div className="container h-[100%]">
          <div className="flex justify-between lg:flex-col flex-col items-center h-[100%]">
            <div className="w-[100%] lg:text-center text-left">
              <h3 className="text-[24px] inline-block mb-[10px] text-[#6200ff] relative">
                Create your Classroom
                <span className="absolute left-[0] bottom-[0] w-[55px] h-[2px] bg-[#6200ff] "></span>
              </h3>
              <img
                src={ClassroomPng}
                className="w-[100%] lg:py-[0] py-[10px] max-w-[400px] mx-auto"
                data-aos="fade-right"
                data-aos-delay="200"
                data-aos-easing="ease-in-sine"
                data-aos-duration="700"
              />
            </div>
            <div
              className="w-[100%] mt-[30px]"
              data-aos="fade-left"
              data-aos-delay="900"
              data-aos-easing="ease-in-sine"
              data-aos-duration="700"
            >
              <div className="max-w-[600px] mx-auto">
                <div className="mb-[15px] relative">
                  <TextField
                    type="text"
                    id="outlined-basic"
                    helperText="Eg: 12th class"
                    label="Enter Classroom Name"
                    variant="outlined"
                    className="w-[100%]"
                    value={className}
                    onChange={(e) => set_className(e.target.value)}
                  />
                  {enterClass ? (
                    <p className="text-[11px] text-red-600 absolute bottom-[3px] right-0">
                      Please Enter the 'Class Name'
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="mb-[15px] relative">
                  <TextField
                    type="text"
                    id="outlined-basic"
                    helperText="Eg: Maths"
                    label="Enter Subject Name"
                    variant="outlined"
                    className="w-[100%]"
                    value={subjectName}
                    onChange={(e) => set_subjectName(e.target.value)}
                  />
                  {enterSubject ? (
                    <p className="text-[11px] text-red-600 absolute bottom-[3px] right-0">
                      Please Enter the 'Subject Name'
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <Button
                    variant="contained"
                    fullWidth="true"
                    onClick={() => createClassroom()}
                  >
                    <span className="fim capitalize block p-[3px]">
                      Create Classroom
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CreateClassroom;
