import React from "react";
import { TextField } from "@mui/material";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { Button } from "@mui/material";
import { useState } from "react";

export default function UploadPaper() {
  const [file, setFile] = useState("");
  const [state, setState] = useState({
    name: "",
    description: "",
    totalTime: "",
    totalQuestions: "",
    totalMarks: "",
    negativeMarks: "",
  });

  const [name, setName] = useState(false);
  const [description, setDescription] = useState(false);
  const [totalTime, setTotalTime] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(false);
  const [totalMarks, setTotalMarks] = useState(false);
  const [negativeMarks, setNegativeMarks] = useState(false);
  const [fileError, setFileError] = useState(false);

  const handleClickOpen = () => {};
  const handleChange = (e) => {
    setState((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleFileChange = (e) => {
    const currentFile = e.target.files[0];
    setFile(currentFile);
    setFileError(false);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (state.name == "") {
      setName(true);
    } else {
      setName(false);
    }

    if (state.totalTime == "") {
      setTotalTime(true);
    } else {
      setTotalTime(false);
    }
    if (state.totalQuestions == "") {
      setTotalQuestions(true);
    } else {
      setTotalQuestions(false);
    }
    if (state.totalMarks == "") {
      setTotalMarks(true);
    } else {
      setTotalMarks(false);
    }
    if (file == "") {
      setFileError(true);
    } else {
      setFileError(false);
    }

    console.log(state);
  };

  return (
    <div className=" container flex flex-col items-center  ">
      <h2 className='text-[40px] mb-8 text-center  before:content-[""] relative before:absolute before:left-[50%] before:transform before:translate-x-[-50%] before:bottom-[0px] font-bold before:w-[45%] before:h-[2px] before:bg-black '>
        Create Test
      </h2>
      <div className="flex flex-col gap-y-[16px] w-[100%]">
        <form
          className="max-w-[500px] w-[100%] m-auto flex flex-col gap-y-4 justify-start"
          onSubmit={submitHandler}
        >
          <TextField
            fullWidth
            id="name"
            label="Enter Test Name"
            variant="outlined"
            value={state.name}
            onChange={handleChange}
          />
          {name && (
            <p className="text-[11px] text-red-600 mb-[-10px] relative top-[-8px]">
              Please enter your 'Name'
            </p>
          )}
          <TextField
            fullWidth
            id="description"
            label="Description (Optional)"
            variant="outlined"
            value={state.description}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            id="totalTime"
            label="Enter Total Time in minutes"
            variant="outlined"
            value={state.totalTime}
            onChange={handleChange}
          />
          {totalTime && (
            <p className="text-[11px] text-red-600 mb-[-10px] relative top-[-8px]">
              Please enter your 'Total Time'
            </p>
          )}
          <TextField
            fullWidth
            id="totalQuestions"
            label="Enter no of questions"
            variant="outlined"
            value={state.totalQuestions}
            onChange={handleChange}
          />
          {totalQuestions && (
            <p className="text-[11px] text-red-600 mb-[-10px] relative top-[-8px]">
              Please enter your 'Total Questions'
            </p>
          )}
          <TextField
            fullWidth
            id="totalMarks"
            label="Enter Total Marks"
            variant="outlined"
            value={state.totalMarks}
            onChange={handleChange}
          />
          {totalMarks && (
            <p className="text-[11px] text-red-600 mb-[-10px] relative top-[-8px]">
              Please enter your 'Total Marks'
            </p>
          )}
          <TextField
            fullWidth
            id="negativeMarks"
            label="Enter Negative Marking (Optional)"
            variant="outlined"
            value={state.negativeMarks}
            onChange={handleChange}
          />
          <Button
            variant="outlined"
            component="label"
            style={{
              width: "200px",
              display: "flex",
              alignItems: "left",
            }}
          >
            Add Attachment
            <AttachmentIcon />
            <input
              type="file"
              hidden
              accept="application/pdf,image/*"
              onChange={handleFileChange}
            />
          </Button>
          {fileError ? (
            <p className="text-[11px] text-red-600 mb-[-10px] relative top-[-8px]">
              Image Not Selected'
            </p>
          ) : (
            <p>{file.name}</p>
          )}

          <Button
            variant="contained"
            style={{
              width: "500px",
              display: "flex",
              alignItems: "center",
              margin: "auto",
              marginBottom: "40px",
            }}
            type="submit"
          >
            Publish Test
          </Button>
        </form>
      </div>
    </div>
  );
}
