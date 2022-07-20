import React, { useState, useEffect, useCallback } from "react";
import { useAppSelector } from "../../../lib/hooks";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// Components
import { Box, Typography } from "@mui/material";
import SectionHeader from "../../UI/SectionHeader";
// Types
import { FlashCardSetType, FlashCardWordType } from "../../../data.types";
import { ArrowLeftTwoTone } from "@mui/icons-material";
import FinishMessage from "./FinishMessage";

const MemoriesGame = () => {
  const params = useParams();
  const navigate = useNavigate();
  const data = useAppSelector((state) => state.data.data);
  // Local State
  const [currentSet, setCurrentSet] = useState<FlashCardSetType | null>(null);
  const [memoriesWords, setMemoriesWords] = useState<any[]>([]);
  const [choosenWord, setChoosenWord] = useState<any>(null);
  const [isFinish, setIsFinish] = useState<boolean>(false);
  const [roundCount, setRoundCount] = useState<number>(0);
  const handleCloseFinish = useCallback(() => {
    navigate(`/dashboard/categories/flash-cards/set/${params.setID}`, {
      replace: true,
    });
    setIsFinish(false);
  }, []);

  useEffect(() => {
    if (data?.data?.categories)
      setCurrentSet(
        // @ts-ignore
        Object.values(data?.data?.categories).find(
          (cat: any) => cat.title === "Fiszki"
        ).sets[params.setID]
      );
  }, [data?.data?.categories]);

  useEffect(() => {
    if (currentSet?.words?.length) {
      setMemoriesWords(
        currentSet.words
          .map((value: FlashCardWordType) => ({ value, sort: Math.random() }))
          .sort((a: any, b: any) => a.sort - b.sort)
          // @ts-ignore
          .map(({ value }) => value)
          .slice(0, 4)
          .map((word) => [word.definition, word.concept])
          .flat()
          .map((word) => ({ word: word, active: false, correct: false }))
          .map((value: any) => ({ value, sort: Math.random() }))
          .sort((a: any, b: any) => a.sort - b.sort)
          // @ts-ignore
          .map(({ value }) => value)
      );
    }
  }, [currentSet]);

  useEffect(() => {
    if (memoriesWords.filter((word) => word.active).length === 2) {
      let activeWords = memoriesWords.filter((word) => word.active);
      setRoundCount((prev) => (prev += 1));
      if (!choosenWord) {
        if (
          currentSet?.words.find((word) => word.concept === activeWords[0].word)
        ) {
          setChoosenWord(
            currentSet?.words.find(
              (word) => word.concept === activeWords[0].word
            )
          );
        } else if (
          currentSet?.words.find((word) => word.concept === activeWords[1].word)
        ) {
          setChoosenWord(
            currentSet?.words.find(
              (word) => word.concept === activeWords[1].word
            )
          );
        } else {
          setTimeout(() => {
            setMemoriesWords((prev: any) =>
              prev.map((w: any) => {
                return {
                  word: w.word,
                  active: false,
                  correct: w.correct,
                };
              })
            );
          }, 500);
        }
      }

      setTimeout(() => {
        if (choosenWord) {
          if (
            !activeWords.filter((word) => word.word === choosenWord?.definition)
              .length
          ) {
            setMemoriesWords((prev: any) =>
              prev.map((w: any) => {
                return {
                  word: w.word,
                  active: false,
                  correct: w.correct || false,
                };
              })
            );
          } else {
            setMemoriesWords((prev) =>
              prev.map((word) => {
                if (word.active) {
                  return { word: word.word, active: false, correct: true };
                } else {
                  return {
                    word: word.word,
                    active: false,
                    correct: word.correct,
                  };
                }
              })
            );
          }
        }
      }, 500);
    }
  }, [choosenWord, memoriesWords, currentSet?.words]);

  /* Checking if there are no words with correct === false, then it is setting isFinish to true. */
  useEffect(() => {
    if (
      memoriesWords.length &&
      !memoriesWords.find((word) => word.correct === false)
    ) {
      setIsFinish(true);
    }
  }, [memoriesWords]);

  /* Checking if there are no active words, then it is setting choosenWord to null. */
  if (memoriesWords.filter((word) => word.active).length === 0) {
    if (choosenWord) {
      setChoosenWord(null);
    }
  }

  const activateCardHandler = (word: {
    word: string;
    active: boolean;
    correct: boolean;
  }) => {
    if (
      memoriesWords.filter((word) => word.active).length === 2 ||
      word.correct
    )
      return;

    setMemoriesWords((prev: any) =>
      prev.map((w: any) => {
        if (w.word === word.word) {
          if (w.active) {
            return {
              word: w.word,
              active: false,
              correct: false,
            };
          } else {
            return {
              word: w.word,
              active: true,
              correct: false,
            };
          }
        } else {
          return w;
        }
      })
    );
  };

  return (
    <Box>
      <SectionHeader />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          columnGap: 2,
          rowGap: 2,
          mt: 2,
        }}
      >
        {memoriesWords
          ? memoriesWords.map((word, i) => (
              <Box
                key={i}
                onClick={() => activateCardHandler(word)}
                sx={{
                  position: "realtive",
                  cursor: "pointer",
                  width: "175px",
                  height: "175px",
                  transition: ".2s ease-in-out",
                  transformStyle: "preserve-3d",
                  background: "linear-gradient(45deg,#22222f,#232331)",
                  borderRadius: 5,
                  p: 1,
                  transform: word.active
                    ? ""
                    : word.correct
                    ? ""
                    : "rotateY(0.5turn)",
                  border: word.correct ? "2px solid #1b5e20" : "",
                  filter: "blur(200%)",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backfaceVisibility: "hidden",
                    transition: "1s ease-in-out",
                    WebkitBoxReflect:
                      "below 0 linear-gradient(transparent,transparent,rgba(0,0,0,.4))",
                  }}
                >
                  <Typography variant="h6" sx={{ fontSize: 23 }}>
                    {word.word}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backfaceVisibility: "hidden",
                    transition: "1s ease-in-out",
                    background: "var(--color-base-dark)",
                    borderRadius: 5,
                    WebkitBoxReflect:
                      "below 0 linear-gradient(transparent,transparent,rgba(0,0,0,.4))",
                    transform: "rotateY(0.5turn)",
                  }}
                >
                  <Typography
                    variant="h2"
                    color="primary"
                    sx={{ fontWeight: "bold" }}
                  >
                    B
                  </Typography>
                </Box>
              </Box>
            ))
          : ""}
        <FinishMessage
          open={isFinish}
          handleClose={handleCloseFinish}
          rounds={roundCount / 2}
        />
      </Box>
    </Box>
  );
};

export default MemoriesGame;
