import React from "react";
// Redux Store
import { useAppSelector } from "../../lib/hooks";
// Components
import { Box } from "@mui/material";
import SectionHeader from "../UI/SectionHeader";
import SituationItem from "./SituationItem/SituationItem";

const Situations = () => {
  const data = useAppSelector((state) => state.data.data);

  const category = Object.values(data.data.categories).find(
    (cat: any) => cat.title === "Sytuacje"
  );
  console.log(category);
  return (
    <Box
      sx={{
        margin: "0 8px 0 8px",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        userSelect: "none",
        overflow: "auto",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      <Box sx={{ mb: 4 }}>
        <SectionHeader title="Sytuacje" />
      </Box>

      {
        //@ts-ignore
        category.lessons.map((lesson: any) => (
          <SituationItem lesson={lesson} key={lesson.id} />
        ))
      }
    </Box>
  );
};

export default Situations;
