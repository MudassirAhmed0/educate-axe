import React, { useState, useEffect } from "react";
import Layout from '../components/layout/Layout'
import { Button } from "@mui/material";

const ClassRoomJoined = ({ creatingClass, joiningClass }) => {

  useEffect(() => {
    // console.log('ww', window.location.pathname);
  }, [])

  return (
    <Layout>
      <div className='w-[100%] px-[10%] h-[100vh] flex justify-center items-center'>
        <div className='text-center mt-[-50px]'>
          <h1 className='fib text-[70px] pb-[40px] text-green-500 leading-[90px]'>
            <span className='text-black text-[90px]'>Classroom</span><br /> Successfully Joined
          </h1>
          <Button variant="contained" fullWidth="true" sx={{ width: '40%', display: 'inline-block' }} onClick={() => window.location.href = ('/')}>
            <span className="fim capitalize block p-[3px]">Go to Home</span>
          </Button>
        </div>
      </div>
    </Layout>
  )
}

export default ClassRoomJoined