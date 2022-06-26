import React from "react";
// Redux Store
import { useAppSelector } from "../../../lib/hooks";
import { dataActions } from "../../../store/data-slice";
// Components
import { Box, Typography } from "@mui/material";
import WordsStatus from "./WordsStatus";
import WordElement from "./WordElement";
import SectionHeader from "../../UI/SectionHeader";

const RepeatSection = () => {
  const data = useAppSelector((state) => state.data.data);

  console.log(data.data.words);

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
      <SectionHeader title="Powtórz Słownictwo" />
      <Box
        sx={{
          width: "100%",
          background: "var(--color-base-dark)",
          borderRadius: "30px 30px 0 0 ",
          p: { xs: "32px 4px 100px 4px", lg: "30px 16px 100px 16px" },
          columnGap: 2,
          rowGap: 2,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            columnGap: 2,
          }}
        >
          <WordsStatus title="Słabo znane" />
          <WordsStatus title="Średnio znane" />
          <WordsStatus title="Dobrze znane" />
        </Box>
        <Box
          sx={{
            display: "grid",
            mt: 3,
          }}
        >
          {data?.data?.words &&
            data.data.words.map(
              (word: { status: string; word: string[] }, key: number) => (
                <WordElement
                  key={key}
                  status={word.status}
                  word={word.word[0]}
                  translation={word.word[1]}
                />
              )
            )}
        </Box>
      </Box>
    </Box>
  );
};

export default RepeatSection;
