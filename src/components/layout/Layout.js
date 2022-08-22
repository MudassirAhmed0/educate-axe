import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";
import { onAuthStateChanged, RecaptchaVerifier } from "firebase/auth"
import { dbase } from "../../firebase";
import { auth } from "../../firebase/auth";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import Strip from "../strip/strip";


const Layout = ({ children }) => {
  const [teachers, setTeachers] = useState([])
  const [students, setStudents] = useState([])
  const [exists, setExists] = useState({})
  const [user, set_user] = useState({})
  const [strip, set_showStrip] = useState(false)

  const getData = async (ref, set) => {
    await getDocs(ref).then((snapshot) => {
      let users = []
      snapshot.docs.forEach((doc) => {
        users.push({ ...doc.data() })
      })
      set(users)
    }).catch((err) => {
      console.log(err)
    })
  }

  const teacherRef = collection(dbase, "teacher");
  const studentRef = collection(dbase, "student");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      set_user(currentUser)
      // console.log('currentUser', currentUser)
    }
    )
    getData(teacherRef, setTeachers)
    getData(studentRef, setStudents)
  }, [])

  // console.log('layout user', user)


  // useEffect(() => {
  //   setExists([...teachers, ...students].filter(item =>
  //     item.email === user.email || item.phoneNumber === user.phoneNumber
  //   ))
  //   console.log("teachers--",teachers)
  //   console.log("students--",students)
  //   console.log("currentUser--",user)

  //   if (exists.length > 0) {
  //     console.log("exists[0].status",exists[0].status)
  //     if (exists[0].status !== 'student' && exists[0].status !== 'teacher') {
  //       if (window.location.pathname !== '/about-you' ) {
  //         set_showStrip(true);
  //       }
  //     }
  //   }
  // }, [teachers, students, user])

  return (
    <>
      {strip == true ?
        <Strip />
        : ""}
      <Navigation />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
