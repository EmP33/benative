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

const MatchToGap: React.FC<Props> = ({ task, checkAnswers }) => {
  const checkTaskHandler = (answer: string) => {
    if (!answer || answer === "") return;
    if (typeof task.correctAnswer === "string")
      checkAnswers(
        answer.toLowerCase().trim() === task.correctAnswer.toLowerCase().trim(),
        answer
      );
  };

  let phrase = task.question
    .toLowerCase()
    .split(" ")
    .map((word) => (word === task.correctAnswer ? "_" : word))
    .join(" ");

  return (
    <Grid container sx={{ textAlign: "center", mt: 5 }}>
      <Grid item xs={12} sx={{ mb: 8 }}>
        <Typography
          variant="h6"
          sx={{
            lineHeight: 2,
            "&::first-letter": { textTransform: "uppercase" },
          }}
          dangerouslySetInnerHTML={{ __html: phrase }}
        ></Typography>
      </Grid>

      {/* It's a random sort of the answers. */}
      {task.answers &&
        task.answers
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value)
          .map((answer) => (
            <Grid key={answer} item xs={12}>
              <Box
                onClick={() => checkTaskHandler(answer)}
                sx={{
                  p: 2,
                  cursor: "pointer",
                  border: "2px solid #606174",
                  m: 1.5,
                  color: "#9496b3",
                  borderRadius: 5,

                  "&:hover": {
                    background: "#585a75",
                    color: "#fff",
                  },
                }}
              >
                {answer}
              </Box>
            </Grid>
          ))}
    </Grid>
  );
};

export default MatchToGap;
