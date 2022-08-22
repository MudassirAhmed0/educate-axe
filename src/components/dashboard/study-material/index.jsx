import React from 'react'
import img from '../../../assets/images/dashboard/1.webp'
import { Button } from '@mui/material'
import CreateMaterialDialog from './CreateMaterialDialog'
import DescriptionIcon from '@mui/icons-material/Description';
import ScheduleIcon from '@mui/icons-material/Schedule';

const StudyMaterialHero = () => {
    const noMaterial = (<>
        <img
            src={img}
            className='w-[200px] mr-[20px]'
        />
        <span className=' mb-3 text-[20px] text-center' >
            No Study Material
        </span>
    </>)
    const material =(
        <div className='p-[24px] rounded-[8px] bg-[#f5f5f5] w-[100%] max-w-[800px]'>
        <div className="flex border-b pb-[16px] justify-between flex-col gap-y-[15px]">
            <div className="flex">
                <DescriptionIcon color='primary' fontSize='large' />
                <span className='text-[20px] ml-4 '>English Notes</span>
            </div>
            <div className='  flex gap-x-2 ml-auto'>
                <Button
                color='error'
                variant='outlined'
                >
                    Delete
                </Button>
                <Button
                color='primary'
                variant='outlined'
                >
                    Edit
                </Button>
            </div>
        </div>
        <div className='flex gap-x-2 mt-4 items-center text-[14px] text-gray-400'>
            <ScheduleIcon color='primary'/>
            <span>
                Aug 21, 2022
            </span>
        </div>
    </div>
    )

    return (
        <section className='container flex flex-col items-center min-h-[60vh] py-[32px]'>
            <h2 className='text-[40px]   text-center  before:content-[""] relative before:absolute before:left-[50%] before:transform before:translate-x-[-50%] before:bottom-[0px] font-bold before:w-[45%] before:h-[2px] before:bg-black '>
                Study Material
            </h2>
            <div className='flex w-[100%] flex-col gap-y-6 items-center my-[32px]'>

              {
                material
              }
              {
                material
              }
              {
                material
              }
              {
                material
              }


                {/* {noMaterial} */}

            </div>
                <CreateMaterialDialog />
        </section>
    )
}

export default StudyMaterialHero