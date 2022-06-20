import React, { useRef, useState } from "react";
// Components
import { Box, Button, Typography, Grid } from "@mui/material";
import { CSSTextField } from "../../UI/Components.style";
// Types
import { TaskType } from "../../../data.types";

interface Props {
  task: TaskType;
}

const FillConversation: React.FC<Props> = ({ task }) => {
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
    if (!answerRef.current) return;
    console.log(answers.length);
    const answer = answerRef.current.value;
    if (!answers.length) {
      setAnswers([answer]);
    } else {
      setAnswers((prev) => [...prev, answer]);
    }
    answerRef.current.value = "";
    // @ts-ignore
    console.log(task.correctAnswer.filter((answ) => answ.trim() !== answer));
  };

  console.log(answers);

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
          {answers.map((answer) => (
            <Typography
              key={answer}
              variant="body1"
              sx={{
                p: 1,
                background: " var(--color-primary)",
                borderRadius: 2,
              }}
            >
              {answer}
            </Typography>
          ))}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <CSSTextField
          inputRef={answerRef}
          type="text"
          variant="outlined"
          color="success"
          sx={{ width: "70%", mt: 5, input: { color: "#86868f" } }}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          onClick={checkAnswerHandler}
          onKeyUp={(e) => console.log(e)}
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

export default FillConversation;
