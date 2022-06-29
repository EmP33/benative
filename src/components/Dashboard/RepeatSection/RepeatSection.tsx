import React from "react";
import { useNavigate } from "react-router-dom";
// Redux Store
import { useAppSelector } from "../../../lib/hooks";

// Components
import { Box, Button } from "@mui/material";
import WordsStatus from "./WordsStatus";
import WordElement from "./WordElement";
import SectionHeader from "../../UI/SectionHeader";
// Types
import { WordType } from "../../../data.types";

const RepeatSection = () => {
  const data = useAppSelector((state) => state.data.data);
  const navigate = useNavigate();

  const weakWords = data?.data?.words.filter(
    (word: WordType) => word.status === "weak"
  );
  const averageWords = data?.data?.words.filter(
    (word: WordType) => word.status === "average"
  );
  const wellWords = data?.data?.words.filter(
    (word: WordType) => word.status === "well"
  );

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
          <WordsStatus
            title="Słabo znane"
            words={weakWords}
            status={(weakWords?.length / data?.data?.words?.length) * 100}
          />
          <WordsStatus
            title="Średnio znane"
            words={averageWords}
            status={(averageWords?.length / data?.data?.words?.length) * 100}
          />
          <WordsStatus
            title="Dobrze znane"
            words={wellWords}
            status={(wellWords?.length / data?.data?.words?.length) * 100}
          />
        </Box>
        <Button
          fullWidth
          variant="outlined"
          color="error"
          sx={{ mt: 3 }}
          onClick={() => navigate("/dashboard/repeat-words")}
        >
          Powtórz słówka
        </Button>
        <Box
          sx={{
            display: "grid",
            mt: 3,
          }}
        >
          {data?.data?.words &&
            data.data.words.map(
              (
                word: {
                  status: string;
                  word: { word: string[]; translation: string };
                },
                key: number
              ) => (
                <WordElement
                  key={key}
                  status={word.status}
                  word={word.word.word[0]}
                  translation={word.word.translation}
                />
              )
            )}
        </Box>
      </Box>
    </Box>
  );
};

export default RepeatSection;
