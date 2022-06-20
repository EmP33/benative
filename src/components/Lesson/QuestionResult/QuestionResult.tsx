import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
// Redux Store
import { useAppSelector, useAppDispatch } from "../../../lib/hooks";
import { getLesson } from "../../../store/data-slice";
// Components
import Wrapper from "../Wrapper";
import FillConversation from "../Excercices/FillConversation";

const QuestionResult = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const user = useAppSelector((state) => state.user.user);
  const currentLessonPart = useAppSelector(
    (state) => state.user.currentLessonPart
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

  console.log(currentLessonPart);

  return (
    <Wrapper title={tasks[+params.ex].title}>
      <FillConversation task={tasks[+params.ex]} />
    </Wrapper>
  );
};

export default QuestionResult;
