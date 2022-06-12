import React from "react";
// Components
import { Box, Typography } from "@mui/material";
import LessonProgress from "./LessonProgress";
// Icons
import SchoolIcon from "@mui/icons-material/School";

interface ILessonItem {
  title: string;
  status: number;
}

const LessonItem: React.FC<ILessonItem> = ({ title, status }) => {
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

        "&:hover": {
          filter: "brightness(110%)",
        },
      }}
    >
      <SchoolIcon sx={{ fontSize: 40 }} />
      <Box>
        <Typography
          variant="h6"
          sx={{ fontSize: 18, color: "var(--color-primary-light)" }}
        >
          {title}
        </Typography>
        <Typography variant="body1" sx={{ fontSize: 14 }}>
          Ukończyłeś {status}% tej lekcji
        </Typography>
      </Box>
      <LessonProgress status={status} />
    </Box>
  );
};

export default LessonItem;