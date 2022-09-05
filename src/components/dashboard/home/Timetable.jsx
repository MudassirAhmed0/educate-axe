import React, { Fragment } from "react";
import noSchedule from "../../../assets/images/schedule.png";
import { Button } from "@mui/material";
import { useState } from "react";
import SetSchedule from "./SetSchedule";
import UpdateSchedule from "./UpdateSchedule";
import dayjs, { Dayjs } from "dayjs";
import { doc, setDoc } from "firebase/firestore";
import { dbase } from "../../../firebase";



const Timetable = ({isTeacher,classroomId}) => {
  const [schedule, setSchedule] = useState(false);
  const [updateSchedule, setUpdateSchedule] = useState(false);
  const [timeTableSchedule,setTimeTableSchedule] = useState([
        {
          day:"MONDAY",
          id:1,
          on:false,
          slots:[
            {
              slotId:1,
              endHour:0,
              endMin:0,
              startHour:0,
              startMin:0,
              startTime:dayjs("2014-08-18T21:0:0"),
              endTime:dayjs("2014-08-18T21:0:0"),
            }
          ]
        },
        {
          day:"TUESDAY",
          id:2,
          on:false,
          slots:[
            {
              slotId:1,
              endHour:0,
              endMin:0,
              startHour:0,
              startMin:0,
              startTime:dayjs("2014-08-18T21:0:0"),
              endTime:dayjs("2014-08-18T21:0:0"),
            }
          ]
        },
        {
          day:"WEDNESDAY",
          id:3,
          on:false,
          slots:[
            {
              slotId:1,
              endHour:0,
              endMin:0,
              startHour:0,
              startMin:0,
              startTime:dayjs("2014-08-18T21:0:0"),
              endTime:dayjs("2014-08-18T21:0:0"),
            }
          ]
        },
        {
          day:"THURSDAY",
          id:4,
          on:false,
          slots:[
            {
              slotId:1,
              endHour:0,
              endMin:0,
              startHour:0,
              startMin:0,
              startTime:dayjs("2014-08-18T21:0:0"),
              endTime:dayjs("2014-08-18T21:0:0"),
            }
          ]
        },
        {
          day:"FRIDAY",
          id:5,
          on:false,
          slots:[
            {
              slotId:1,
              endHour:0,
              endMin:0,
              startHour:0,
              startMin:0,
              startTime:dayjs("2014-08-18T21:0:0"),
              endTime:dayjs("2014-08-18T21:0:0"),
            }
          ]
        },
        {
          day:"SATURDAY",
          id:6,
          on:false,
          slots:[
            {
              slotId:1,
              endHour:0,
              endMin:0,
              startHour:0,
              startMin:0,
              startTime:dayjs("2014-08-18T21:0:0"),
              endTime:dayjs("2014-08-18T21:0:0"),
            }
          ]
        },
        {
          day:"SUNDAY",
          id:7,
          on:false,
          slots:[
            {
              slotId:1,
              endHour:0,
              endMin:0,
              startHour:0,
              startMin:0,
              startTime:dayjs("2014-08-18T21:0:0"),
              endTime:dayjs("2014-08-18T21:0:0"),
            }
          ]
        },
  ])
  const setScheduleHandler = () => {
    setSchedule(true);
  };
  const updateHandler = async () => {
    const scheduleRef = doc(dbase,"Classrooms",classroomId,"Schedule","LiveClass")
    try {
      let data = []
      timeTableSchedule.map(item=>{
        let newItem={}
        let newSlots=[]
        item.slots.map((i,index)=>{
          let newSlot ={...i,startTime:'',endTime:''}
         
       
          newSlots.push(newSlot)
        })
        newItem ={...item,slots:newSlots}
        data.push(newItem)
      }) 
      
      await setDoc(scheduleRef,{scheduleList:data})
    } catch (error) {
      console.log(error)
    }
    setUpdateSchedule(true);
    setSchedule(false);
  };
  const editHandler = () => {
    setUpdateSchedule(false);
    setSchedule(true);
  };

  return (
    <Fragment>
      <div className="container">
        <div className="flex  py-[32px] px-[10px] flex-col items-center justify-center">
          <h2 className='text-[40px]  text-center  before:content-[""] relative before:absolute before:left-[50%] before:transform before:translate-x-[-50%] before:bottom-[3px] font-bold before:w-[45%] before:h-[2px] before:bg-black '>
            This Week's Timetable
          </h2>
          {!schedule && !updateSchedule &&  (
            <div className="max-w-[500px]   ">
              <img
                className="w-full object-fit-cover"
                src={noSchedule}
                alt="No Schedule"
              />
            </div>
          )}
          {!schedule &&  !updateSchedule && (
            <span className=" mb-3 text-[20px] text-center">
              No Schedule set for this classroom
            </span>
          )}
          {!schedule && isTeacher && !updateSchedule && (
            <Button variant="contained" onClick={setScheduleHandler}>
              Set Schedule
            </Button>
          )}
        </div>
            {
              schedule && timeTableSchedule.map(day=> <SetSchedule setTimeTableSchedule={setTimeTableSchedule} day={day} />)

            }
        
        {schedule && (
          <div className="flex justify-center m-auto">
            <Button
              autoFocus
              variant="contained"
              className="w-[200px]"
              onClick={updateHandler}
            >
              UPDATE
            </Button>
          </div>
        )}
        {updateSchedule && <UpdateSchedule onEditSchedule={editHandler} />}
      </div>
    </Fragment>
  );
};

export default Timetable;
