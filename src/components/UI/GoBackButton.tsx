import React from "react";
// Components
import { IconButton } from "@mui/material";
// Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const GoBackButton = () => {
  return (
    <IconButton aria-label="goBack" sx={{ color: "var(--color-tertiary)" }}>
      <ArrowBackIcon sx={{ fontSize: 30 }} />
    </IconButton>
  );
};

export default GoBackButton;
