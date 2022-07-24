import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// Redux Store
import { updateWords, updat10HundredWords } from "../../../store/data-slice";
import { useAppSelector, useAppDispatch } from "../../../lib/hooks";

// Components
import { Box, Typography, Button } from "@mui/material";
import WordElement from "../../Dashboard/ProfileSection/RepeatSection/WordElement";
import FinishMessage from "../../UI/CallbackMessages/FinishMessage";
import Words1000 from "../../1000-words/Words1000";

interface Props {
  words: any[];
}

const FinishSection: React.FC<Props> = ({ words }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const dataWords = useAppSelector((state) => state?.data?.data?.data?.words);
  const categories = useAppSelector((state) => state.data.data.data.categories);
  const user = useAppSelector((state) => state.user.user);
  const [hideFinishMessage, setHideFinishMessage] = useState(false);

  let copyOfDataWords: any[] = [];

  if (location.pathname.includes("10-hundred-words")) {
    copyOfDataWords = [
      ...Object.values(
        // @ts-ignore
        Object.values(categories).find((cat) => cat.title === "1000 słów").words
      ),
    ];
  } else {
    copyOfDataWords = [...dataWords];
  }

  words.map((w) => {
    const wordIndex = copyOfDataWords.findIndex((word) => word.id === w.id);
    if (location.pathname.includes("10-hundred-words")) {
      if (w.wasCorrect) {
        copyOfDataWords[wordIndex] = {
          id: w.id,
          status:
            w.status === "weak"
              ? "average"
              : w.status === "average"
              ? "well"
              : "weak",
          word: w.word,
          translation: w.translation,
          known: true,
        };
      } else {
        copyOfDataWords[wordIndex] = {
          id: w.id,
          status:
            w.status === "weak"
              ? "weak"
              : w.status === "average"
              ? "weak"
              : w.status === "well"
              ? "average"
              : "well",
          word: w.word,
          translation: w.translation,
          known: true,
        };
      }
    } else {
      if (w.wasCorrect) {
        copyOfDataWords[wordIndex] = {
          id: w.id,
          status:
            w.status === "weak"
              ? "average"
              : w.status === "average"
              ? "well"
              : "weak",
          word: w.word,
          known: true,
        };
      } else {
        copyOfDataWords[wordIndex] = {
          id: w.id,
          status:
            w.status === "weak"
              ? "weak"
              : w.status === "average"
              ? "weak"
              : w.status === "well"
              ? "average"
              : "well",
          word: w.word,
          known: true,
        };
      }
    }
  });

  useEffect(() => {
    if (location.pathname.includes("10-hundred-words")) {
      dispatch(
        updat10HundredWords(
          user.uid,
          // @ts-ignore
          Object.values(categories).find((cat) => cat.title === "1000 słów").id,
          copyOfDataWords
        )
      );
    } else {
      dispatch(updateWords(user.uid, copyOfDataWords));
    }
  }, [copyOfDataWords, dispatch]);

  return (
    <Box
      sx={{
        mt: 3,
        overflow: "auto",
        height: "78vh",
        "&::-webkit-scrollbar ": {
          display: "none",
        },
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: 300, textAlign: "center", mb: 2 }}
      >
        Ukończyłeś tryb powtarzania słówek
      </Typography>
      <Button
        onClick={() => {
          if (location.pathname.includes("10-hundred-words")) {
            navigate("/dashboard/categories/10-hundred-words", {
              replace: true,
            });
          } else {
            navigate("/dashboard/repeat", {
              replace: true,
            });
          }
        }}
        sx={{ mt: 1 }}
        variant="outlined"
        fullWidth
        color="success"
      >
        Przejdź Dalej
      </Button>

      {words && (
        <>
          <Typography sx={{ mt: 3, textAlign: "center" }}>
            Słówka które udało się tobie utrwalić
          </Typography>

          {words &&
            words
              .map((word) => copyOfDataWords.find((w) => w.id === word.id))
              .map((word, i) => {
                if (location.pathname.includes("10-hundred-words")) {
                  return (
                    <WordElement
                      key={i}
                      oldStatus={words[i]}
                      status={word.status}
                      word={word.word}
                      translation={word.translation}
                    />
                  );
                } else {
                  return (
                    <WordElement
                      key={i}
                      oldStatus={words[i]}
                      status={word.status}
                      word={word.word.word[0]}
                      translation={word.word.translation}
                    />
                  );
                }
              })}
          {!hideFinishMessage && (
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
                correctAnswersQty={5}
                allAnswersQty={10}
                showPoints={false}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default FinishSection;
