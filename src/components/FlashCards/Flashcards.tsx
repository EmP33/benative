import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
// Components
import { Box, Button } from "@mui/material";
import SectionHeader from "../UI/SectionHeader";
import FlahcardsSwiper from "./FlahcardsSwiper";

const Flashcards = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        margin: "0 8px 0 8px",
        // height: "100vh",
        // display: "grid",
        // gridTemplateRows: "max-content 1fr",
        // rowGap: 3,
        userSelect: "none",
        overflow: "auto",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      <SectionHeader title="Fiszki" />
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          background: "var(--color-base-dark)",
          borderRadius: "30px 30px 0 0 ",
          p: { xs: "32px 4px 100px 4px", lg: "30px 16px 100px 16px" },
          columnGap: 2,
          rowGap: 2,
        }}
      >
        <Button
          variant="outlined"
          fullWidth
          color="success"
          onClick={() => navigate("/dashboard/categories/flash-cards/create")}
        >
          Stwórz zestaw fiszek
        </Button>
        <Box sx={{ mt: 5 }}>
          <FlahcardsSwiper />
        </Box>
      </Box>
    </Box>
  );
};

export default Flashcards;
