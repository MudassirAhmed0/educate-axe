import React from 'react'
import DashboardHeaderSlider from '../../components/dashboard/home/DashboardHeaderSlider'
import DashboardOverview from '../../components/dashboard/home/DashboardOverview'
import ShareClassRoomIdCTA from '../../components/dashboard/home/ShareClassRoomIdCTA' 
import Timetable from '../../components/dashboard/home/Timetable'
import Layout from '../../components/layout/Layout'
import Video from '../../components/video/Video'

const DashboardHome = () => {
  return (
    <Layout>
        <DashboardHeaderSlider/>
        <DashboardOverview/>
        <Video>
        <h2 className='text-[40px]  mb-[32px] text-center  before:content-[""] relative before:absolute before:left-[50%] before:transform before:translate-x-[-50%] before:bottom-[3px] font-bold before:w-[45%] before:h-[2px] before:bg-black '>
            How to Use
         </h2>
        </Video>
        <ShareClassRoomIdCTA/>
        <Timetable/> 
    </Layout>
  )
}

export default DashboardHome