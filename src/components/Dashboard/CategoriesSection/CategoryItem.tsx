import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
// Components
import { Box, Typography } from "@mui/material";
import HeadphonesIcon from "@mui/icons-material/Headphones";
// Types
import { AppCategoryType } from "../../../data.types";
// Icons
import TranslateIcon from "@mui/icons-material/Translate";
import WorkIcon from "@mui/icons-material/Work";
import BoltIcon from "@mui/icons-material/Bolt";

interface Props {
  category: AppCategoryType;
}

const CategoryItem: React.FC<Props> = ({ category }) => {
  const navigate = useNavigate();
  const [onHover, setOnHover] = useState<boolean>(false);

  const navigateHandler = () => {
    if (category.title === "1000 słów") {
      navigate("/dashboard/categories/10-hundred-words");
    } else if (category.title === "Fiszki") {
      navigate("/dashboard/categories/flash-cards");
    }
  };

  return (
    <Box
      onClick={navigateHandler}
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
      sx={{
        background: onHover ? "var(--color-base)" : "var(--color-base-dark)",
        border: "4px solid var(--color-base)",
        width: 150,
        height: 150,
        display: "grid",
        alignContent: "center",
        justifyItems: "center",
        borderRadius: 5,
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          background: onHover ? "var(--color-base-dark)" : "var(--color-base)",
          width: 50,
          height: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 4,
        }}
      >
        {category.title === "1000 słów" ? (
          <TranslateIcon sx={{ fontSize: 30 }} />
        ) : category.title === "Praca" ? (
          <WorkIcon sx={{ fontSize: 30 }} />
        ) : category.title === "Fiszki" ? (
          <BoltIcon sx={{ fontSize: 30 }} />
        ) : (
          <HeadphonesIcon sx={{ fontSize: 30 }} />
        )}
      </Box>
      <Typography
        variant="body1"
        sx={{
          color: onHover ? "var(--color-white)" : "#aaa",
          fontWeight: "bold",
          mt: 1,
        }}
      >
        {category.title}
      </Typography>
      {/* <Typography variant="body2" sx={{ textAlign: "center" }}></Typography> */}
    </Box>
  );
};

export default CategoryItem;
