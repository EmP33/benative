import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
// Components
import { Box, Button, Typography, Grid } from "@mui/material";
import { CSSTextField } from "../../../UI/Components.style";
// Types
import { WordType } from "../../../../data.types";

interface Props {
  word: any;
  checkAnswers: (
    checkedAnswers: boolean[] | boolean,
    answers: string[] | string
  ) => void;
}

const TranslatePhraseAng: React.FC<Props> = ({ word, checkAnswers }) => {
  const location = useLocation();
  const answerRef = useRef<HTMLInputElement>(null);

  const checkTaskHandler = () => {
    if (!answerRef.current || answerRef.current.value === "") return;
    const answer = answerRef.current.value;
    if (typeof word.word.word === "string") return;
    if (location.pathname.includes("10-hundred-words")) {
      const checkedAnswer =
        word.translation.toLowerCase().trim() === answer.toLowerCase().trim();

      checkAnswers(checkedAnswer, answer);
      answerRef.current.blur();
      answerRef.current.value = "";
    } else {
      const checkedAnswer =
        word.word.translation.toLowerCase().trim() ===
        answer.toLowerCase().trim();

      checkAnswers(checkedAnswer, answer);
      answerRef.current.blur();
      answerRef.current.value = "";
    }
  };

  return (
    <Grid container sx={{ textAlign: "center", mt: 5 }}>
      <Grid item xs={12}>
        {location.pathname.includes("10-hundred-words") ? (
          <Typography
            variant="h6"
            sx={{ lineHeight: 2 }}
            dangerouslySetInnerHTML={{ __html: word?.word }}
          ></Typography>
        ) : (
          <Typography
            variant="h6"
            sx={{ lineHeight: 2 }}
            dangerouslySetInnerHTML={{ __html: word?.word?.word[0] }}
          ></Typography>
        )}
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

export default TranslatePhraseAng;
