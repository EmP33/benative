import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAudio } from "../../lib/hooks";
// Redux Store
import { useAppSelector } from "../../lib/hooks";
// Components
import Wrapper from "../Repeat/Wrapper";
import TranslatePhrase from "./Excercices/TranslatePhrase";
import TranslatePhraseAng from "./Excercices/TranslatePhraseAng";
import SuccessMessage from "../Lesson/CallbackMessages/SuccessMessage";
import FailureMessage from "../Lesson/CallbackMessages/FailureMessage";
import { Box } from "@mui/material";
import FinishSection from "./FinishSection/FinishSection";
// Types
import { SituationLessonType, SituationWordType } from "../../data.types";

const Learngame = () => {
  const params = useParams();
  const data = useAppSelector((state) => state.data.data);
  const [currentWord, setCurrentWord] = useState(0);
  const [currentSet, setCurrentSet] = useState<SituationLessonType | null>(
    null
  );
  const [words, setWords] = useState<SituationWordType[]>([]);
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

  useEffect(() => {
    if (params.lessonID && data?.data?.categories) {
      setCurrentSet(
        // @ts-ignore
        Object.values(data?.data?.categories).find(
          (cat: any) => cat.title === "Sytuacje"
        ).lessons[params.lessonID]
      );
    }
  }, [data?.data?.categories]);
  useEffect(() => {
    if (currentSet) {
      setWords(
        currentSet.words
          .map((value: SituationWordType) => ({ value, sort: Math.random() }))
          .sort((a: any, b: any) => a.sort - b.sort)
          // @ts-ignore
          .map(({ value }) => value)
          .slice(0, 10)
      );
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
            id: words[currentWord].id,
            status: words[currentWord].status,
            word: words[currentWord].word,
            wasCorrect: checkedAnswers,
            translation: words[currentWord].translation,
          },
        ]);
      } else {
        setSecondTurn((prev) => [
          {
            id: words[currentWord].id,
            status: words[currentWord].status,
            word: words[currentWord].word,
            wasCorrect: checkedAnswers,
            translation: words[currentWord].translation,
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
            (prev) => prev.word === secondTurn[currentWord - words.length].word
          ),
          1,
          {
            id: secondTurn[currentWord - words.length].id,
            status: secondTurn[currentWord - words.length].status,
            word: secondTurn[currentWord - words.length].word,
            translation: secondTurn[currentWord - words.length].translation,
            wasCorrect: checkedAnswers,
          }
        );
      } else {
        secondTurn.splice(
          secondTurn.findIndex(
            (prev) => prev.word === secondTurn[currentWord - words.length].word
          ),
          1,
          {
            id: secondTurn[currentWord - words.length].id,
            status: secondTurn[currentWord - words.length].status,
            word: secondTurn[currentWord - words.length].word,
            translation: secondTurn[currentWord - words.length].translation,
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
                  answer={
                    typeof words[currentWord].word === "string"
                      ? words[currentWord].word
                      : words[currentWord].word[0]
                  }
                  translation={words[currentWord].translation}
                  correctAnswer={words[currentWord].translation}
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
                  answer={
                    typeof words[currentWord].word === "string"
                      ? words[currentWord].word
                      : words[currentWord].word[0]
                  }
                  translation={words[currentWord].translation}
                  correctAnswers={words[currentWord].translation}
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
                answer={secondTurn[currentWord - words.length].translation}
                translation={
                  typeof secondTurn[currentWord - words.length].word ===
                  "string"
                    ? secondTurn[currentWord - words.length].word
                    : secondTurn[currentWord - words.length].word[0]
                }
                correctAnswer={
                  secondTurn[currentWord - words.length].translation
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
                answer={secondTurn[currentWord - words.length].translation}
                translation={
                  typeof secondTurn[currentWord - words.length].word ===
                  "string"
                    ? secondTurn[currentWord - words.length].word
                    : secondTurn[currentWord - words.length].word[0]
                }
                correctAnswers={secondTurn[currentWord - words.length].word}
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
