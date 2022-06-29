import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// Redux Store
import { updateLessonPart } from "../../../store/data-slice";
import { useAppSelector, useAppDispatch } from "../../../lib/hooks";

// Components
import { Box, Typography, Button } from "@mui/material";
import { current } from "@reduxjs/toolkit";

const FinishSection = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();
  const currentLessonPart = useAppSelector(
    (state) => state.user.currentLessonPart
  );
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(
      updateLessonPart(
        user.uid,
        params.category,
        params.lessonID,
        params.partID,
        {
          id: currentLessonPart?.id,
          status: 100,
          tasks: currentLessonPart?.tasks,
          title: currentLessonPart?.title,
          words: currentLessonPart?.words ? currentLessonPart?.words : [],
          order: currentLessonPart?.order,
        }
      )
    );
  }, []);

  return (
    <Box
      sx={{
        textAlign: "center",
        mt: 3,
        overflow: "auto",
        height: "78vh",
        "&::-webkit-scrollbar ": {
          display: "none",
        },
      }}
    >
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
      {currentLessonPart?.words && (
        <>
          <Typography sx={{ mt: 3 }}>
            Poznane przez Ciebie słówka w tej sekcji:
          </Typography>
          {currentLessonPart?.words.map((wordPair, i) => (
            <Box sx={{ display: "flex", textAlign: "left" }} key={i}>
              <Typography
                sx={{
                  mt: 3,
                  fontWeight: "bold",
                  color: "var(--color-tertiary)",
                }}
                variant="body2"
              >
                {wordPair[0]}{" "}
              </Typography>

              <Typography sx={{ mt: 3, textAlign: "left" }} variant="body2">
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
        </>
      )}
    </Box>
  );
};

export default FinishSection;
