import React, { useState, useEffect } from "react";
import { useAudio } from "../../../lib/hooks";
// Redux Store
import { useAppSelector } from "../../../lib/hooks";
// Components
import Wrapper from "../Wrapper";
import TranslatePhrase from "./Excercices/TranslatePhrase";
import TranslatePhraseAng from "./Excercices/TranslatePhraseAng";
import { Box } from "@mui/material";
import FailureMessage from "../../Lesson/CallbackMessages/FailureMessage";
import SuccessMessage from "../../Lesson/CallbackMessages/SuccessMessage";
// Types
import { WordType } from "../../../data.types";
import FinishSection from "../FinishSection/FinishSection";

const RepeatWords = () => {
  const words = useAppSelector((state) => state.data?.data?.data?.words);
  const isSound = useAppSelector((state) => state.ui.isSound);
  // Local State
  const [currentWord, setCurrentWord] = useState(0);
  const [usedWords, setUsedWords] = useState<WordType[]>([]);
  const [answers, setAnswers] = useState<string[] | string>([]);
  const [checkedAnswers, setCheckedAnswers] = useState<boolean[] | boolean>([]);
  const [secondTurn, setSecondTurn] = useState<any[]>([]);
  // Audio
  const [playingCorrect, toggleCorrect] = useAudio(
    "https://res.cloudinary.com/dtbemnmn4/video/upload/v1656251453/BeNative/correct-answer_ezfmgk.mp3"
  );
  const [playingIncorrect, toggleInCorrect] = useAudio(
    "https://res.cloudinary.com/dtbemnmn4/video/upload/v1656251453/BeNative/incorrect-answer_z8jqay.mp3"
  );

  useEffect(() => {
    if (words) {
      // 10 - count of words in repetition
      /* Taking the first 10 words from the array and setting them to the state. */
      setUsedWords(
        words
          .map((value: WordType) => ({ value, sort: Math.random() }))
          .sort((a: any, b: any) => a.sort - b.sort)
          // @ts-ignore
          .map(({ value }) => value)
          .slice(0, 10)
      );
    }
  }, [words]);

  const checkAnswers = (
    checkedAnswers: boolean[] | boolean,
    answers: string[] | string
  ) => {
    /* Checking if the answer is correct or not. */
    if (typeof checkedAnswers === "boolean") {
      if (checkedAnswers && isSound) {
        // @ts-ignore
        toggleCorrect();
      } else if (!checkedAnswers && isSound) {
        // @ts-ignore
        toggleInCorrect();
      }
    } else {
      if (checkedAnswers.every((ans) => ans === true) && isSound) {
        // @ts-ignore
        toggleCorrect();
      } else if (checkedAnswers.some((ans) => ans === false) && isSound) {
        // @ts-ignore
        toggleInCorrect();
      }
    }

    if (currentWord < usedWords.length) {
      if (secondTurn.length) {
        setSecondTurn((prev) => [
          ...prev,
          {
            status: usedWords[currentWord].status,
            id: usedWords[currentWord].id,
            word: usedWords[currentWord].word,
            wasCorrect: checkedAnswers,
          },
        ]);
      } else {
        setSecondTurn((prev) => [
          {
            status: usedWords[currentWord].status,
            id: usedWords[currentWord].id,
            word: usedWords[currentWord].word,
            wasCorrect: checkedAnswers,
          },
        ]);
      }
    } else {
      if (
        secondTurn.find((word) => word.id === secondTurn[currentWord - 10].id)
          .wasCorrect
      ) {
        secondTurn.splice(
          secondTurn.findIndex(
            (prev) => prev.id === secondTurn[currentWord - 10].id
          ),
          1,
          {
            status: secondTurn[currentWord - 10].status,
            id: secondTurn[currentWord - 10].id,
            word: secondTurn[currentWord - 10].word,
            wasCorrect: checkedAnswers,
          }
        );
      } else {
        secondTurn.splice(
          secondTurn.findIndex(
            (prev) => prev.id === secondTurn[currentWord - 10].id
          ),
          1,
          {
            status: secondTurn[currentWord - 10].status,
            id: secondTurn[currentWord - 10].id,
            word: secondTurn[currentWord - 10].word,
            wasCorrect: false,
          }
        );
      }

      setSecondTurn((prev) => [...prev]);
    }

    setCheckedAnswers(checkedAnswers);
    setAnswers(answers);
  };

  const nextWordHandler = () => {
    setCurrentWord((prev) => prev + 1);
    setAnswers([]);
    setCheckedAnswers([]);
  };

  return (
    <Wrapper
      title="Przetłumacz wyrażenie"
      status={(currentWord / usedWords.length / 2) * 100}
    >
      <>
        {currentWord === usedWords.length + secondTurn.length &&
          !!secondTurn.length && <FinishSection words={secondTurn} />}
        {!!usedWords.length && currentWord < usedWords.length && (
          <TranslatePhrase
            word={usedWords[currentWord]}
            checkAnswers={checkAnswers}
          />
        )}
        {usedWords.length === secondTurn.length && (
          <TranslatePhraseAng
            word={secondTurn[currentWord - 10]}
            checkAnswers={checkAnswers}
          />
        )}
        {typeof checkedAnswers === "boolean" ? (
          currentWord < usedWords.length ? (
            !checkedAnswers && usedWords.length ? (
              <Box
                onClick={nextWordHandler}
                sx={{
                  width: "100%",
                  height: "100%",
                  background: "rgba(0,0,0,.5)",
                  position: "absolute",
                  left: 0,
                  top: 0,
                }}
              >
                <FailureMessage
                  answer={
                    usedWords[currentWord].word?.word &&
                    usedWords[currentWord].word?.word[0]
                  }
                  translation={usedWords[currentWord].word.translation}
                  correctAnswers={usedWords[currentWord].word.word}
                  answers={answers}
                />
              </Box>
            ) : (
              <Box
                onClick={nextWordHandler}
                sx={{
                  width: "100%",
                  height: "100%",
                  background: "rgba(0,0,0,.5)",
                  position: "absolute",
                  left: 0,
                  top: 0,
                }}
              >
                <SuccessMessage
                  answer={
                    usedWords[currentWord].word?.word &&
                    usedWords[currentWord].word?.word[0]
                  }
                  translation={usedWords[currentWord].word.translation}
                  correctAnswer={usedWords[currentWord].word.word}
                />
              </Box>
            )
          ) : !checkedAnswers && secondTurn.length ? (
            <Box
              onClick={nextWordHandler}
              sx={{
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,.5)",
                position: "absolute",
                left: 0,
                top: 0,
              }}
            >
              <FailureMessage
                answer={
                  secondTurn[currentWord - 10].word?.word &&
                  secondTurn[currentWord - 10].word?.word[0]
                }
                translation={secondTurn[currentWord - 10].word.translation}
                correctAnswers={secondTurn[currentWord - 10].word.translation}
                answers={answers}
              />
            </Box>
          ) : (
            <Box
              onClick={nextWordHandler}
              sx={{
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,.5)",
                position: "absolute",
                left: 0,
                top: 0,
              }}
            >
              <SuccessMessage
                answer={
                  secondTurn[currentWord - 10].word?.word &&
                  secondTurn[currentWord - 10].word?.word[0]
                }
                translation={secondTurn[currentWord - 10].word.translation}
                correctAnswer={secondTurn[currentWord - 10].word.word}
              />
            </Box>
          )
        ) : checkedAnswers.length ===
          usedWords[currentWord]?.word.word?.length ? (
          checkedAnswers.includes(false) ? (
            <Box
              onClick={nextWordHandler}
              sx={{
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,.5)",
                position: "absolute",
                left: 0,
                top: 0,
              }}
            >
              <FailureMessage
                answer={usedWords[currentWord].word?.word[0]}
                translation={usedWords[currentWord].word.translation}
                correctAnswers={usedWords[currentWord].word.word}
                answers={answers}
              />
            </Box>
          ) : (
            <Box
              onClick={nextWordHandler}
              sx={{
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,.5)",
                position: "absolute",
                left: 0,
                top: 0,
              }}
            >
              <SuccessMessage
                answer={usedWords[currentWord].word?.word[0]}
                translation={usedWords[currentWord].word.translation}
                correctAnswer={usedWords[currentWord].word.word}
              />
            </Box>
          )
        ) : (
          ""
        )}
      </>
    </Wrapper>
  );
};

export default RepeatWords;
