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
  return (
    <>
      <Typography variant="h6" sx={{ mt: 1 }}>
        Poziom początkujący: {category.toUpperCase()} - 50%
      </Typography>
      {lessons.map((lesson: LessonType) => (
        <LessonItem key={lesson.id} lesson={lesson} />
      ))}

      {/* <LessonItem title="Marokańskie pociągi" status={100} />
      <LessonItem title="K-Pop" status={100} />
      <LessonItem title="Nowy film Barrego" status={100} />
      <LessonItem title="Niebezpieczny owoc" status={75} />
      <LessonItem title="Kondolencje" status={15} />
      <LessonItem title="Gekony" status={0} />
      <LessonItem title="Kondolencje cz.2" status={0} /> */}
    </>
  );
};

export default LessonLevel;
