import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

export default function TrueFalse() {
  const [state, setState] = useState({
    question: "",
    optionState: "",
  });
  const [errorState, setErrorState] = useState({
    question: false,
    option_state: false,
  });
  const submitHandler = (e) => {
    e.preventDefault();
    const newErrors = {
      question: state.question == "",
      option_state: state.optionState == "",
    };

    setErrorState({...newErrors});
    for(const value in newErrors){
      if(newErrors[value] == true){
        console.log("Form not submitted!")
        return;
      }
    }
    console.log(state);
    state.question = "";
    state.optionState = "";
    
  };
  const handleChange = (e) => {
    setState((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const optionHandler = (e) => {
    setState((prev) => ({ ...prev, optionState: e.target.id }));
    setErrorState((prev) => ({ ...prev, option_state: false }));

  };
  return (
    <div className="flex flex-col gap-y-[16px] w-[100%] mb-[12px]">
      <form
        className="max-w-[500px] w-[100%] m-auto flex flex-col gap-y-4 justify-start"
        onSubmit={submitHandler}
      >
        <TextField
          fullWidth
          id="question"
          label="Question"
          variant="outlined"
          value={state.question}
          onChange={handleChange}
        />
        {errorState.question && (
          <p className="text-[11px] text-red-600 mb-[-10px] relative top-[-8px]">
            This field is requred'
          </p>
        )}

        <span>Select correct option:-</span>

        <div className=" justify-start flex gap-x-[1px] w-[100%]  ">
          <Button
            variant="outlined"
            id="true"
            style={{
              width: "90px",
              display: "flex",
            }}
            onClick={optionHandler}
          >
            TRUE
          </Button>
          <Button
            variant="outlined"
            id="false"
            style={{
              width: "90px",
              display: "flex",
            }}
            onClick={optionHandler}
          >
            FALSE
          </Button>
        </div>
        {errorState.option_state ? (
          <p className="text-[11px] text-red-600 mb-[-10px] relative top-[-8px]">
            'Select any option from above'
          </p>
        ) : (
          <p className="text-[11px] text-red-600 mb-[-10px] relative top-[-8px]">
            {state.optionState == "" ? "" : `${state.optionState}  is selected`}
          </p>
        )}
        <div className="flex justify-start">
          <Button
            variant="contained"
            type="submit"
            style={{
              width: "200px",
              display: "flex",
              alignItems: "center",
            }}
            onSubmit={submitHandler}
          >
            ADD NEW QUESTION
          </Button>
        </div>
        <div className="flex justify-center">
          <Button
            variant="contained"
            style={{
              width: "500px",
              display: "flex",
              alignItems: "center",
            }}
            onSubmit={submitHandler}
          >
            Submit Test
          </Button>
        </div>
      </form>
    </div>
  );
}
