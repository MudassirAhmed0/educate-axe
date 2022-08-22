import React, {useState} from "react";
// import { Button } from "@mui/material";
import "./PricingSection.css";
// import teaching from "../../assets/images/teaching.png";
// import img1 from "../../assets/images/features/feature1.png";
// import img2 from "../../assets/images/features/feature2.png";
// import img3 from "../../assets/images/features/feature3.png";
import PricingCard from "../pricing-card/PricingCard";

const plansAndPricing = [
  {
    title: "Professional Plan",
    benefits: [
      "Unlimited Classrooms & Students",
      "Unlimited Storage (FUP apply)",
      "Unlimited Premium Live Classes with up to 300 participants",
      "Sell Courses @ 5% charges on transactions collected",
      "Free streaming upto 50GBs",
    ],
    actualPrice: "1000",
    deletedPrice: "1800",
  },
  {
    title: "Enterprise Plan",
    benefits: [
      "Everything Professional Plan+",
      "Large Meeting Licenses for up to 500 or 1000 students",
      "Bulk Discounts on purchase of 10+ active collaborators",
      "0% per transaction for Courses sold",
      "Your own custom domain",
      "Your branded white label Android & iOS App",
      "Your branded white label MacOS and Windows App",
    ],
    actualPrice: "1000",
    deletedPrice: "1800",
  },
];

const PricingSection = () => {

  const [isDisableAllAlterations, setIsDisableAllAlterations] = useState(false);

  const disableAllAlterations = (id) => {
    // console.log("e", document.getElementById(id).checked);
    if (document.getElementById(id).checked == true) {
      setIsDisableAllAlterations(true);
    } else {
      setIsDisableAllAlterations(false);
    }
  };

  return (
    <section className="PricingSection-section py-[70px] bg-gray">
      <div className="container h-[100%]">
        <div className="text-center">
            <h1 className="fib text-[40px]">Plans and pricing</h1>
            <p className="text-gray-700">Choose the best plan for your need</p>
            <p className="flex justify-center m-[10px] text-[14px]">
              <span className="text-gray-700">Monthly</span>
              <label
                htmlFor="toggleAllAlterations"
                className="cursor-pointer mx-[15px]"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    id="toggleAllAlterations"
                    className="sr-only"
                    onChange={() =>
                      disableAllAlterations("toggleAllAlterations")
                    }
                  />
                  <div className="check-bg block bg-[#e8ebf1] w-[40px] h-[23px] rounded-full"></div>
                  <div className="dot absolute left-[2px] top-[2.5px] bg-white w-[17px] h-[17px] rounded-full transition"></div>
                </div>
              </label>
              <span className="text-[#000] font-semibold mr-[3px]">Yearly</span>
              <span className="text-purple">(17% Savings)</span>
            </p>
        </div>
        <div className="flex justify-center gap-x-[1.5%] flex-wrap py-[50px]">
          {plansAndPricing.map((value,index) => (
            <PricingCard data={value} key={value.title} index={index}/>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
