import React, { useEffect, useContext, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./auth";
import { dbase } from ".";
import { doc, getDoc } from "firebase/firestore";

const UserContext = React.createContext();

export const UserProvider = (props) => {
  const [session, setSession] = useState({
    user: null,
    loading: true,
    access: null,
  });
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrenctUser] = useState({});
  const [currentClassroom, setCurrentClassroom] = useState({});
  const [classroomTopics, setClassroomTopics] = useState({});
  const [classroomMaterials, setClassroomMaterials] = useState({});
  const [access, setAccess] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setSession({ user, loading: false, access: "incomplete" });
    });
    return () => unsubscribe();
  }, []);

  const checkingAccess = async (user) => {
    if (user?.user?.uid) {
      const studentRef = doc(dbase, "Students", user.user.uid);
      const studentSnap = await getDoc(studentRef);
      const teacherRef = doc(dbase, "Teachers", user.user.uid);
      const teacherSnap = await getDoc(teacherRef);
      if (studentSnap.exists()) {
        if (studentSnap.data().classroomIds.length > 0) {
         setCurrentClassroom(studentSnap.data().classroomIds[0]) 
          
        }
        setAccess("student");
      } else if (teacherSnap.exists()) {
        if (teacherSnap.data().classroomIds.length > 0) {
         setCurrentClassroom(teacherSnap.data().classroomIds[0])     
        }
        setAccess("teacher");
      } else {
        setAccess("inProgress");
      }
    }
  };

  const settinClass =async ()=>{
    if(access =='student'){
        let userRef = doc(dbase,"Students",session.user.uid)
        let userData = await getDoc(userRef)
        setCurrenctUser(userData)
        let classroomMaterialsRef = doc(dbase,"Classrooms",currentClassroom)
        let classroomMaterialsData = await getDoc(classroomMaterialsRef)
        setCurrentClassroom(classroomMaterialsData)
        
    }
    
  }

  useEffect(() => {
    session && checkingAccess(session);
  }, [session]);

  return (
    <UserContext.Provider value={session}>
      {!session.loading && props.children}
    </UserContext.Provider>
  );
};

export const useSession = () => {
  const session = useContext(UserContext);
  return session;
};
