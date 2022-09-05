import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

export default function Mcqs(props) {
  const [state, setState] = useState({
    id:Math.random(),
    question: "",
    option_a: "",
    option_b: "",
    option_c: "",
    option_d: "",
    solution: "",
    optionState: "",
  });
  const [errorState, setErrorState] = useState({
    question: false,
    option_a: false,
    option_b: false,
    option_c: false,
    option_d: false,
    solution: false,
    option_state: false,
  });
  const [questionState, setQuestionState] = useState([]);

  const handleChange = (e) => {
    setState((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const optionHandler = (e) => {
    setState((prev) => ({ ...prev, optionState: e.target.id }));
    setErrorState((prev) => ({ ...prev, option_state: false }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const newErrors = {
      question: state.question == "",
      option_a: state.option_a == "",
      option_b: state.option_b == "",
      option_c: state.option_c == "",
      option_d: state.option_d == "",
      solution: state.solution == "",
      option_state: state.optionState == "",
    };

    setErrorState({ ...newErrors });
    for (const value in newErrors) {
      if (newErrors[value] == true) {
        console.log("Form not submitted!");
        return;
      }
    }

    setQuestionState((prev) => [...prev, state])
    // console.log(questionState);

    // console.log(state);
    // state.question = "";
    // state.option_a = "";
    // state.option_b = "";
    // state.option_c = "";
    // state.option_d = "";
    // state.solution = "";
    // state.optionState = "";
  };
  const questionDataHandler = () => {};

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
          id="option_a"
          label="Enter Option a"
          variant="outlined"
          value={state.option_a}
          onChange={handleChange}
        />
        {errorState.option_a && (
          <p className="text-[11px] text-red-600 mb-[-10px] relative top-[-8px]">
            'This field is required'
          </p>
        )}

        <TextField
          fullWidth
          id="option_b"
          label="Enter Option b"
          variant="outlined"
          value={state.option_b}
          onChange={handleChange}
        />
        {errorState.option_b && (
          <p className="text-[11px] text-red-600 mb-[-10px] relative top-[-8px]">
            'This field is required'
          </p>
        )}
        <TextField
          fullWidth
          id="option_c"
          label="Enter Option c"
          variant="outlined"
          value={state.option_c}
          onChange={handleChange}
        />
        {errorState.option_c && (
          <p className="text-[11px] text-red-600 mb-[-10px] relative top-[-8px]">
            'This field is required'
          </p>
        )}
        <TextField
          fullWidth
          id="option_d"
          label="Enter Option d"
          variant="outlined"
          value={state.option_d}
          onChange={handleChange}
        />
        {errorState.option_d && (
          <p className="text-[11px] text-red-600 mb-[-10px] relative top-[-8px]">
            'This field is required'
          </p>
        )}

        <div className="flex ">
          <Button
            variant="outlined"
            id="select_option_a"
            style={{
              width: "15px",
              display: "flex",
              alignItems: "center",
              marginLeft: "0px",
            }}
            onClick={optionHandler}
          >
            A
          </Button>
          <Button
            variant="outlined"
            id="select_option_b"
            style={{
              width: "15px",
              display: "flex",
              alignItems: "center",
              marginLeft: "5px",
            }}
            onClick={optionHandler}
          >
            B
          </Button>
          <Button
            variant="outlined"
            id="select_option_c"
            style={{
              width: "15px",
              display: "flex",
              alignItems: "center",
              marginLeft: "5px",
            }}
            onClick={optionHandler}
          >
            C
          </Button>
          <Button
            variant="outlined"
            id="select_option_d"
            style={{
              width: "15px",
              display: "flex",
              alignItems: "center",
              marginLeft: "5px",
            }}
            onClick={optionHandler}
          >
            D
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
            onClick={submitHandler}
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
            onClick={submitHandler}
          >
            Submit Test    
          </Button>
        </div>
      </form>
      <div className="flex flex-row">
        {questionState.map((question, index) => {
          return (
            <Button
            key={question.id}
              variant="outlined"
              type="submit"
              style={{
                width: "50px",
                display: "flex",
                alignItems: "center",
              }}
              onClick={questionDataHandler}
            >
              {index + 1}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
