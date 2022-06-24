import React from "react";
// Components
import { Typography } from "@mui/material";
import LessonItem from "../LessonItem/LessonItem";
// Types
import { LessonType } from "../../../data.types";

interface Props {
  category: string;
  lessons: any;
}

const LessonLevel: React.FC<Props> = ({ category, lessons }) => {
  const lessonsStatus = lessons.map((lesson: LessonType) => lesson.status);

  return (
    <>
      <Typography variant="h6" sx={{ mt: 1 }}>
        Poziom początkujący: {category.toUpperCase()} -{" "}
        {lessonsStatus.reduce((a: number, b: number) => a + b, 0) /
          lessonsStatus.length}
        %
      </Typography>
      {lessons.map((lesson: LessonType) => (
        <LessonItem key={lesson.id} lesson={lesson} />
      ))}
    </>
  );
};

export default LessonLevel;
