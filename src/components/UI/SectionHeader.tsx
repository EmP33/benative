import React from "react";
// Components
import { Box, Typography } from "@mui/material";
import GoBackButton from "./GoBackButton";

interface Props {
  title?: string;
}

const SectionHeader: React.FC<Props> = ({ title = "" }) => {
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
    </Box>
  );
};

export default SectionHeader;
