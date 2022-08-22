import React from "react";
import { Button } from "@mui/material";
import "./PricingCard.css";
import DoneIcon from "@mui/icons-material/Done";
import teaching from "../../assets/images/teaching.png";

const PricingCard = ({ data, index }) => {
  return (
    <div className={`max-w-[500px] lg:w-[49%] mb-[50px] bg-[#fff] border-[1px] rounded-[15px] p-[20px] flex flex-col justify-between ${index == 0 ? "border-[#6200ff]" : ""}`}>
      <div>
        <h2 className="fib text-[22px] pb-[10px]">{data.title}</h2>
        <ul className="text-gray-700">
          {data.benefits.map((value) => (
            <li className="text-gray-800 py-[3px] text-[15px] font-medium" key={value}>
              <DoneIcon color="primary" className="mr-[7px] scale-[.8]" /> {value}
            </li>
          ))}
        </ul>
        {
          index == 0 ?
            <div className="mt-[20px]">
              <span className="fib block text-[17px] mb-[-8px]">₹{data.deletedPrice}</span>
              <span className="fib block text-[40px]">₹{data.actualPrice} <span className="text-sm text-gray-500">/license*/month</span></span>
              <span className="block text-sm text-gray-600">when purchased yearly</span>
            </div>
            : ""
        }
      </div>

      <div className="mt-[20px]">
        {
          index == 0 ?
            <Button variant="contained" fullWidth="true">
              <span className="fim capitalize block p-[3px]">Start your free trial</span>
            </Button>
            : 
            <a className="block text-[#6200ff] text-center text-[14px] font-medium py-[8px] border-[1px] rounded-[3px] border-gray-300 cursor-pointer">Contact Sales</a>
        }
      </div>

    </div>
  );
};

export default PricingCard;
