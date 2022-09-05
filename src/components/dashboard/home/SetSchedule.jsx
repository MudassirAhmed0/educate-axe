import { Button } from "@mui/material";
import React, { useState, Fragment } from "react";
import DateTimePicker from "./DateTimePicker";
import dayjs, { Dayjs } from "dayjs";

function SetSchedule({ day, setTimeTableSchedule }) {
  const [toggle, setToggle] = useState(false);

  const toggleHandler = () => {
    setToggle(!toggle);
    setTimeTableSchedule((prev) => {
      let newTimeTableSchedule = [];
      prev.map((item, index) => {
        if (item.id != day.id) {
          newTimeTableSchedule.push(item);
        } else {
          let newItem = { ...item, on: !item.on };

          newTimeTableSchedule.push(newItem);
        }
      });

      return newTimeTableSchedule;
    });
  };

  const addDateTimeHandler = () => {
    setTimeTableSchedule((prev) => {
      let newTimeTableSchedule = [];
      prev.map((item, index) => {
        if (item.id != day.id) {
          newTimeTableSchedule.push(item);
        } else {
          let newItem = {
            ...item,
            slots: [
              ...item.slots,
              {
                slotId: item.slots[item.slots.length -1].slotId + 1 ,
                endHour: 0,
                endMin: 0,
                startHour: 0,
                startMin: 0,
                startTime: dayjs("2014-08-18T21:0:0"),
                endTime: dayjs("2014-08-18T21:0:0"),
              },
            ],
          };

          newTimeTableSchedule.push(newItem);
        }
      });

      return newTimeTableSchedule;
    });
  };

  return (
    <Fragment>
      <div className="  w-[500px]  text-[20px] m-auto border border-[rgba(0,0,0,0.6)]  p-[8px] text-[25px] mb-[10px] ">
        <div className="flex justify-between">
          <div>
            <h1 className="text-[16px] mt-[7px] font-bold">{day.day}</h1>
          </div>
          <div>
            {toggle && (
              <i
                className="fa fa-plus  mr-[15px] cursor-pointer "
                aria-hidden="true"
                onClick={addDateTimeHandler}
              ></i>
            )}
            {toggle && (
              <i
                className="fa-solid fa-toggle-on cursor-pointer"
                onClick={toggleHandler}
              ></i>
            )}

            {!toggle && (
              <i
                className="fa-solid fa-toggle-off cursor-pointer"
                onClick={toggleHandler}
              ></i>
            )}
          </div>
        </div>

        {toggle &&
          day?.slots?.map((slot, index) => (
            <DateTimePicker
              slotId={slot.slotId}
              dayId={day.id}
              setTimeTableSchedule={setTimeTableSchedule}
              slot={slot}
              key={Math.random() * 100}
              id={Math.random() * 100}
            />
          ))}
      </div>
    </Fragment>
  );
}

export default SetSchedule;
