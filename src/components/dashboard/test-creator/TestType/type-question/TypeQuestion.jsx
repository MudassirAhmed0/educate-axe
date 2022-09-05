import React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import Mcqs from "./Mcqs";
import Subjective from "./Subjective";
import TrueFalse from "./TrueFalse";

export default function TestPaper() {
  const [mcqs, setMcqs] = useState(true);
  const [subjective, setSubjective] = useState(false);
  const [trueFalse, setTrueFalse] = useState(false);

  const mcqHandler = () => {
    setMcqs(true);
    setSubjective(false);
    setTrueFalse(false);
  };
  const subjectiveHnadler = () => {
    setSubjective(true);
    setMcqs(false);
    setTrueFalse(false);
  };
  const trueFalseHnadler = () => {
    setTrueFalse(true);
    setMcqs(false);
    setSubjective(false);
  };

  return (
    <div className="flex flex-col gap-y-[16px] w-[100%] mt-[10px]">
      <div className="max-w-[500px]  m-auto flex gap-x-[16px]  justify-start">
        <Button
          variant="outlined"
          style={{
            width: "200px",
            display: "flex",
            alignItems: "center",
            marginLeft: "5px",
          }}
          onClick={mcqHandler}
        >
          MCQS
        </Button>
        <Button
          variant="outlined"
          style={{
            width: "200px",
            display: "flex",
            alignItems: "center",
            marginLeft: "5px",
          }}
          onClick={subjectiveHnadler}
        >
          SUBJECTIVE
        </Button>
        <Button
          variant="outlined"
          style={{
            width: "200px",
            display: "flex",
            alignItems: "center",
            marginLeft: "5px",
          }}
          onClick={trueFalseHnadler}
        >
          T/F
        </Button>
      </div>

      {mcqs && <Mcqs />}
      {subjective && <Subjective />}
      {trueFalse && <TrueFalse />}
    </div>
  );
}
