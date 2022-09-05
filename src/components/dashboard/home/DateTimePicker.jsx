import React from "react";
import Stack from "@mui/material/Stack";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

function DateTimePicker({ slot, setTimeTableSchedule, dayId, slotId }) {
  
   
   

  const handleStartTime = (newValue) => {
    
    setTimeTableSchedule((prev) => {
      let newTimeTableSchedule = [];
      prev.map((item, index) => {
        if (item.id != dayId) {
          newTimeTableSchedule.push(item);
        } else {
          let newItem = {...item}
          let newItemSlots =[]
          newItem.slots.map((newItemSlot,newItemSlotId)=>{
            
            if(newItemSlot.slotId  != slotId){
              newItemSlots.push(newItemSlot)
            }else{
              let newSlot = {...newItemSlot,
              startHour:newValue.hour(),
              startMin:newValue.minute(),
              startTime:newValue,
              // endTime
              }
              newItemSlots.push(newSlot)
            
            }

          })
        
          
          newItem.slots = newItemSlots
          newTimeTableSchedule.push(newItem)
          };
          
        }
      )
       
      console.log(newTimeTableSchedule)
       
      return newTimeTableSchedule
    });
  };
  const handleEndTime = (newValue) => {
    // setEndTime(newValue)
    setTimeTableSchedule((prev) => {
      let newTimeTableSchedule = [];
      prev.map((item, index) => {
        if (item.id != dayId) {
          newTimeTableSchedule.push(item);
        } else {
          let newItem = {...item}
          let newItemSlots =[]
          newItem.slots.map((newItemSlot,newItemSlotId)=>{
            
            if(newItemSlot.slotId  != slotId){
              newItemSlots.push(newItemSlot)
            }else{
              let newSlot = {...newItemSlot,
              endHour:newValue.hour(),
              endMin:newValue.minute(),
              // startTime,
              endTime:newValue
              }
              newItemSlots.push(newSlot)
               
            }

          })
        
          
          newItem.slots = newItemSlots
          newTimeTableSchedule.push(newItem)
          };
          
        }
      )
    
      return newTimeTableSchedule
    });
  };

  const deleteHandler =()=>{
    slotId != 1 && setTimeTableSchedule((prev) => {
      let newTimeTableSchedule = [];
      prev.map((item, index) => {
        if (item.id != dayId) {
          newTimeTableSchedule.push(item);
        } else {
          let newItem ={ };
          let newSlots=[]
          item.slots.map(currentSlot=>{
            if(currentSlot.slotId != slotId){
              newSlots.push(currentSlot)
            }
          })
          newItem = {...item,slots:[...newSlots]}
          newTimeTableSchedule.push(newItem);
        }
      });

      return newTimeTableSchedule;
    });
  }
  return (
    <div className="mt-[5px] border p-[15px]">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack
          spacing={3}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <div>
            <TimePicker
              label="Start Time"
              value={slot.startTime}
              className="w-[200px]"
              // onChange={handleStartTime}
              onChange={()=>{console.log('')}}
              onAccept={handleStartTime}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
          <div style={{ marginTop: "0px" }}>
            <TimePicker
              label="End Time"
              value={slot.endTime}
              className="w-[200px]"
              onChange={()=>{console.log('')}}
              onAccept={handleEndTime}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
          <div
            className="cursor-pointer"
            style={{ marginTop: "12px" }}
             onClick={deleteHandler}
          >
            <i className="fa fa-times" aria-hidden="true"></i>
          </div>
        </Stack>
      </LocalizationProvider>
    </div>
  );
}

export default DateTimePicker;
