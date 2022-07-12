import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAudio } from "../../../lib/hooks";
// Redux Store
import { useAppSelector, useAppDispatch } from "../../../lib/hooks";
import { getLesson } from "../../../store/data-slice";
// Components
import { Box } from "@mui/material";
import Wrapper from "../Wrapper";

import FillConversation from "../Excercices/FillConversation";
import TranslatePhrase from "../Excercices/TranslatePhrase";
import ChooseCorrectAnswer from "../Excercices/ChooseCorrectAnswer";
import ChooseCorrectAnswerAng from "../Excercices/ChooseCorrectAnswerAng";
import MatchToGap from "../Excercices/MatchToGap";
import MultipleCorrectAnswersTranslation from "../Excercices/MultipleCorrectAnswersTranslation";
import MultipleAnswerQuestion from "../Excercices/MultipleAnswerQuestion";
import MatchWordToImage from "../Excercices/MatchWordToImage";

import SuccessMessage from "../CallbackMessages/SuccessMessage";
import FailureMessage from "../CallbackMessages/FailureMessage";

import BasicLearnBoard from "../BoardSection/BasicLearnBoard";
import NewWordLearnBoard from "../BoardSection/NewWordLearnBoard";
import MultipleWordsLearnBoard from "../BoardSection/MultipleWordsLearnBoard";

import FinishSection from "../FinishSection/FinishSection";

