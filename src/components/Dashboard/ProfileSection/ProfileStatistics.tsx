import React from "react";
// Components
import { Box, Typography } from "@mui/material";
// Icons
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PublicIcon from "@mui/icons-material/Public";
import PsychologyIcon from "@mui/icons-material/Psychology";

const ProfileStatistics = () => {
  return (
    <Box
      sx={{
        background: "var(--color-primary)",
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        p: 1,
        borderRadius: 5,
        mt: 3,
      }}
    >
      <Box
        sx={{
          borderRight: "1px solid rgba(255,255,255,.2)",
        }}
      >
        <StarBorderIcon />
        <Typography variant="body1" sx={{ fontSize: 14 }}>
          Punkty
        </Typography>
        <Typography variant="body2">590</Typography>
      </Box>
      <Box sx={{ borderRight: "1px solid rgba(255,255,255,.2)" }}>
        <PublicIcon />
        <Typography variant="body1" sx={{ fontSize: 14 }}>
          Ranking
        </Typography>
        <Typography variant="body2">#1,438</Typography>
      </Box>
      <Box>
        <PsychologyIcon />
        <Typography variant="body1" sx={{ fontSize: 14 }}>
          Słowa
        </Typography>
        <Typography variant="body2">670</Typography>
      </Box>
    </Box>
  );
};

export default ProfileStatistics;
