import React from "react";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DoneIcon from "@mui/icons-material/Done";
import teachingAppDashboard from "../../assets/images/teaching-app-dashboard.png";
import "./AppsSlider.css";

import app1 from "../../assets/images/Live classes.jpg";
import app2 from "../../assets/images/Classroom.jpg";
import app3 from "../../assets/images/Online Test.jpg";
import app4 from "../../assets/images/Manage Fee.jpg";
import app5 from "../../assets/images/Resources.jpg";
import app6 from "../../assets/images/Assignment.jpg";
import app7 from "../../assets/images/Smart Result.jpg";
import app8 from "../../assets/images/More Festures.jpg";

const AppsSlider = ({ bgGray, bgWhite }) => {
  return (
    <section
      className={` sm:h-[100vh] flex justify-center items-center py-[100px] sm:py-[50px] overflow-hidden  ${bgGray ? "bg-gray" : ""} ${
        bgWhite ? "bg-white" : ""
      }`}
    >
      <div className="w-[100%] mx-auto">
        <div className="w-[60%] sm:w-[20%] flex gap-x-[35px ] slide">
          <img className="min-w-[20% ] mx-[4%]" src={app1} />
          <img className="min-w-[20% ] mx-[4%]" src={app2} />
          <img className="min-w-[20% ] mx-[4%]" src={app3} />
          <img className="min-w-[20% ] mx-[4%]" src={app4} />
          <img className="min-w-[20% ] mx-[4%]" src={app5} />
          <img className="min-w-[20% ] mx-[4%]" src={app6} />
          <img className="min-w-[20% ] mx-[4%]" src={app7} />
          <img className="min-w-[20% ] mx-[4%]" src={app8} />
          
          <img className="min-w-[20% ] mx-[4%]" src={app1} />
          <img className="min-w-[20% ] mx-[4%]" src={app2} />
          <img className="min-w-[20% ] mx-[4%]" src={app3} />
          <img className="min-w-[20% ] mx-[4%]" src={app4} />
          <img className="min-w-[20% ] mx-[4%]" src={app5} />
          <img className="min-w-[20% ] mx-[4%]" src={app6} />
          <img className="min-w-[20% ] mx-[4%]" src={app7} />
          <img className="min-w-[20% ] mx-[4%]" src={app8} />
        </div>
      </div>
    </section>
  );
};

export default AppsSlider;
