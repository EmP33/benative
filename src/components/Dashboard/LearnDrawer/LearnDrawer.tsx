import * as React from "react";
// Redux Store
import { useAppSelector, useAppDispatch } from "../../../lib/hooks";
import { uiActions } from "../../../store/ui-slice";
// Components
import { Box, Typography, Button } from "@mui/material";
import { DragButtonHorizontal } from "./LearnDrawer.styles";
// Icons
import SchoolIcon from "@mui/icons-material/School";
import BookIcon from "@mui/icons-material/Book";
// Assets
import bg from "../../../assets/1C1C27.png";

const LearnDrawer = () => {
  const dispatch = useAppDispatch();
  const openLessonDrawer = useAppSelector((state) => state.ui.openLessonDrawer);
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
          <Typography variant="h6">Dzieła sztuki afrykańskiej</Typography>
          <Typography variant="body2" sx={{ color: "#636384" }}>
            Ukończyłeś 100% tej lekcji
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", columnGap: 2, mb: 4 }}
      >
        <Box
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          sx={{
            width: 100,
            height: 115,
            borderRadius: 5,
            background: "var(--color-base-light)",
            display: "grid",
            placeItems: "center",
            alignContent: "center",
          }}
        >
          <BookIcon
            sx={{ fontSize: 40, mb: 1, color: "var(--color-primary-dark)" }}
          />
          <Typography>Read</Typography>
        </Box>
        <Box
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          sx={{
            width: 100,
            height: 115,
            borderRadius: 5,
            background: "var(--color-base-light)",
            display: "grid",
            placeItems: "center",
            alignContent: "center",
          }}
        >
          <BookIcon
            sx={{ fontSize: 40, mb: 1, color: "var(--color-primary-dark)" }}
          />
          <Typography>Translate</Typography>
        </Box>
        <Box
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          sx={{
            width: 100,
            height: 115,
            borderRadius: 5,
            background: "var(--color-base-light)",
            display: "grid",
            placeItems: "center",
            alignContent: "center",
          }}
        >
          <BookIcon
            sx={{ fontSize: 40, mb: 1, color: "var(--color-primary-dark)" }}
          />
          <Typography>Match</Typography>
        </Box>
      </Box>
      <Button
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          console.log("Button");
        }}
        variant="contained"
        sx={{ width: "100%", mb: 2 }}
        size="large"
      >
        Start
      </Button>
    </Box>
  );
};

export default LearnDrawer;
