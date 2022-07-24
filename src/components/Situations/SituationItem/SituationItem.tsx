import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Redux Store
import { useAppDispatch, useAppSelector } from "../../../lib/hooks";
import { uiActions } from "../../../store/ui-slice";
import { userActions } from "../../../store/user-slice";
import { updateLesson } from "../../../store/data-slice";
// Components
import { Box, Typography } from "@mui/material";
import LessonProgress from "./SituationProgress";
// Icons
import SchoolIcon from "@mui/icons-material/School";
// Types
import { LessonType } from "../../../data.types";

interface Props {
  lesson: LessonType;
}

const SituationItem: React.FC<Props> = ({ lesson }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   // if (lesson.parts) {
  //   //   const parts = Object.values(lesson.parts).map((part) =>
  //   //     part.status === 100 ? true : false
  //   //   );
  //   //   const completedParts = parts.filter(
  //   //     (value: boolean) => value === true
  //   //   ).length;

  //   //   dispatch(
  //   //     updateLesson(user.uid, lesson.category, lesson.id, {
  //   //       category: lesson.category,
  //   //       date: lesson.date,
  //   //       description: lesson.description,
  //   //       id: lesson.id,
  //   //       parts: lesson.parts,
  //   //       status: (completedParts / parts.length) * 100,
  //   //       title: lesson.title,
  //   //       order: lesson.order,
  //   //     })
  //   //   );
  //   // }
  // }, [lesson.parts]);

  return (
    <Box
      sx={{
        background: "var(--color-base-light)",
        display: "grid",
        gridTemplateColumns: "max-content 1fr max-content",
        columnGap: 2,
        alignItems: "center",
        p: 2,
        borderRadius: 5,
        mt: 2,
        cursor: "pointer",
        userSelect: "none",
        mb: 1,

        "&:hover": {
          filter: "brightness(110%)",
        },
      }}
      onClick={() => navigate(`/dashboard/categories/situations/${lesson.id}`)}
    >
      <SchoolIcon sx={{ fontSize: 40 }} />
      <Box>
        <Typography variant="h6" sx={{ fontSize: 18 }}>
          {lesson.title}
        </Typography>
        <Typography variant="body1" sx={{ fontSize: 14 }}>
          Ukończyłeś {lesson.status.toFixed(2)}% tej lekcji
        </Typography>
      </Box>
      <LessonProgress status={lesson.status} />
    </Box>
  );
};

export default React.memo(SituationItem);
