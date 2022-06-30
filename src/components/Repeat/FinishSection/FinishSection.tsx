import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Redux Store
import { updateWords } from "../../../store/data-slice";
import { useAppSelector, useAppDispatch } from "../../../lib/hooks";

// Components
import { Box, Typography, Button } from "@mui/material";
import WordElement from "../../Dashboard/RepeatSection/WordElement";

interface Props {
  words: any[];
}

const FinishSection: React.FC<Props> = ({ words }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const dataWords = useAppSelector((state) => state?.data?.data?.data?.words);
  const user = useAppSelector((state) => state.user.user);

  const copyOfDataWords = [...dataWords];

  words.map((w) => {
    const wordIndex = copyOfDataWords.findIndex((word) => word.id === w.id);
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
      };
    }
  });

  console.log(words);

  useEffect(() => {
    dispatch(updateWords(user.uid, copyOfDataWords));
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
        onClick={() => navigate("/dashboard/repeat")}
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
          {words
            .map((word) => copyOfDataWords.find((w) => w.id === word.id))
            .map((word, i) => (
              <WordElement
                key={i}
                oldStatus={words[i]}
                status={word.status}
                word={word.word.word[0]}
                translation={word.word.translation}
              />
            ))}
          {/* {words.map((wordPair, i) => (
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
          ))} */}
        </>
      )}
    </Box>
  );
};

export default FinishSection;
