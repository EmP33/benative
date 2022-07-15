import React from "react";
import { useAppSelector } from "../../../lib/hooks";

// Components
import { Box } from "@mui/material";
import CategoryItem from "./CategoryItem";
import SectionHeader from "../../UI/SectionHeader";

const CategoriesSection = () => {
  const data = useAppSelector((state) => state.data.data);

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
          alignContent: "flex-start",
          columnGap: 2,
          rowGap: 2,
        }}
      >
        {data?.data?.categories
          ? Object.values(data.data.categories).map((category: any) => (
              <CategoryItem key={category.id} category={category} />
            ))
          : ""}
      </Box>
    </Box>
  );
};

export default CategoriesSection;
