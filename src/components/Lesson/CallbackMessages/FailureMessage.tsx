import React from "react";
// Components
import { Box, Typography } from "@mui/material";
// Icons
import SadFace from "../../../assets/SadFace";

interface Props {
  answer: string;
  translation: string;
  correctAnswers: string[];
  answers: string[];
}

const FailureMessage: React.FC<Props> = ({
  answer,
  translation,
  correctAnswers,
  answers,
}) => {
  console.log(correctAnswers, answers);
  return (
    <Box
      onClick={(e) => e.stopPropagation()}
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
        <Typography variant="h6" sx={{ color: "var(--color-danger)" }}>
          Niepoprawne!
        </Typography>
        <Box
          sx={{
            width: 75,
            background: "var(--color-danger)",
            borderRadius: "50%",
            position: "absolute",
            right: 25,
            top: -20,
          }}
        >
          <SadFace />
        </Box>
      </Box>
      <Box sx={{ background: "var(--color-base-dark)", p: 2, borderRadius: 5 }}>
        <Typography>{answer}</Typography>
        <Typography
          variant="body2"
          sx={{ mb: 3, fontWeight: "bold", color: "var(--color-primary)" }}
        >
          {translation}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontWeight: "bold", color: "var(--color-tertiary)" }}
        >
          Poprawna odpowiedź
        </Typography>
        <Typography>{correctAnswers.join(", ")}</Typography>
        <Typography
          variant="body2"
          sx={{ fontWeight: "bold", color: "var(--color-danger)", mt: 2 }}
        >
          Twoja odpowiedź
        </Typography>
        <Typography>{answers.join(", ")}</Typography>
      </Box>
    </Box>
  );
};

export default FailureMessage;
