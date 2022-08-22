import React from "react";
import getAppPng from "../../assets/images/getApp.png";
import appStore from "../../assets/images/appStore.png";
import googlePlay from "../../assets/images/google play.png";

const GetApp = ({ bgGray, bgWhite }) => {
  return (
    <section className={`py-[40px] overflow-hidden shadow-lg ${bgGray ? "bg-gray" : ""} ${ bgWhite ? "bg-white" : "" }`}>
      <div className="container h-[100%]">
        <div className="flex justify-between lg:flex-row flex-col flex-col-reverse items-center h-[100%]">
          <div className="lg:w-[45%] w-[100%] flex justify-start items-start flex-col lg:pl-[70px] pl-[0] pr-[10px] lg:pt-[0] pt-[7%]"
            data-aos="fade-right"
            data-aos-delay="200"
            data-aos-easing="ease-in-sine"
            data-aos-duration="700"
          >
            <h3 className="fib lg:text-[36px] text-[25px] capitalize pb-[8px]">
              Get The <br /> Teaching App
            </h3>
            <div>
                <p className="text-[20px] mb-[35px]">Download the app now</p>
                <div className="flex">
                    <a href="https://play.google.com/store/apps/details?id=com.educate.theteachingapp" className="mr-[10px]"><img src={appStore} alt=""  width="250" height="250"/></a>
                    <a href="https://play.google.com/store/apps/details?id=com.educate.theteachingapp"><img src={googlePlay} alt="" width="250" height="250" /></a>
                </div>
            </div>
          </div>
          <div className="lg:w-[55%] w-[100%] flex justify-center items-center">
            <img
              src={getAppPng}
              className="w-[70%]"
              data-aos="fade-left"
              data-aos-delay="700"
              data-aos-easing="ease-in-sine"
              data-aos-duration="700"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetApp;
