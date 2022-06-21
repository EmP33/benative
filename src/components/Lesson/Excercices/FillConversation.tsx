import React, { useRef, useState } from "react";
// Components
import { Box, Button, Typography, Grid } from "@mui/material";
import { CSSTextField } from "../../UI/Components.style";
// Types
import { TaskType } from "../../../data.types";

interface Props {
  task: TaskType;
  checkAnswers: (checkedAnswers: boolean[], answers: string[]) => void;
}

const FillConversation: React.FC<Props> = ({ task, checkAnswers }) => {
  const answerRef = useRef<HTMLInputElement>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  let question = task.question
    .toLowerCase()
    .split(" ")
    .map((word) =>
      // @ts-ignore
      task.correctAnswer.map((word: string) => word.trim()).includes(word)
        ? ` _ `
        : word
    )
    .join(" ");

  const checkAnswerHandler = () => {
    if (!answerRef.current || answerRef.current.value === "") return;
    const answer = answerRef.current.value;
    if (!answers.length) {
      setAnswers([answer]);
    } else {
      setAnswers((prev) => [...prev, answer]);
    }
    answerRef.current.value = "";
  };

  const checkTaskHandler = () => {
    if (answers.length === task.correctAnswer.length) {
      const checkedAnswers = answers.map((answer) =>
        task.correctAnswer
          // @ts-ignore
          .map((ans: string) => ans.trim())
          .includes(answer.toLowerCase())
      );
      checkAnswers(checkedAnswers, answers);
    }
  };

  return (
    <Grid container sx={{ textAlign: "center", mt: 5 }}>
      <Grid item xs={12}>
        <Typography
          variant="h6"
          dangerouslySetInnerHTML={{ __html: question }}
        ></Typography>
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{
            width: "90%",
            margin: "0 auto",
            minHeight: 75,
            background: "var(--color-base-light)",
            mt: 3,
            display: "flex",
            p: 2,
            borderRadius: 3,
            columnGap: 2,
            rowGap: 2,
            flexWrap: "wrap",
          }}
        >
          {answers.map((answer, key) => (
            <Typography
              key={key}
              variant="body1"
              sx={{
                p: 1,
                background: " var(--color-primary)",
                borderRadius: 2,
                cursor: "pointer",

                "&:hover": {
                  filter: "brightness(80%)",
                },
              }}
              onClick={() =>
                setAnswers((prev) => prev.filter((ans) => ans !== answer))
              }
            >
              {answer}
            </Typography>
          ))}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <CSSTextField
          disabled={task.correctAnswer.length === answers.length}
          onKeyUp={(e) => e.key === "Enter" && checkAnswerHandler()}
          inputRef={answerRef}
          type="text"
          variant="outlined"
          color="success"
          sx={{ width: "70%", mt: 5, input: { color: "#86868f" } }}
        />
      </Grid>
      <Grid item xs={12}>
        {task.correctAnswer.length === answers.length ? (
          <Button
            onClick={checkTaskHandler}
            size="large"
            variant="contained"
            sx={{ width: "70%", mt: 2 }}
          >
            Sprawdź
          </Button>
        ) : (
          <Button
            onClick={checkAnswerHandler}
            size="large"
            variant="contained"
            sx={{ width: "70%", mt: 2 }}
          >
            Dodaj
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default FillConversation;
