import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// Redux Store
import { useAppSelector, useAppDispatch } from "../../../lib/hooks";
import { getLesson } from "../../../store/data-slice";
// Components
import { Box } from "@mui/material";
import Wrapper from "../Wrapper";
import FillConversation from "../Excercices/FillConversation";
import SuccessMessage from "../CallbackMessages/SuccessMessage";
import FailureMessage from "../CallbackMessages/FailureMessage";

const QuestionResult = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();
  const user = useAppSelector((state) => state.user.user);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentTask, setCurrentTask] = useState<number>(
    !params.ex ? 0 : +params.ex
  );
  const [checkedAnswers, setCheckedAnswers] = useState<boolean[]>([]);
  const currentLessonPart = useAppSelector(
    (state) => state.user.currentLessonPart
  );
  const currentLesson = useAppSelector((state) => state.user.currentLesson);

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

  const checkAnswers = (checkedAnswers: boolean[], answers: string[]) => {
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

  if (checkedAnswers.length === tasks[+params.ex]?.correctAnswer?.length) {
    setTimeout(() => {
      nextQuestionHandler();
    }, 1000 * 10);
  }

  return (
    <Wrapper title={tasks[+params.ex].title}>
      <>
        <FillConversation
          task={tasks[+params.ex]}
          checkAnswers={checkAnswers}
        />
        {checkedAnswers.length === tasks[+params.ex]?.correctAnswer?.length ? (
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
                translation={tasks[+params.ex].translation}
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
