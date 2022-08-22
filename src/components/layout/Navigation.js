import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import logo from "../../assets/images/logo/app_logo.png";
import Aos from "aos";
import "aos/dist/aos.css";
import { logOut } from "../../firebase/auth";
// import { onAuthStateChanged } from "firebase/auth";
import { useSession } from "../../firebase/UserProvider";

const Navigation = () => {

  useEffect(() => {
    Aos.init({ duration: 2000 });
  });

  const user = useSession()
  // console.log(user)

  return (
    <>
      <nav className="w-[100%] h-[80px] bg-[#fbfbfb] shadow-sm">
        <div className="container">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link to="/">
                <img src={logo} width="80" height="80" />
              </Link>
              <Link to="/">
                <h6 className="fib text-[24px]">Educate</h6>
              </Link>
            </div>
            <ul className="lg:flex justify-end items-center gap-x-[30px] hidden">
              <li className="fim text-[20px] text-capitalize text-[#000]">
                <Link to="/">Home</Link>
              </li>
              <li className="fim text-[20px] text-capitalize text-[#000]">
                <Link to="/features">Features</Link>
              </li>
              {/* <li className="fim text-[20px] text-capitalize text-[#000]">
                  <Link to="/pricing">Pricing</Link>
                </li>*/}
              <li className="fim text-[20px] text-capitalize text-[#000] group relative">
                {window.location.pathname !== "/" ? (
                  <a href="/#contact-team-section">Contact Us</a>
                ) : (
                  <a href="#contact-team-section">Contact Us</a>
                )}
                {/* <ul className="hidden group-hover:block absolute top-[40px] bg-[#fff] shadow min-w-[150px] py-[10px] px-[15px] m-0">
                  <li className="text-[14px] capitalize py-[3px]">menu 1</li>
                  <li className="text-[14px] capitalize py-[3px]">menu 2</li>
                  <li className="text-[14px] capitalize py-[3px]">menu 3</li>
                  <li className="text-[14px] capitalize py-[3px]">menu 4</li>
                </ul> */}
              </li>

              <li className="fim text-[20px] text-capitalize text-blue">
                {
                  user.user ? (
                    <Button onClick={() => logOut()} >Logout</Button>
                  ) : (
                    <Link to="/login">Login</Link>
                  )
                }
              </li>
              <li>
                {/* <Link onClick={()=> window.location.href='https://play.google.com/store/apps/details?id=com.educate.theteachingapp'}> */}
                <a href="https://play.google.com/store/apps/details?id=com.educate.theteachingapp">
                  <Button variant="contained">
                    <span className="fim capitalize">Get App</span>
                  </Button>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
