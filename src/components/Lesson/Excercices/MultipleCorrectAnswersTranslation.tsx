import React, { useRef, useState } from "react";
// Components
import { Box, Button, Typography, Grid } from "@mui/material";
import { CSSTextField } from "../../UI/Components.style";
// Types
import { TaskType } from "../../../data.types";

interface Props {
  task: TaskType;
  checkAnswers: (
    checkedAnswers: boolean[] | boolean,
    answers: string[] | string
  ) => void;
}

const MultipleCorrectAnswersTranslation: React.FC<Props> = ({
  task,
  checkAnswers,
}) => {
  const answerRef = useRef<HTMLInputElement>(null);

  const checkTaskHandler = () => {
    if (!answerRef.current || answerRef.current.value === "") return;
    const answer = answerRef.current.value;
    if (typeof task.correctAnswer === "string") return;
    const checkedAnswer = task.correctAnswer
      .map((ans: string) => ans.toLowerCase().trim())
      .includes(answer.toLowerCase().trim());

    checkAnswers(checkedAnswer, answer);
    answerRef.current.value = "";
  };

  return (
    <Grid container sx={{ textAlign: "center", mt: 5 }}>
      <Grid item xs={12}>
        <Typography
          variant="h6"
          sx={{ lineHeight: 2 }}
          dangerouslySetInnerHTML={{ __html: task.translation }}
        ></Typography>
      </Grid>

      <Grid item xs={12}>
        <CSSTextField
          onKeyUp={(e) => e.key === "Enter" && checkTaskHandler()}
          inputRef={answerRef}
          type="text"
          variant="outlined"
          color="success"
          sx={{ width: "70%", mt: 5, input: { color: "#86868f" } }}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          onClick={checkTaskHandler}
          size="large"
          variant="contained"
          sx={{ width: "70%", mt: 2 }}
        >
          Sprawdź
        </Button>
      </Grid>
    </Grid>
  );
};

export default MultipleCorrectAnswersTranslation;
