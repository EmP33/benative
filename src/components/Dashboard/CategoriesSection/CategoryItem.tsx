import React from "react";
// Components
import { Box, Typography } from "@mui/material";
import HeadphonesIcon from "@mui/icons-material/Headphones";

const CategoryItem = () => {
  return (
    <Box
      sx={{
        background: "var(--color-base)",
        width: 150,
        height: 150,
        display: "grid",
        alignContent: "center",
        justifyItems: "center",
        borderRadius: 5,
      }}
    >
      <Box
        sx={{
          background: "var(--color-base-dark)",
          width: 50,
          height: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 4,
        }}
      >
        <HeadphonesIcon sx={{ fontSize: 26 }} />
      </Box>
      <Typography
        variant="body1"
        sx={{ color: "var(--color-tertiary)", fontWeight: "bold" }}
      >
        Słuchanie
      </Typography>
      <Typography variant="body2">21 Lekcji</Typography>
    </Box>
  );
};

export default CategoryItem;
