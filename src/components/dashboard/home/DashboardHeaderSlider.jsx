import React, { useState } from 'react'
import HeaderSlide from './HeaderSlide'
import img1 from '../../../assets/images/dashboard/6.png'
import img2 from '../../../assets/images/dashboard/3.png'
import img3 from '../../../assets/images/dashboard/5.png'
import img4 from '../../../assets/images/dashboard/1.webp'
import img5 from '../../../assets/images/dashboard/4.png'
import img6 from '../../../assets/images/dashboard/7.png'
import img7 from '../../../assets/images/dashboard/2.png'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const DashboardHeaderSlider = () => {
    const [id,setId] = useState(1353125321)
    const [isCopied,setIsCopeied] = useState(false)
    const slideContents= [
        {
            img:img1,
            btnSrc:'#',
            btnText:'Go Live',
            heading:'Conduct Live Classes',
            subHeading:['Schedule Live Class for' ,'unlimited Students'],
            btnStyle:'#ef4544',
            backgroundColor:'bg-red-300'
        },
        {
            img:img2,
            btnSrc:'#',
            btnText:'Create',
            heading:'Smart Test Creator',
            subHeading:['You Can now Create Unlimited  ' ,' Tests in few seconds'],
            btnStyle:'#eab30a',
            backgroundColor:'bg-yellow-300'
        },
        {
            img:img3,
            btnSrc:'#',
            btnText:'Create',
            heading:'Poll',
            subHeading:['You Can now Create Unlimited  ' ,'Polls in few seconds'],
            btnStyle:'#ef4544',
            backgroundColor:'bg-red-300'
        },
        {
            img:img4,
            btnSrc:'#',
            btnText:'Upload',
            heading:'Study Material Manager',
            subHeading:['Upload and Manage' ,'Study Material'],
            btnStyle:'#2db8a6',
            backgroundColor:'bg-teal-300'
        },
        {
            img:img5,
            btnSrc:'#',
            btnText:'Create',
            heading:'Assignment',
            subHeading:['Create and Evalute ' ,'Assignment'],
            btnStyle:'#a855f7',
            backgroundColor:'bg-purple-300'
        },
        {
            img:img6,
            btnSrc:'#',
            btnText:'Collect Fee',
            heading:'Manage Fee',
            subHeading:['Collect fee online directly' ,'from your student'],
            btnStyle:'#f97316',
            backgroundColor:'bg-orange-300'
        },
        {
            img:img7,
            btnSrc:'#',
            btnText:'Collect Fee',
            heading:'Manage Fee',
            subHeading:['Collect fee online directly' ,'from your student'],
            btnStyle:'#eab30a',
            backgroundColor:'bg-yellow-300'
        },
    ]
    const copyId  =()=>{
         
        navigator.clipboard.writeText(id).then(()=>{
            setIsCopeied(true)
            setTimeout(()=>{
                setIsCopeied(false)
            },3000)
        }) 
    }
  return (
    <div className='container'>
        <div className='flex  py-[32px] px-[10px] justify-between'>
            <h2 className='text-[40px]   before:content-[""] relative before:absolute before:left-[0px] before:bottom-[3px] font-bold before:w-[45%] before:h-[2px] before:bg-black '>Overview</h2>
            <div className='flex gap-x-[10px]  items-center'>
                <span>
                    <strong>ID:</strong> {isCopied? "Copied":1353125321}
                
                </span>
                <span className='cursor-pointer' onClick={copyId}>
                    <ContentCopyIcon/> 
                </span>
            </div>
        </div>
        <div className=' flex pb-[32px] justify-evenly  gap-y-[32px] flex-wrap'>
            {
                slideContents?.map(slide=>(
                    <HeaderSlide slideContent={slide}/>
                ))
            }
        </div>

    </div>
  )
}

export default DashboardHeaderSlider