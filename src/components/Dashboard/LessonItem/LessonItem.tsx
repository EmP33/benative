import React from "react";
// Redux Store
import { useAppDispatch } from "../../../lib/hooks";
import { uiActions } from "../../../store/ui-slice";
// Components
import { Box, Typography } from "@mui/material";
import LessonProgress from "./LessonProgress";
// Icons
import SchoolIcon from "@mui/icons-material/School";

interface Props {
  title: string;
  status: number;
}

const LessonItem: React.FC<Props> = ({ title, status }) => {
  const dispatch = useAppDispatch();
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
      onClick={() => dispatch(uiActions.toggleOpenLessonDrawer())}
    >
      <SchoolIcon sx={{ fontSize: 40 }} />
      <Box>
        <Typography variant="h6" sx={{ fontSize: 18 }}>
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
