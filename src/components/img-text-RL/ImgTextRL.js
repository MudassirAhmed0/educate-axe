import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DoneIcon from "@mui/icons-material/Done";
import teachingAppDashboard from "../../assets/images/educational-webinar.png";
import "./ImgTextRL.css";

const ImgTextRL = ({bgGray, bgWhite}) => {
  return (
    <section className={`min-h-[100vh] py-[40px] overflow-hidden flex items-center ${bgGray ? "bg-gray" : ""} ${bgWhite ? "bg-white" : ""}`}>
      <div className="container h-[100%]">
        <div className="flex justify-between lg:flex-row flex-col items-center h-[100%]">
          <div className="lg:w-[45%] w-[100%] flex justify-center items-center lg:pr-[100px] pr-[0]">
            <img
              src={teachingAppDashboard}
              className="w-[100%] lg:py-[0] py-[10px]"
              data-aos="fade-right"
              data-aos-delay="200"
              data-aos-easing="ease-in-sine"
              data-aos-duration="700"
            />
          </div>
          <div className="lg:w-[55%] w-[100%] flex justify-start items-start flex-col pr-[10px] lg:pt-[0] pt-[7%]"
            data-aos="fade-left"
            data-aos-delay="900"
            data-aos-easing="ease-in-sine"
            data-aos-duration="700"
          >
            <h6 className="fib lg:text-[22px] text-[16px] text-blue uppercase">scale</h6>
            <h3 className="fib lg:text-[36px] text-[25px] capitalize pb-[5px]">
              analytics &#39; business management
            </h3>
            <ul>
              <li className="fir text-[20px] py-[7px]">
                <DoneIcon color="primary" className="mr-[7px] scale-[.8]" />
                Dashboard - Track instructor and learner engagement
              </li>
              <li className="fir text-[20px] py-[7px]">
                <DoneIcon color="primary" className="mr-[7px] scale-[.8]" />
                Automate processes for student cancellations
              </li>
              <li className="fir text-[20px] py-[7px]">
                <DoneIcon color="primary" className="mr-[7px] scale-[.8]" />
                Customized student &#39; instructor activity reports
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImgTextRL;
