import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAudio } from "../../../lib/hooks";
// Redux Store
import { useAppSelector } from "../../../lib/hooks";
// Components
import Wrapper from "../../Repeat/Wrapper";
import TranslatePhrase from "./Excercices/TranslatePhrase";
import TranslatePhraseAng from "./Excercices/TranslatePhraseAng";
import SuccessMessage from "../../Lesson/CallbackMessages/SuccessMessage";
import FailureMessage from "../../Lesson/CallbackMessages/FailureMessage";
import { Box } from "@mui/material";
import FinishSection from "./FinishSection/FinishSection";
// Types
import { FlashCardSetType, FlashCardWordType } from "../../../data.types";
import { findAllByDisplayValue } from "@testing-library/react";

const Learngame = () => {
  const params = useParams();
  const data = useAppSelector((state) => state.data.data);
  const [currentWord, setCurrentWord] = useState(0);
  const [currentSet, setCurrentSet] = useState<FlashCardSetType | null>(null);
  const [words, setWords] = useState<FlashCardWordType[]>([]);
  const [secondTurn, setSecondTurn] = useState<any[]>([]);
  const [answers, setAnswers] = useState<string[] | string>([]);
  const [checkedAnswers, setCheckedAnswers] = useState<boolean | null>(null);
  const isSound = useAppSelector((state) => state.ui.isSound);

  // Audio
  const [playingCorrect, toggleCorrect] = useAudio(
    "https://res.cloudinary.com/dtbemnmn4/video/upload/v1656251453/BeNative/correct-answer_ezfmgk.mp3"
  );
  const [playingIncorrect, toggleInCorrect] = useAudio(
    "https://res.cloudinary.com/dtbemnmn4/video/upload/v1656251453/BeNative/incorrect-answer_z8jqay.mp3"
  );

  console.log(secondTurn);
  console.log(currentSet);

  useEffect(() => {
    if (params.setID && data?.data?.categories) {
      setCurrentSet(
        // @ts-ignore
        Object.values(data?.data?.categories).find(
          (cat: any) => cat.title === "Fiszki"
        ).sets[params.setID]
      );
    }
  }, [data?.data?.categories]);
  useEffect(() => {
    if (currentSet) {
      setWords(currentSet.words);
    }
  }, [currentSet]);

  const checkAnswerHandler = (
    checkedAnswers: boolean,
    answers: string[] | string
  ) => {
    /* Checking if the answer is correct or not. */

    if (checkedAnswers && isSound) {
      // @ts-ignore
      toggleCorrect();
    } else if (!checkedAnswers && isSound) {
      // @ts-ignore
      toggleInCorrect();
    }

    if (currentWord < words.length) {
      if (secondTurn.length) {
        setSecondTurn((prev) => [
          ...prev,
          {
            status: words[currentWord].status,
            concept: words[currentWord].concept,
            wasCorrect: checkedAnswers,
            definition: words[currentWord].definition,
          },
        ]);
      } else {
        setSecondTurn((prev) => [
          {
            status: words[currentWord].status,
            concept: words[currentWord].concept,
            wasCorrect: checkedAnswers,
            definition: words[currentWord].definition,
          },
        ]);
      }
    } else {
      if (
        secondTurn.find(
          (word) => word.id === secondTurn[currentWord - words.length].id
        ).wasCorrect
      ) {
        secondTurn.splice(
          secondTurn.findIndex(
            (prev) =>
              prev.concept === secondTurn[currentWord - words.length].concept
          ),
          1,
          {
            status: secondTurn[currentWord - words.length].status,
            concept: secondTurn[currentWord - words.length].concept,
            definition: secondTurn[currentWord - words.length].definition,
            wasCorrect: checkedAnswers,
          }
        );
      } else {
        secondTurn.splice(
          secondTurn.findIndex(
            (prev) =>
              prev.concept === secondTurn[currentWord - words.length].concept
          ),
          1,
          {
            status: secondTurn[currentWord - words.length].status,
            concept: secondTurn[currentWord - words.length].concept,
            definition: secondTurn[currentWord - words.length].definition,
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
    setCheckedAnswers(null);
  };
  return (
    <Wrapper
      title="Przetłumacz wyrażenie"
      status={(currentWord / words.length / 2) * 100}
    >
      <>
        {currentWord === words.length + secondTurn.length &&
          !!secondTurn.length && <FinishSection words={secondTurn} />}
        {words.length && currentWord < words.length ? (
          <TranslatePhrase
            word={words[currentWord]}
            checkAnswers={checkAnswerHandler}
          />
        ) : (
          ""
        )}
        {words.length === secondTurn.length && (
          <TranslatePhraseAng
            word={secondTurn[currentWord - words.length]}
            checkAnswers={checkAnswerHandler}
          />
        )}

        {typeof checkedAnswers === "boolean" ? (
          currentWord < words.length ? (
            checkedAnswers ? (
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
                  answer={words[currentWord].concept}
                  translation={words[currentWord].definition}
                  correctAnswer={words[currentWord].definition}
                  nextQuestion={nextWordHandler}
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
                <FailureMessage
                  answer={words[currentWord].concept}
                  translation={words[currentWord].definition}
                  correctAnswers={words[currentWord].definition}
                  answers={answers}
                  nextQuestion={nextWordHandler}
                />
              </Box>
            )
          ) : checkedAnswers ? (
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
                answer={secondTurn[currentWord - words.length].definition}
                translation={secondTurn[currentWord - words.length].concept}
                correctAnswer={
                  secondTurn[currentWord - words.length].definition
                }
                nextQuestion={nextWordHandler}
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
              <FailureMessage
                answer={secondTurn[currentWord - words.length].definition}
                translation={secondTurn[currentWord - words.length].concept}
                correctAnswers={
                  secondTurn[currentWord - words.length].definition
                }
                answers={answers}
                nextQuestion={nextWordHandler}
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

export default Learngame;
