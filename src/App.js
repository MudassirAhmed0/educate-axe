import "./App.css";
import Login from "./components/authentication/Login";
import React from 'react'
import Home from "./pages/home";
import Features from "./pages/features";
import Pricing from "./pages/pricing";
import CreateClassroom from "./pages/create-classroom";
import JoinClass from "./pages/join-class";
import AboutYou from "./pages/about-you";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from './components/authentication/PrivateRoute'
import ClassRoomJoined from "./pages/class-room-joined";
import ClassRoomCreated from "./pages/class-room-created";
import { UserProvider } from "./firebase/UserProvider";
import UnAuthenticatedRoutes from "./router/UnAuthenticatedRoutes";
import StudentRoutes from "./router/StudentRoutes";
import { useEffect, useState } from "react";
import InProgressRoutes from "./router/InProgressRoutes";
import TeacherRoutes from "./router/TeacherRoutes";
import YourClassrooms from "./pages/your-classrooms";
import StudentAndTeacherRoutes from "./router/StudentAndTeacherRoutes";
import Dashboard from "./pages/dashboard";
import StudyMaterial from "./pages/dashboard/StudyMaterial";
import TestCreator from "./pages/dashboard/TestCreator"; 
import MaterialsListComponent from "./components/dashboard/study-material/MaterialsListComponent";

function App() {


  return (
    <>
    <UserProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/features" element={<Features />} />
            <Route exact path="/pricing" element={<Pricing />} />
            <Route element={<UnAuthenticatedRoutes/>}>
              <Route exact path="/login" element={<Login />} />
            </Route>
            <Route element={<InProgressRoutes/>}>
              <Route exact path="/about-you" element={<AboutYou />} />
            </Route>
            <Route element={<TeacherRoutes/>}>
              <Route exact path="/create-class" element={<CreateClassroom />} />
              <Route exact path="/class-room-created" element={<ClassRoomCreated />} />
            </Route>
            <Route element={<StudentRoutes/>}>
              <Route exact path="/join-class" element={<JoinClass />} />  
              <Route exact path="/class-room-joined" element={<ClassRoomJoined />} />
            </Route>
            <Route element={<StudentAndTeacherRoutes/>}>
               
              <Route exact path="/your-classrooms" element={<YourClassrooms />} />  
              <Route path="/dashboard">
                <Route exact path='' element={<Dashboard/>}/>
             
                <Route exact path='study-material'>
                  <Route exact  path='' element={<StudyMaterial/>}/>  
                  <Route    path='study-material-list' element={<MaterialsListComponent/>}/>  
                </Route>
                
                <Route exact path='test-creator' element={<TestCreator/>}/>
              
              </Route>
            </Route>
          </Routes>
        </Router>
      </UserProvider>
     
    </>
  );
}

export default App;
