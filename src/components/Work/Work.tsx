import React, { useState, useEffect } from "react";
// Redux Store
import { useAppSelector } from "../../lib/hooks";
// Components
import { Box } from "@mui/material";
import SectionHeader from "../UI/SectionHeader";
import SituationItem from "./WorkItem/WorkItem";

const Work = () => {
  const data = useAppSelector((state) => state.data.data);
  const [category, setCategory] = useState();

  useEffect(() => {
    if (data?.data?.categories) {
      setCategory(
        // @ts-ignore
        Object.values(data?.data?.categories).find(
          (cat: any) => cat.title === "Praca"
        )
      );
    }
  }, [data?.data?.categories]);

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
        <SectionHeader title="Praca" />
      </Box>
      <Box
        sx={{
          width: "100%",
          maxHeight: "82vh",
          p: 2,
          overflow: "auto",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {
          //@ts-ignore
          category?.lessons.map((lesson: any) => (
            <SituationItem lesson={lesson} key={lesson.id} />
          ))
        }
      </Box>
    </Box>
  );
};

export default Work;
