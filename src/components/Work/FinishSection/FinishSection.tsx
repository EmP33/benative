import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
// Redux Store
import { updateWorkWords } from "../../../store/data-slice";
import { useAppSelector, useAppDispatch } from "../../../lib/hooks";

// Components
import { Box, Typography, Button } from "@mui/material";
import WordElement from "../../Dashboard/ProfileSection/RepeatSection/WordElement";
import FinishMessage from "./FinishMessage";
// Types
import { SituationLessonType, SituationWordType } from "../../../data.types";

interface Props {
  words: any[];
}

const FinishSection: React.FC<Props> = ({ words }) => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state?.data?.data);
  const user = useAppSelector((state) => state.user.user);
  // Local State
  const [currentSet, setCurrentSet] = useState<SituationLessonType | null>(
    null
  );
  const [copyOfDataWords, setCopyOfDataWords] = useState<SituationWordType[]>(
    []
  );
  const [hideFinishMessage, setHideFinishMessage] = useState(false);

  useEffect(() => {
    setCurrentSet(
      // @ts-ignore
      Object.values(data.data.categories).find(
        (cat: any) => cat.title === "Praca"
      ).lessons[params.lessonID]
    );
  }, [data?.data?.categories]);

  useEffect(() => {
    if (currentSet?.words) {
      setCopyOfDataWords([...currentSet.words]);
    }
  }, [currentSet?.words]);

  useEffect(() => {
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
          translation: w.translation,
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
        };
      }
    });
  }, [copyOfDataWords]);

  useEffect(() => {
    console.log(copyOfDataWords);
    if (params.lessonID && copyOfDataWords.length === words.length) {
      dispatch(
        updateWorkWords(
          user.uid, // @ts-ignore
          Object.values(data.data.categories).find(
            (cat: any) => cat.title === "Praca"
          ).id,
          params.lessonID,
          copyOfDataWords
        )
      );
    }
  }, [copyOfDataWords, params?.lessonID]);

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
          navigate(`/dashboard/categories/work/${params.lessonID}`, {
            replace: true,
          });
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
          <Typography sx={{ mt: 3, mb: 2, textAlign: "center" }}>
            Słówka które udało się tobie utrwalić
          </Typography>

          {words &&
            words
              .map((word) => copyOfDataWords.find((w) => w.id === word.id))
              .map((word, i) => {
                if (word) {
                  return (
                    <WordElement
                      key={i}
                      oldStatus={words[i]}
                      status={word.status}
                      word={
                        typeof word.word === "string" ? word.word : word.word[0]
                      }
                      translation={word.translation}
                    />
                  );
                } else {
                  return "";
                }
              })}
        </>
      )}
      {!hideFinishMessage && !!words.length && (
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
              words.filter((word) => word.wasCorrect === true).length
            }
            allAnswersQty={words.length}
            showPoints={true}
          />
        </Box>
      )}
    </Box>
  );
};

export default FinishSection;
