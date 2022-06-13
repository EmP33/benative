import React from "react";
import { useNavigate } from "react-router-dom";
// Components
import { IconButton } from "@mui/material";
// Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const GoBackButton = () => {
  const navigate = useNavigate();
  return (
    <IconButton
      onClick={() => navigate("/dashboard")}
      aria-label="goBack"
      sx={{ color: "var(--color-tertiary)" }}
    >
      <ArrowBackIcon sx={{ fontSize: 30 }} />
    </IconButton>
  );
};

export default GoBackButton;
