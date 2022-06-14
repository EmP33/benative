import React from "react";

// Components
import { Box } from "@mui/material";
import CategoryItem from "./CategoryItem";
import SectionHeader from "../../UI/SectionHeader";

const CategoriesSection = () => {
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
      <SectionHeader title="Wybierz katerogię" />
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
