import React from "react";
import { useNavigate } from "react-router-dom";
// Components
import { IconButton } from "@mui/material";
// Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// Redux Store
import { useAppDispatch } from "../../lib/hooks";
import { userActions } from "../../store/user-slice";
import { uiActions } from "../../store/ui-slice";

const GoBackButton = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const navigateHandler = () => {
    dispatch(userActions.resetDataStatus());
    dispatch(uiActions.removeError());
    navigate(-1);
  };
  return (
    <IconButton
      onClick={navigateHandler}
      aria-label="goBack"
      sx={{ color: "var(--color-tertiary)" }}
    >
      <ArrowBackIcon sx={{ fontSize: 30 }} />
    </IconButton>
  );
};

export default GoBackButton;
