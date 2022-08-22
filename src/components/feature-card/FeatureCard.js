import React from "react";
import { Button } from "@mui/material";
import "./FeatureCard.css";
import teaching from "../../assets/images/teaching.png";

const FeatureCard = ({ data }) => {
  return (
    <div className="sm:w-[32%] w-[49%] mb-[50px]">
      <img className="w-[100%] h-[190px] sm:h-[230px] md:h-[280px] object-contain" src={data.img} />
      <h3 className="fib py-[10px] sm:py-[20px] text-[20px] sm:text-[24px] leading-[20px] sm:leading-[30px] text-[#000000c2]">
        {data.title}
      </h3>
      <p className="fir text-[14px]">{data.des}</p>
    </div>
  );
};

export default FeatureCard;
