import React from 'react'
import noSchedule from '../../../assets/images/schedule.png'
import { Button } from '@mui/material'

const Timetable = () => {
  return (
    <div className='container'>
    <div className='flex  py-[32px] px-[10px] flex-col items-center justify-center'>
        <h2 className='text-[40px]  text-center  before:content-[""] relative before:absolute before:left-[50%] before:transform before:translate-x-[-50%] before:bottom-[3px] font-bold before:w-[45%] before:h-[2px] before:bg-black '>
            
            This Week's Timetable
        </h2>
        <div className='max-w-[500px]   '>
            <img  className='w-full object-fit-cover' src={noSchedule} alt="No Schedule" />
        </div>
        <span className=' mb-3 text-[20px] text-center' >
            No Schedule set for this classroom
        </span>
        <Button
             variant='contained'
            
           
            >
                 Set Schedule
            </Button>
    </div>
     

</div>
  )
}

export default Timetable