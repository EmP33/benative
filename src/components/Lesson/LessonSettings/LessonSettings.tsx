import React from "react";
import { useAppSelector, useAppDispatch } from "../../../lib/hooks";
import { uiActions } from "../../../store/ui-slice";
// Components
import { Box, Typography, Switch } from "@mui/material";

const label = { inputProps: { "aria-label": "Switch demo" } };

const LessonSettings = () => {
  const dispatch = useAppDispatch();
  const isSound = useAppSelector((state) => state.ui.isSound);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(uiActions.toggleSound());
  };

  return (
    <Box
      sx={{
        backgroundColor: "var(--color-base-dark)",
        p: 3,
        borderRadius: 10,
        height: "100%",
        overflow: "hidden",
        transition: "all .5s ease",
      }}
    >
      <Typography
        variant="body1"
        sx={{
          color: "var(--color-primary-light)",
          textAlign: "center",
          mb: 2,
          fontWeight: "bold",
        }}
      >
        Ustawienia lekcji
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body1">Dźwięk:</Typography>
        <Switch {...label} checked={isSound} onChange={handleChange} />
      </Box>
    </Box>
  );
};

export default React.memo(LessonSettings);
