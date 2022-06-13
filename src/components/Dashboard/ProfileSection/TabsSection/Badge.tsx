import React from "react";
// Components
import { Box, Typography } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const Badge = () => {
  return (
    <Box
      sx={{
        display: "grid",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: 75,
          height: 75,
          background: "var(--color-base-light)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 4,
          mb: 1,
        }}
      >
        <EmojiEventsIcon sx={{ fontSize: 36 }} />
      </Box>
      <Typography variant="body2">Champion</Typography>
    </Box>
  );
};

export default Badge;
