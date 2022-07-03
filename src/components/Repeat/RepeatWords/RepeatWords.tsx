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
import FinishSection from "../FinishSection/FinishSection";
// Types
import { WordType } from "../../../data.types";

const RepeatWords = () => {
  // Redux Store
  const words = useAppSelector((state) => state.data?.data?.data?.words);
  const typeWords = useAppSelector((state) => state.data?.words);
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
    // 10 - count of words in repetition
    /* Checking if the words are available and if the typeWords are available. */
    if (words) {
      if (typeWords.length) {
        setUsedWords(
          typeWords
            .map((value: WordType) => ({ value, sort: Math.random() }))
            .sort((a: any, b: any) => a.sort - b.sort)
            // @ts-ignore
            .map(({ value }) => value)
            .slice(0, 10)
        );
      } else {
        setUsedWords(
          words
            .map((value: WordType) => ({ value, sort: Math.random() }))
            .sort((a: any, b: any) => a.sort - b.sort)
            // @ts-ignore
            .map(({ value }) => value)
            .slice(0, 10)
        );
      }
    }
  }, [words, typeWords]);

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

    /* Checking if the current word is less than the used words length. If it is, it is checking if the
    second turn length is greater than 0. If it is, it is setting the second turn to the previous
    value and adding the status, id, word, and wasCorrect to the second turn. If it is not, it is
    setting the second turn to the previous value and adding the status, id, word, and wasCorrect to
    the second turn. */
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
    } /* Checking if the word was correct in the first turn and if it was, it is setting the
    wasCorrect property to true. If it wasn't, it is setting it to false. */ else {
      if (
        secondTurn.find(
          (word) => word.id === secondTurn[currentWord - usedWords.length].id
        ).wasCorrect
      ) {
        secondTurn.splice(
          secondTurn.findIndex(
            (prev) => prev.id === secondTurn[currentWord - usedWords.length].id
          ),
          1,
          {
            status: secondTurn[currentWord - usedWords.length].status,
            id: secondTurn[currentWord - usedWords.length].id,
            word: secondTurn[currentWord - usedWords.length].word,
            wasCorrect: checkedAnswers,
          }
        );
      } else {
        secondTurn.splice(
          secondTurn.findIndex(
            (prev) => prev.id === secondTurn[currentWord - usedWords.length].id
          ),
          1,
          {
            status: secondTurn[currentWord - usedWords.length].status,
            id: secondTurn[currentWord - usedWords.length].id,
            word: secondTurn[currentWord - usedWords.length].word,
            wasCorrect: false,
          }
        );
      }

      setSecondTurn((prev) => [...prev]);
    }

    setCheckedAnswers(checkedAnswers);
    setAnswers(answers);
  };

  /**
   * When the user clicks the next word button, the current word index is incremented by one, the
   * answers array is emptied, and the checked answers array is emptied.
   */
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
        {/* Checking if the current word is equal to the used words length plus the second turn length
        and if the second turn length is greater than 0. If it is, it is rendering the FinishSection
        component. */}
        {currentWord === usedWords.length + secondTurn.length &&
          !!secondTurn.length && <FinishSection words={secondTurn} />}
        {/* Checking if the used words length is greater than 0 and if the current word is less than the
        used words length. If it is, it is rendering the TranslatePhrase component. */}
        {!!usedWords.length && currentWord < usedWords.length && (
          <TranslatePhrase
            word={usedWords[currentWord]}
            checkAnswers={checkAnswers}
          />
        )}
        {/* Checking if the length of the usedWords array is equal to the length of the secondTurn
        array. If it is, it will render the TranslatePhraseAng component. */}
        {usedWords.length === secondTurn.length && (
          <TranslatePhraseAng
            word={secondTurn[currentWord - usedWords.length]}
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
                  secondTurn[currentWord - usedWords.length].word?.word &&
                  secondTurn[currentWord - usedWords.length].word?.word[0]
                }
                translation={
                  secondTurn[currentWord - usedWords.length].word.translation
                }
                correctAnswers={
                  secondTurn[currentWord - usedWords.length].word.translation
                }
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
                  secondTurn[currentWord - usedWords.length].word?.word &&
                  secondTurn[currentWord - usedWords.length].word?.word[0]
                }
                translation={
                  secondTurn[currentWord - usedWords.length].word.translation
                }
                correctAnswer={
                  secondTurn[currentWord - usedWords.length].word.word
                }
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
