import React, { useRef, useState } from "react";
// Components
import { Box, Button, Typography, Grid, Paper } from "@mui/material";
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

const MatchWordToImage: React.FC<Props> = ({ task, checkAnswers }) => {
  const answerRef = useRef<HTMLInputElement>(null);

  //   const checkAnswerHandler = () => {
  //     if (!answerRef.current || answerRef.current.value === "") return;
  //     const answer = answerRef.current.value;
  //     if (!answers.length) {
  //       setAnswers([answer]);
  //     } else {
  //       setAnswers((prev) => [...prev, answer]);
  //     }
  //     answerRef.current.value = "";
  //   };

  const checkTaskHandler = () => {
    if (!answerRef.current || answerRef.current.value === "") return;
    const answer = answerRef.current.value;
    if (typeof task.correctAnswer === "string")
      checkAnswers(
        answer.toLowerCase().trim() === task.correctAnswer.toLowerCase().trim(),
        answer
      );
    answerRef.current.value = "";
  };

  return (
    <Grid container sx={{ textAlign: "center", mt: 5 }}>
      <Grid item xs={12} sx={{ margin: "0 auto" }}>
        {task.question && (
          <Paper variant="outlined" sx={{ width: 200, margin: "0 auto" }}>
            <img
              src={task.question}
              srcSet={task.question}
              alt={task.title}
              loading="lazy"
              style={{ width: "100%" }}
            />
          </Paper>
        )}
      </Grid>

      <Grid item xs={12}>
        <CSSTextField
          autoFocus
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

export default MatchWordToImage;
