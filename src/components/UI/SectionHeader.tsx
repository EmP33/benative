import React from "react";
import { useLocation } from "react-router-dom";
// Components
import { Box, Typography, IconButton } from "@mui/material";
import GoBackButton from "./GoBackButton";
// Icons
import CheckIcon from "@mui/icons-material/Check";

interface Props {
  title?: string;
  onSubmit?: () => void;
}

const SectionHeader: React.FC<Props> = ({ title = "", onSubmit }) => {
  const location = useLocation();

  return (
    <Box
      sx={{
        p: 1,
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        position: "relative",
      }}
    >
      <GoBackButton />
      <Typography
        sx={{
          position: "absolute",
          left: "50%",
          transform: "translate(-50%)",
        }}
        variant="h6"
      >
        {title}
      </Typography>
      {location.pathname.includes("flash-cards/create") && (
        <IconButton
          sx={{
            position: "absolute",
            right: "0%",
          }}
          aria-label="add"
          size="large"
          color="success"
          onClick={onSubmit}
        >
          <CheckIcon fontSize="inherit" />
        </IconButton>
      )}
    </Box>
  );
};

export default SectionHeader;
