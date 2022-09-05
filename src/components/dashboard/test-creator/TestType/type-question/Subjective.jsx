import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

export default function Subjective() {
  const [state, setState] = useState({
    question: "",
    solution: "",
  });
  const [errorState, setErrorState] = useState({
    question: false,
    solution: false,
  });

  const handleChange = (e) => {
    setState((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const newErrors = {
      question: state.question == "",
      solution: state.solution == "",
    };


    setErrorState({...newErrors})
    
    for (const value in newErrors) {
      if (newErrors[value] == true) {
        console.log("Form not submitted!");
        return;
      }
    }
    console.log(state);
    state.question = "";
    state.solution = "";
    
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

        <TextField
          fullWidth
          id="solution"
          label="Solution"
          variant="outlined"
          value={state.solution}
          onChange={handleChange}
        />
        {errorState.solution && (
          <p className="text-[11px] text-red-600 mb-[-10px] relative top-[-8px]">
            'This field is required'
          </p>
        )}
        <div className="flex justify-start">
          <Button
            variant="outlined"
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
