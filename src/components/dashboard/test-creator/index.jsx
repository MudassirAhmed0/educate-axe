import React from "react";
import { useState } from "react";
import img from "../../../assets/images/dashboard/5.png"
import { Button } from '@mui/material'
import TestType from './TestType/TestType';

function TestCreatorHero() {
  const [testType, setTestType] = useState(false);
  const noTest = (
    <>
      <img src={img} className="w-[300px] mr-[20px]" />
      <span className=" mb-3 text-[20px] text-center">No Test</span>
    </>
  );
  const handleClickOpen = () => {
    setTestType(true);
  };
  return (
    <>
      {!testType && (
        <section className="container flex flex-col items-center min-h-[60vh] py-[32px]">
          <h2 className='text-[40px]   text-center  before:content-[""] relative before:absolute before:left-[50%] before:transform before:translate-x-[-50%] before:bottom-[0px] font-bold before:w-[45%] before:h-[2px] before:bg-black '>
            Test Material
          </h2>
          <div className="flex w-[100%] flex-col gap-y-6 items-center ">
            {noTest}
          </div>
          <Button
             variant='contained' 
             style={{ 
                width:'200px',
                display:'flex',
                alignItems:'center'
             }}
             onClick={handleClickOpen}
            >
                 Create Test 
            </Button>
        </section>
      )}
      {testType && <TestType />}
    </>
  );
}

export default TestCreatorHero;
