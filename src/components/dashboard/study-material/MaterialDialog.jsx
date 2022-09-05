import React, { useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close';

const MaterialDialog = ({imgSrc,setCurrentImgSrc,isPDF}) => {
     
        const handleClose =(e)=>{
            // setCurrentImgSrc('')
           e.target.classList.contains('stop') || setCurrentImgSrc('')   
        }
        
  return (
    <div onClick={handleClose} className='fixed top-0 flex  items-center justify-center left-0 w-full h-full bg-[rgba(0,0,0,0.5)]'>
       <div className='text-white  fixed top-[15px] right-[15px] cursor-pointer'>
            <CloseIcon fontSize='large'/>
       </div>
       {isPDF
         ?  <iframe src={imgSrc} className='min-h-[500px] w-[90%] max-w-[500px] stop' frameborder="0"></iframe>
        : <img src={imgSrc} className=' w-[90%] max-w-[500px] stop'/>  

       }
    </div>
  )
}

export default MaterialDialog