import { Button } from '@mui/material'
import React from 'react'
import {Link} from 'react-router-dom'

const HeaderSlide = ({slideContent:{backgroundColor,img,heading,subHeading,btnStyle,btnSrc,btnText}}) => {

  return (
    <div className={`${backgroundColor} xl:w-[32%] md:w-[49%] w-full flex items-center lg:gap-x-[32px] gap-x-[16px]  pr-[16px]  lg:pr-[32px] py-[32px] rounded-[16px]`}>
        <div className='w-[150px] lg:min-w-[150px] md:min-w-[130px] min-w-[100px]'>
            <img className='w-full object-fit-cover' src={img}/>
        </div>
        <div className='flex gap-y-2 flex-col items-start w-full' >
            <span className='lg:text-[18px] text-[16px]'>
                <strong>{heading}</strong>
            </span>
            <span className='mb-2 font-light lg:text-[16px] text-[14px]'>
                {subHeading[0]} <br /> {subHeading[1]}
            </span>
        
            <Button
             variant='contained'
             component={Link}
             to={btnSrc}
             
             style={{
                marginLeft:'auto',
                backgroundColor:btnStyle
             }}
            >
                 {btnText }
            </Button>

        </div>
    </div>
  )
}

export default HeaderSlide