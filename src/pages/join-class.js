import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import JoiningBg from "../assets/images/join-class-bg.png";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { dbase } from "../firebase";
import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { useSession } from "../firebase/UserProvider";

const JoinClass = () => {
  const [classRoomId, set_classRoomId] = useState("");
  const [enterClassId, set_enterClassId] = useState(false);
  const [idIsLessThan10, setIdIsLessThan10] = useState(false);
  const [enterValidId, setEnterValidId] = useState(false);

  const handleChange = (e) => {
    let newValue = e.target.value
    if (newValue.length < 11) {
      set_classRoomId(newValue)
    }

  }


  const user = useSession()

  const joinClass = async (e) => {
    e.preventDefault()
    setIdIsLessThan10(false)
    setEnterValidId(false)
    if (classRoomId == "") {
      set_enterClassId(true);
    } else {
      set_enterClassId(false);
    }


    if (classRoomId.length == 10) {
      let classId = classRoomId.toString()
      let classRef = doc(dbase, "Classrooms", classId)
      let classSnap = await getDoc(classRef)
      let studentRef = doc(dbase, "Students", user.user.uid)
      let studentSnap = await getDoc(studentRef)
      if (classSnap.exists()) {
        let studentsInClass = classSnap.data().studentIds
        let newStudentIn = [...studentsInClass, user.user.uid]
        let uniqueStudents = [...new Set(newStudentIn)]
        updateDoc(classRef, {
          studentIds: uniqueStudents
        })
        let previousClasses = studentSnap.data().classroomIds
        console.log(previousClasses)
        let newClassIdIncluded = [...previousClasses, classId]
        let uniqueClassIds = [...new Set(newClassIdIncluded)]
        console.log(uniqueClassIds)
        console.log(newClassIdIncluded)
        updateDoc(studentRef, {
          classroomIds: uniqueClassIds
        })
        .then(()=>{
           window.location.href = '/class-room-joined';

        })
        .catch(err=>{
          console.log(err)
        })

      } else {
        // alert("Please Enter a Valid Classroom Id")
        setEnterValidId(true)
      }
    } else {
      // alert("Classroom Id Must be ten digits number")
      setIdIsLessThan10(true)
    }

    // console.log("joincla")
    // let classRoomObj = {};
    // classRoomObj = {
    //     classRoomId: classRoomId,
    //     studentId: user.user.uid,
    // }

    // const classRoomData = collection(dbase,'joinClass');
    // addDoc(classRoomData, classRoomObj)
    // .then(response=> {
    //     console.log("jc res",response);
    //     window.location.href='/class-room-joined';
    // })
    // .catch (error => {
    //     console.log("jc error",error);
    // })
  }

  return (
    <Layout>

      <section className="joining-class py-[40px] overflow-hidden">
        <div className="container">
          <div className="w-[100%] mt-[30px]">
            <div className="max-w-[600px] mx-auto relative">
              <div className="flex justify-between flex-row py-[30px] mb-5 min-h-[260px]">
                <div className="w-[45%] flex lg:items-center items-end">
                  <h1
                    className="capitalize text-[#6200ff] lg:text-[60px] sm:text-[50px] text-[24px] font-semibold lg:leading-[70px] sm:leading-[50px] leading-[30px] mb-[40px]"
                    data-aos="fade-right"
                    data-aos-delay="200"
                    data-aos-easing="ease-in-sine"
                    data-aos-duration="700"
                  >
                    Join <br /> Classroom
                  </h1>
                </div>
                <div className="w-[55%] pt-[30px] md:pt-[0] bg-[pin k] h-[100% ] flex justify-center items-center">
                  <img
                    src={JoiningBg}
                    className="lg:w-[50%] w-[50%] lg:py-[0] py-[10px] absolute top-0 right-0 z-[-1]"
                    data-aos="fade-left"
                    data-aos-delay="1400"
                    data-aos-easing="ease-in-sine"
                    data-aos-duration="700"
                  />
                </div>
              </div>

              <form onSubmit={(e) => joinClass(e)}>
                <div className="mb-[25px] relative">
                  <TextField
                    type="text"
                    id="outlined-basic"
                    helperText="ID Shared by your teacher"
                    label="Enter Classroom ID"
                    variant="outlined"
                    className="w-[100%]"
                    value={classRoomId}
                    onChange={handleChange}
                  />
                  <span className="absolute bottom-0 right-[10px] text-[14px] text-[#6200ff] ">
                    <span>{classRoomId.length}</span>/10</span>


                  <p className="pl-[13px] text-[11px] text-red-600 absolut e bottom-[-15px] left-[14px]">
                    {enterClassId ? (
                      <>
                        Please Enter the 'Classroom Id'. &nbsp;&nbsp;&nbsp;
                      </>
                    ) : (
                      ""
                    )}

                    {idIsLessThan10 ? (
                      <>
                        'Classroom Id' Must be ten digits number. &nbsp;&nbsp;&nbsp;
                      </>
                    ) : (
                      ""
                    )}

                    {enterValidId ? (

                      <>Please Enter a Valid Classroom Id.</>

                    ) : (
                      ""
                    )}
                  </p>









                </div>
                <div>
                  <Button
                    variant="contained"
                    fullWidth="true"
                    type='submit'
                  >
                    <span className="fim capitalize block p-[3px]">
                      Join Classroom
                    </span>
                  </Button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default JoinClass;
