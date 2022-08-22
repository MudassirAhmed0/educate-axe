import React from "react";
import video from "../../assets/video/video1.mp4";
import "./video.css"

const Video = ({children}) => {
  return (
    <section className="py-[50px] lg:py-[70px] bg-gray overflow-hidden">
      <div className="container py-[30px] h-[100%] flex flex-col gap-y-[32px] items-center">
      {children && children}
        
        <div className="w-[100%] flex justify-center items-center pt-[50%] relative">
          {/* <video id="fframe" controls  style={{width: '100%'}} className="absolute top-0 left-0 bottom-0 right-0 w-[100%] h-[100%] rounded-[10px] drop-shadow-2xl">
<source type="video/webm" src={video}  />
          </video> */}

          <iframe id="iframe_tag" src="https://www.youtube.com/embed/AIzaSyB0KNJTmp37GzByzO_Yqecz4UVk15Wmor4?list=PL-rKMI_Pfme_XLIJSjH3m0Inovwn9FFTq&autoplay=1&mute=1&loop=1" className="absolute top-0 left-0 bottom-0 right-0 w-[100%] h-[100%] rounded-[10px] drop-shadow-2xl  " frameBorder="0"></iframe>

        </div>
      </div>
    </section>
  );
};

export default Video;
