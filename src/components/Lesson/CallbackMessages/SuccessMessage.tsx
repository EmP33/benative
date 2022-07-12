import React from "react";
// Components
import { Box, Typography } from "@mui/material";
// Icons
import SmileFace from "../../../assets/SmileFace";

interface Props {
  answer: string;
  translation: string;
  correctAnswer: string | string[];
  nextQuestion: () => void;
}

const SuccessMessage: React.FC<Props> = ({
  answer,
  translation,
  correctAnswer,
  nextQuestion,
}) => {
  return (
    <Box
      onClick={nextQuestion}
      sx={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
        background: "var(--color-base-dark)",
        width: "80%",
        borderRadius: 5,
      }}
    >
      <Box
        sx={{
          background: "var(--color-base-light)",
          p: 2,
          position: "relative",
          borderRadius: "20px 20px 0 0",
        }}
      >
        <Typography variant="h6" sx={{ color: "var(--color-tertiary-light)" }}>
          Poprawne!
        </Typography>
        <Box
          sx={{
            width: 75,
            background: "var(--color-tertiary-light)",
            borderRadius: "50%",
            position: "absolute",
            right: 25,
            top: -20,
          }}
        >
          <SmileFace />
        </Box>
      </Box>
      <Box sx={{ background: "var(--color-base-dark)", p: 2, borderRadius: 5 }}>
        <Typography>
          {answer.includes("https") || answer.includes("http")
            ? correctAnswer
            : answer}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "var(--color-grey-1)", mb: 1 }}
        >
          {translation}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mb: 3,
            fontWeight: "bold",
            color: "var(--color-tertiary-dark)",
          }}
        >
          {typeof correctAnswer === "string"
            ? correctAnswer
            : correctAnswer.join(" | ")}
        </Typography>
      </Box>
    </Box>
  );
};

export default SuccessMessage;
