import React from "react";
// Redux Store
import { useAppDispatch } from "../../../lib/hooks";
import { uiActions } from "../../../store/ui-slice";
import { userActions } from "../../../store/user-slice";
// Components
import { Box, Typography } from "@mui/material";
import LessonProgress from "./LessonProgress";
// Icons
import SchoolIcon from "@mui/icons-material/School";
// Types
import { LessonType } from "../../../data.types";

interface Props {
  lesson: LessonType;
}

const LessonItem: React.FC<Props> = ({ lesson }) => {
  const dispatch = useAppDispatch();

  const openLessonDrawerHandler = () => {
    dispatch(userActions.setCurrentLesson(lesson));
    dispatch(uiActions.toggleOpenLessonDrawer());
  };

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
      onClick={openLessonDrawerHandler}
    >
      <SchoolIcon sx={{ fontSize: 40 }} />
      <Box>
        <Typography variant="h6" sx={{ fontSize: 18 }}>
          {lesson.title}
        </Typography>
        <Typography variant="body1" sx={{ fontSize: 14 }}>
          Ukończyłeś {lesson.status}% tej lekcji
        </Typography>
      </Box>
      <LessonProgress status={lesson.status} />
    </Box>
  );
};

export default LessonItem;
