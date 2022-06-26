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
  const user = useAppSelector((state) => state.user.user);
  const isSound = useAppSelector((state) => state.ui.isSound);
  const [answers, setAnswers] = useState<string[] | string>([]);
  const [currentTask, setCurrentTask] = useState<number>(
    !params.ex ? 0 : +params.ex
  );
  const [checkedAnswers, setCheckedAnswers] = useState<boolean[] | boolean>([]);
  const currentLessonPart = useAppSelector(
    (state) => state.user.currentLessonPart
  );
  const currentLesson = useAppSelector((state) => state.user.currentLesson);
  const [playingCorrect, toggleCorrect] = useAudio(
    "https://res.cloudinary.com/dtbemnmn4/video/upload/v1656251453/BeNative/correct-answer_ezfmgk.mp3"
  );
  const [playingIncorrect, toggleInCorrect] = useAudio(
    "https://res.cloudinary.com/dtbemnmn4/video/upload/v1656251453/BeNative/incorrect-answer_z8jqay.mp3"
  );

  useEffect(() => {
    dispatch(
      getLesson(user.uid, params.category, params.lessonID, params.partID)
    );
  }, [user.uid, dispatch, params.category, params.lessonID, params.partID]);

  if (!currentLessonPart || !params.ex) {
    return <div>Loading...</div>;
  }

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

    setCheckedAnswers(checkedAnswers);
    setAnswers(answers);
  };

  const nextQuestionHandler = () => {
    setCurrentTask((prev) => prev + 1);
    navigate(
      `/dashboard/lesson/${currentLesson?.category}/${currentLesson?.id}/${
        currentLessonPart?.id
      }/${currentTask + 1}`
    );
    setAnswers([]);
    setCheckedAnswers([]);
  };

  return (
    <Wrapper title={tasks[+params.ex]?.title || "Dobra Robota!"}>
      <>
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
          <FinishSection />
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
                translation={tasks[+params.ex].correctAnswer}
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
                translation={tasks[+params.ex].correctAnswer}
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

export default QuestionResult;
