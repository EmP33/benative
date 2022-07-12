import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// Redux Store
import { updateLessonPart, updateWord } from "../../../store/data-slice";
import { useAppSelector, useAppDispatch } from "../../../lib/hooks";

// Components
import { Box, Typography, Button } from "@mui/material";
import FinishMessage from "../../UI/CallbackMessages/FinishMessage";
// Types
import { WordType } from "../../../data.types";

interface Props {
  resultAnswers: boolean[];
}

const FinishSection: React.FC<Props> = ({ resultAnswers }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();
  const currentLessonPart = useAppSelector(
    (state) => state.user.currentLessonPart
  );
  const data = useAppSelector((state) => state.data.data);
  const user = useAppSelector((state) => state.user.user);
  // Local State
  const [words, setWords] = useState(data.data.words);
  const [hideFinishMessage, setHideFinishMessage] = useState(false);

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

  if (currentLessonPart) {
    currentLessonPart.words.map((w) => {
      const wordIndex = words.findIndex((word: WordType) =>
        word.word.word.includes(w[0])
      );
      const word = words.find((word: any) => word.word.word.includes(w[0]));
      dispatch(
        updateWord(
          user.uid,
          { id: word.id, known: true, status: word.status, word: word.word },
          wordIndex
        )
      );
    });
  }

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
      {!hideFinishMessage && !!resultAnswers.length && (
        <Box
          onClick={() => setHideFinishMessage(true)}
          sx={{
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,.5)",
            position: "absolute",
            left: 0,
            top: 0,
          }}
        >
          <FinishMessage
            correctAnswersQty={
              resultAnswers.filter((ans) => ans === true).length
            }
            allAnswersQty={resultAnswers.length}
            showPoints={true}
          />
        </Box>
      )}
    </Box>
  );
};

export default FinishSection;
