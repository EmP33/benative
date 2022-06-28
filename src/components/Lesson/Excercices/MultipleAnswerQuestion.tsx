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

const MultipleAnswerQuestion: React.FC<Props> = ({ task, checkAnswers }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const checkTaskHandler = (answer: string) => {
    if (selectedAnswers.length) {
      setSelectedAnswers((prev) => [...prev, answer]);
    } else {
      setSelectedAnswers([answer]);
    }
    if (!answer || answer === "") return;

    if (typeof task.correctAnswer === "string") return;

    checkAnswers(
      task.correctAnswer
        .map((ans: string) => ans.toLowerCase().trim())
        .includes(answer.toLowerCase().trim()),
      answer
    );
  };

  return (
    <Grid container sx={{ textAlign: "center", mt: 5 }}>
      <Grid item xs={12} sx={{ mb: 8 }}>
        <Typography
          variant="h6"
          sx={{ lineHeight: 2 }}
          dangerouslySetInnerHTML={{ __html: task.translation }}
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

export default MultipleAnswerQuestion;
