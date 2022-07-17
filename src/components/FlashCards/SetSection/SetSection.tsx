import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// Redux Store
import { useAppSelector } from "../../../lib/hooks";
// Components
import { Box, Typography } from "@mui/material";
import SetWordsSwiper from "./SetWordsSwiper";
import SectionHeader from "../../UI/SectionHeader";

const SetSection = () => {
  const params = useParams();
  const data = useAppSelector((state) => state.data.data);
  const [currentSet, setCurrentSet] = useState<any>(null);

  useEffect(() => {
    if (data?.data?.categories) {
      setCurrentSet(
        // @ts-ignore
        Object.values(
          // @ts-ignore
          Object.values(data.data.categories).find(
            (cat: any) => cat.title === "Fiszki"
          ).sets
        ).find((set: any) => set.id === params.setID)
      );
    }
  }, [data]);

  return (
    <Box>
      <SectionHeader />
      <Box sx={{ pl: 1 }}>
        <SetWordsSwiper words={currentSet?.words} />
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h6">{currentSet?.title}</Typography>
        <Typography variant="body1" sx={{ color: "#aaa" }}>
          {currentSet?.words.length}{" "}
          {currentSet?.words.length === 1
            ? "pojęcie"
            : currentSet?.words.length > 1 && currentSet?.words.length < 5
            ? "pojęcia"
            : "pojęć"}
        </Typography>
      </Box>
    </Box>
  );
};

export default SetSection;
