import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../lib/hooks";
// Components
import { Box, Typography, Button } from "@mui/material";

const FinishSection = () => {
  const navigate = useNavigate();
  const currentLessonPart = useAppSelector(
    (state) => state.user.currentLessonPart
  );

  return (
    <Box sx={{ textAlign: "center", mt: 3 }}>
      <Typography variant="h6">Udało się Tobie ukończyć część:</Typography>
      <Typography
        variant="body1"
        sx={{ color: "var(--color-primary)", fontWeight: "bold" }}
      >
        {currentLessonPart?.title}
      </Typography>
      <Button
        onClick={() => navigate("/dashboard")}
        sx={{ mt: 1 }}
        variant="outlined"
        fullWidth
        color="success"
      >
        Przejdź Dalej
      </Button>
      <Typography sx={{ mt: 3 }}>
        Poznane przez Ciebie słówka w tej sekcji:
      </Typography>
      {currentLessonPart?.words.map((wordPair, i) => (
        <Box sx={{ display: "flex" }} key={i}>
          <Typography
            sx={{ mt: 3, fontWeight: "bold", color: "var(--color-tertiary)" }}
            variant="body2"
          >
            {wordPair[0]}{" "}
          </Typography>

          <Typography sx={{ mt: 3 }} variant="body2">
            {" "}
            -{wordPair[1]}
          </Typography>
        </Box>
      ))}
      <Typography
        sx={{ mt: 3, fontWeight: "bold", color: "var(--color-primary)" }}
        variant="body2"
      >
        Zostaną one dodane do sekcji POWTÓRZ
      </Typography>
    </Box>
  );
};

export default FinishSection;
