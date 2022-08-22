import React from 'react'
import { Button } from '@mui/material'
import ShareDialog from './ShareDialog';
const ShareClassRoomIdCTA = () => {
  return (
    <div className='bg-[rgba(60,60,60,1)] min-h-[240px] text-white flex-col justify-center flex items-center'>
        <span className='lg:text-[40px] text-[28px] mb-2 lg:mb-0  text-extrabold uppercase'>Share Classroom Id </span>
        <span className='mb-[16px]'>Invite Students to Join Classroom</span>
        
            <ShareDialog 
            />
    </div>
  )
}

export default ShareClassRoomIdCTA