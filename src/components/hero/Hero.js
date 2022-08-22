import React, { useState } from "react";
import { Button } from "@mui/material";
import "./hero.css";
import teaching from "../../assets/images/teaching.png";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { dbase } from "../../firebase";
import { useEffect } from "react";
import { useSession } from "../../firebase/UserProvider";

const Hero = () => {
  const user = useSession()
  const [isStudent, setIsStudent] = useState(false)
  const [isTeacher, setIsTeacher] = useState(false)
  const [isInProgress, setIsInProgress] = useState(false)
  const [isClasses,setIsClasses] = useState(false)
  const [btn, setBtn] = useState({ link: '/', text: 'Get Started' })

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

  useEffect(() => {

    if (!user?.user?.uid) {
      setBtn({ link: '/', text: 'Get Started' })
    } else if (isClasses) {
      setBtn({ link: '/your-classrooms', text: 'Your Classrooms' })
    }else if (isStudent) {
      setBtn({ link: '/join-class', text: 'Join Class' })
    } else if (isTeacher) {
      setBtn({ link: '/create-class', text: 'Create Class' })
    } else if (isInProgress) {
      setBtn({ link: '/about-you', text: 'Complete Login Process' })

    }
  }, [user, isTeacher, isStudent, isInProgress])



  return (
    <section className="hero-section overflow-hidden">
      <div className="container h-[100%]">
        <div className="flex justify-between h-[100%] md:flex-row flex-col py-[30px]">
          <div className="w-[100%] md:w-[45%] flex justify-center items-start flex-col">
            <h1
              className="fim capitalize text-[#373e52] lg:text-[60px] text-[40px] font-semibold lg:leading-[70px] leading-[50px] mb-[20px]"
              data-aos="fade-right"
              data-aos-delay="200"
              data-aos-easing="ease-in-sine"
              data-aos-duration="700"
            >
              India's Largest Learning platform
            </h1>
            {user?.user?.uid && <p
              className="fim  text-[#373e52] lg:text-[24px]  mb-[20px]"
              data-aos="fade-right"
              data-aos-delay="200"
              data-aos-easing="ease-in-sine"
              data-aos-duration="700"
            >
              Hello  <span className="text-[#4d97ff] capitalize">  {isInProgress ? " User" : user.user.displayName}!

              </span>
            </p>}

            <Button
              variant="contained"
              size="large"
              data-aos="fade-right"
              data-aos-delay="700"
              data-aos-easing="ease-in-sine"
              data-aos-duration="700"
            >
              <Link to={btn.link} className="fim capitalize md:py-[10px] py-[2px] px-[20px] text-[22px]">
                {btn.text}
              </Link>
            </Button>
          </div>
          <div className="w-[100%] md:w-[55%] pt-[30px] md:pt-[0] bg-[pin k] h-[100% ] flex justify-center items-center">
            <img
              src={teaching}
              className="w-[100%] h-[40% ]"
              data-aos="fade-left"
              data-aos-delay="1400"
              data-aos-easing="ease-in-sine"
              data-aos-duration="700"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
