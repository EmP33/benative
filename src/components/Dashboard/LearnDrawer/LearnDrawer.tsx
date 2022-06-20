import React, { useState } from "react";
// Redux Store
import { useAppSelector, useAppDispatch } from "../../../lib/hooks";
import { uiActions } from "../../../store/ui-slice";
import { userActions } from "../../../store/user-slice";
// React Router
import { useNavigate } from "react-router-dom";
// Components
import { Box, Typography, Button } from "@mui/material";
import { DragButtonHorizontal } from "./LearnDrawer.styles";
// Icons
import SchoolIcon from "@mui/icons-material/School";
import BookIcon from "@mui/icons-material/Book";
// Assets
import bg from "../../../assets/1C1C27.png";
// Types
import { PartType } from "../../../data.types";

// type LessonType = "learn" | "repeat" | "test" | null;

const LearnDrawer = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentLesson = useAppSelector((state) => state.user.currentLesson);
  const currentLessonPart = useAppSelector(
    (state) => state.user.currentLessonPart
  );
  // const [choosenLessonPart, setChoosenLessonPart] = useState<PartType | null>(
  //   null
  // );
  console.log(currentLesson);

  return (
    <Box
      sx={{
        background: `url(${bg})`,
        backgroundColor: "var(--color-base-dark)",
        p: 2,
        borderRadius: 10,
        height: "50vh",
        overflow: "hidden",
        transition: "all .5s ease",
      }}
      onClick={(e: React.MouseEvent) => {
        dispatch(userActions.setCurrentLessonPart(null));
        dispatch(uiActions.toggleOpenLessonDrawer());
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          mb: 2,
        }}
      >
        <DragButtonHorizontal />
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "max-content 1fr",
          columnGap: 2,
          mb: 4,
        }}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <SchoolIcon sx={{ fontSize: 50 }} />
        <Box>
          <Typography variant="h6">{currentLesson?.title}</Typography>
          <Typography variant="body2" sx={{ color: "#636384" }}>
            Ukończyłeś {currentLesson?.status}% tej lekcji
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", columnGap: 2, mb: 4 }}
      >
        {currentLesson &&
          currentLesson.parts &&
          Object.values(currentLesson.parts).map((part: PartType) => (
            <Box
              key={part.id}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                dispatch(userActions.setCurrentLessonPart(part));
              }}
              sx={{
                width: 100,
                height: 115,
                borderRadius: 5,
                border: "2px solid var(--color-base-light)",
                display: "grid",
                placeItems: "center",
                alignContent: "center",
                cursor: "pointer",
                textAlign: "center",
                background:
                  currentLessonPart?.id === part.id
                    ? "var(--color-base-light)"
                    : "transparent",
              }}
            >
              <BookIcon
                sx={{ fontSize: 40, mb: 1, color: "var(--color-primary-dark)" }}
              />
              <Typography>{part.title}</Typography>
            </Box>
          ))}
      </Box>
      <Button
        disabled={!currentLessonPart}
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          navigate(
            `/dashboard/lesson/${currentLesson?.category}/${currentLesson?.id}/${currentLessonPart?.id}/0`
          );
          dispatch(uiActions.toggleOpenLessonDrawer());
        }}
        variant="contained"
        sx={{ width: "100%", mb: 2, "&:disabled": { color: "#aaa" } }}
        size="large"
      >
        Start
      </Button>
    </Box>
  );
};

export default LearnDrawer;
