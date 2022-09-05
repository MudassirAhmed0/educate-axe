import React, { useState } from "react";
import UploadQuestion from "./UploadQuestion";
import TypeQuestion from "./type-question/TypeQuestion";
import { Button } from "@mui/material";
import img from "../../../../assets/images/dashboard/5.png";

export default function TestType() {
  const [uploadPaper, setUploadPaper] = useState(false);
  const [typePaper, setTypePaper] = useState(false);

  const uploadQuestionHanlder = () => {
    setUploadPaper(true);
  };
  const typeQuestionHanlder = () => {
    setTypePaper(true);
  };
  return (
    <>
      {!uploadPaper && !typePaper && (
        <div className="container flex flex-col items-center min-h-[60vh] py-[32px]">
          <h2 className='text-[30px] mb-6   text-center  before:content-[""] relative before:absolute before:left-[50%] before:transform before:translate-x-[-50%] before:bottom-[0px] font-bold before:w-[45%] before:h-[2px] before:bg-black '>
            SELECT TEST TYPE
          </h2>
          <h5 className="">Choose Any of the ways to create Test.</h5>
          <img src={img} className="w-[300px] mr-[20px] mb-6" />

          <Button
            variant="contained"
            style={{
              width: "300px",
              display: "flex",
              alignItems: "center",
              marginBottom: "7px",
            }}
            onClick={uploadQuestionHanlder}
          >
            Upload Question Paper
          </Button>
          <Button
            variant="contained"
            style={{
              width: "300px",
              display: "flex",
              alignItems: "center",
            }}
            onClick={typeQuestionHanlder}
          >
            Type Question Paper
          </Button>
        </div>
      )}
      <div>
        {uploadPaper && <UploadQuestion />}
        {typePaper && <TypeQuestion />}
      </div>
    </>
  );
}
