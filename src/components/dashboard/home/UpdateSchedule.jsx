import React, { Fragment } from "react";
import { Button } from "@mui/material";

const scheduleData = [
  {
    id: "s1",
    class: "Live Class",
    time: "09:00 AM to 01:00 PM",
    day: "Monday",
  },
  {
    id: "s2",
    class: "Live Class",
    time: "08:00 AM to 02:00 PM",
    day: "Tuesday",
  },
  {
    id: "s3",
    class: "Live Class",
    time: "07:00 AM to 03:00 PM",
    day: "Friday",
  },
  {
    id: "s4",
    class: "Live Class",
    time: "10:00 AM to 04:00 PM",
    day: "Saturday",
  },
];

function UpdateSchedule(props) {
  const editHandler = () => {
        props.onEditSchedule();
  };
  return (
    <Fragment>
      <div className="flex w-[500px] justify-end m-auto mb-[15px]">
        <Button
          autoFocus
          variant="outlined"
          className="w-[200px]"
          onClick={editHandler}
        >
          Edit Time Table
        </Button>
      </div>
      {scheduleData.map((data) => {
        return (
          <div className="flex  w-[500px] border m-auto font-black mb-[10px]">
            <div className=" w-[150px] flex justify-center items-center	">
              {data.day}
            </div>
            <div className="border w-[350px] bg-lime-100 p-[5px]">
              <div>
                <span>{data.class}</span>
              </div>
              <div className="text-[15px] p-[2px] mt-[5px] font-normal">
                {data.time}
              </div>
              <div className="mt-[5px] text-right ">
                <span>{data.day}</span>
              </div>
            </div>
          </div>
        );
      })}
    </Fragment>
  );
}

export default UpdateSchedule;
