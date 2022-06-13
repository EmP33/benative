import React from "react";
import { useLocation } from "react-router-dom";
// Components
import { Box, IconButton, Typography } from "@mui/material";
import GoBackButton from "../../UI/GoBackButton";
import CategoryItem from "./CategoryItem";
// Icons
import SettingsIcon from "@mui/icons-material/Settings";

const CategoriesSection = () => {
  const location = useLocation();
  return (
    <Box
      sx={{
        margin: "0 8px 0 8px",
        height: "100vh",
        display: "grid",
        gridTemplateRows: "max-content 1fr",
        rowGap: 3,
        userSelect: "none",
        overflow: "auto",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
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
          Wybierz kategorię
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          background: "var(--color-base-dark)",
          borderRadius: "30px 30px 0 0 ",
          p: { xs: "32px 4px 100px 4px", lg: "30px 16px 100px 16px" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          columnGap: 2,
          rowGap: 2,
        }}
      >
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
      </Box>
    </Box>
  );
};

export default CategoriesSection;
