import React, { useEffect } from 'react'
import { useState } from 'react';
import { Button } from '@mui/material'
import DescriptionIcon from '@mui/icons-material/Description';
import ScheduleIcon from '@mui/icons-material/Schedule';
import {   ref, getDownloadURL } from "firebase/storage";
import { storage } from '../../../firebase';
import DownloadIcon from '@mui/icons-material/Download'; 
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

 


const Material = ({material,setCurrentImgSrc,setIsPDF}) => {
    const [imgUrl,setImgUrl] =useState('')
    const [dateCreated,setDateCreated] = useState('') 

    function toDateTime() { 
        let normalDate = new Date(material.timestamp.seconds)
         let splitted   =normalDate.toString().split(' ') 
        setDateCreated(splitted[1] + " "+splitted[2]+", "+ splitted[3]) ;
    } 

    useEffect(()=>{
        getDownloadURL(ref(storage, material.studyMaterialLink))
        .then((url) => {
            setImgUrl(url)
        })
        .catch((error) => {
          // Handle any errors
        });
        toDateTime()
      },[])

      const downloadFile =()=>{
        getDownloadURL(ref(storage,  material.studyMaterialLink))
        .then((url) => {
          // `url` is the download URL for 'images/stars.jpg'
      
          // This can be downloaded directly:
          const xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          xhr.onload = (event) => {
            const blob = xhr.response;
          };
          xhr.open('GET', url);
          xhr.send();
       
        })
        .catch((error) => {
          // Handle any errors
        });
      }
      
      const handleDialog=()=>{
        setCurrentImgSrc(imgUrl) 
        setIsPDF(material?.studyMaterialType.includes("/pdf"))
      }
  return (
    <div  onClick={handleDialog}  className='p-[24px] rounded-[8px] bg-[#f5f5f5] min-w-[100%] w-[100%] lg:min-w-[48%] lg:w-[48%]  cursor-pointer'>
    <div className="flex border-b pb-[16px] justify-between flex-col gap-y-[15px]">
        <div className="flex">
          
          {material?.studyMaterialType.includes("/pdf")?<PictureAsPdfIcon color='primary' className='mx-2 my-2 transform scale-[2]'/> :  <img className='w-[70px] h-[70px] object-cover' src={imgUrl}/>}
            <span className='text-[20px] ml-4 '>{material.name}</span>
        </div>
         
    </div>
    <div className='flex gap-x-2 mt-4 items-center text-[14px] text-gray-400'>
        <ScheduleIcon color='primary'/>
        <span>
        {dateCreated}  
        </span>
        <DownloadIcon color='primary' className='ml-auto' onClick={downloadFile}/>
    </div> 
</div> 
  )
}

export default Material