const QuestionResult = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();
  // Redux Store
  const { isSound } = useAppSelector((state) => state.ui);
  const { currentLessonPart, currentLesson, user } = useAppSelector(
    (state) => state.user
  );
  // Local State
  const [answers, setAnswers] = useState<string[] | string>([]);
  const [currentTask, setCurrentTask] = useState<number>(
    !params.ex ? 0 : +params.ex
  );
  const [checkedAnswers, setCheckedAnswers] = useState<boolean[] | boolean>([]);
  const [resultAnswers, setResultAnswers] = useState<boolean[]>([]);

  // Audio
  const [playingCorrect, toggleCorrect] = useAudio(
    "https://res.cloudinary.com/dtbemnmn4/video/upload/v1656251453/BeNative/correct-answer_ezfmgk.mp3"
  );
  const [playingIncorrect, toggleInCorrect] = useAudio(
    "https://res.cloudinary.com/dtbemnmn4/video/upload/v1656251453/BeNative/incorrect-answer_z8jqay.mp3"
  );

  console.log(currentLessonPart);

  /* A hook that is called when the component is mounted. It is used to fetch data from the database. */
  useEffect(() => {
    dispatch(
      getLesson(user.uid, params.category, params.lessonID, params.partID)
    );
  }, [user.uid, dispatch, params.category, params.lessonID, params.partID]);

  /* Checking if the currentLessonPart is not null or undefined and if the params.ex is not null or
 undefined. If it is, it will return a div with the text "Loading...". */
  if (!currentLessonPart || !params.ex) {
    return <div>Loading...</div>;
  }

  /* Sorting the tasks by order. */
  const tasks = Object.values(currentLessonPart.tasks).sort(
    (a, b) => a.order - b.order
  );

  const checkAnswers = (
    checkedAnswers: boolean[] | boolean,
    answers: string[] | string
  ) => {
    /* Checking if the answer is correct or not. */
    if (typeof checkedAnswers === "boolean") {
      if (checkedAnswers && isSound) {
        // @ts-ignore
        toggleCorrect();
        setResultAnswers((prev) => [...prev, checkedAnswers]);
      } else if (!checkedAnswers && isSound) {
        // @ts-ignore
        toggleInCorrect();
        setResultAnswers((prev) => [...prev, checkedAnswers]);
      }
    } else {
      if (checkedAnswers.every((ans) => ans === true) && isSound) {
        // @ts-ignore
        toggleCorrect();
        setResultAnswers((prev) => [...prev, true]);
      } else if (checkedAnswers.some((ans) => ans === false) && isSound) {
        // @ts-ignore
        toggleInCorrect();
        setResultAnswers((prev) => [...prev, false]);
      }
    }

    setCheckedAnswers(checkedAnswers);
    setAnswers(answers);
  };

  const nextQuestionHandler = () => {
    setCurrentTask((prev) => prev + 1);
    navigate(
      `/dashboard/lesson/${currentLesson?.category}/${currentLesson?.id}/${
        currentLessonPart?.id
      }/${currentTask + 1}`,
      { replace: true }
    );
    setAnswers([]);
    setCheckedAnswers([]);
  };

  return (
    <Wrapper title={tasks[+params.ex]?.title || "Dobra Robota!"}>
      <Box>
        {tasks[+params.ex] ? (
          tasks[+params.ex].type === "fill-conversation" ? (
            <FillConversation
              task={tasks[+params.ex]}
              checkAnswers={checkAnswers}
            />
          ) : tasks[+params.ex].type === "translate-phrase" ? (
            <TranslatePhrase
              task={tasks[+params.ex]}
              checkAnswers={checkAnswers}
            />
          ) : tasks[+params.ex].type === "translate-phrase-ang" ? (
            <TranslatePhrase
              task={tasks[+params.ex]}
              checkAnswers={checkAnswers}
            />
          ) : tasks[+params.ex].type === "match-to-gap" ? (
            <MatchToGap task={tasks[+params.ex]} checkAnswers={checkAnswers} />
          ) : tasks[+params.ex].type === "choose-correct-answer" ? (
            <ChooseCorrectAnswer
              task={tasks[+params.ex]}
              checkAnswers={checkAnswers}
            />
          ) : tasks[+params.ex].type === "choose-correct-answer-ang" ? (
            <ChooseCorrectAnswerAng
              task={tasks[+params.ex]}
              checkAnswers={checkAnswers}
            />
          ) : tasks[+params.ex].type ===
            "multiple-correct-answers-translation" ? (
            <MultipleCorrectAnswersTranslation
              task={tasks[+params.ex]}
              checkAnswers={checkAnswers}
            />
          ) : tasks[+params.ex].type === "multiple-answer-question" ? (
            <MultipleAnswerQuestion
              task={tasks[+params.ex]}
              checkAnswers={checkAnswers}
            />
          ) : tasks[+params.ex].type === "match-word-to-image" ? (
            <MatchWordToImage
              task={tasks[+params.ex]}
              checkAnswers={checkAnswers}
            />
          ) : tasks[+params.ex].type === "basic" ? (
            <BasicLearnBoard
              task={tasks[+params.ex]}
              nextQuestion={nextQuestionHandler}
            />
          ) : tasks[+params.ex].type === "new-word-lb" ? (
            <NewWordLearnBoard
              task={tasks[+params.ex]}
              nextQuestion={nextQuestionHandler}
            />
          ) : tasks[+params.ex].type === "multiple-words-lb" ? (
            <MultipleWordsLearnBoard
              task={tasks[+params.ex]}
              nextQuestion={nextQuestionHandler}
            />
          ) : (
            ""
          )
        ) : (
          <FinishSection resultAnswers={resultAnswers} />
        )}
        {typeof checkedAnswers === "boolean" ? (
          !checkedAnswers ? (
            <Box
              onClick={nextQuestionHandler}
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
                answer={tasks[+params.ex].question}
                translation={tasks[+params.ex].translation}
                correctAnswers={tasks[+params.ex]?.correctAnswer}
                answers={answers}
                nextQuestion={nextQuestionHandler}
              />
            </Box>
          ) : (
            <Box
              onClick={nextQuestionHandler}
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
                answer={tasks[+params.ex].question}
                translation={tasks[+params.ex].translation}
                correctAnswer={tasks[+params.ex].correctAnswer}
                nextQuestion={nextQuestionHandler}
              />
            </Box>
          )
        ) : checkedAnswers.length ===
          tasks[+params.ex]?.correctAnswer?.length ? (
          checkedAnswers.includes(false) ? (
            <Box
              onClick={nextQuestionHandler}
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
                answer={tasks[+params.ex].question}
                translation={tasks[+params.ex].translation}
                correctAnswers={tasks[+params.ex]?.correctAnswer}
                answers={answers}
                nextQuestion={nextQuestionHandler}
              />
            </Box>
          ) : (
            <Box
              onClick={nextQuestionHandler}
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
                answer={tasks[+params.ex].question}
                translation={tasks[+params.ex].translation}
                correctAnswer={tasks[+params.ex].correctAnswer}
                nextQuestion={nextQuestionHandler}
              />
            </Box>
          )
        ) : (
          ""
        )}
      </Box>
    </Wrapper>
  );
};

export default QuestionResult;
