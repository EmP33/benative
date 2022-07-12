import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Redux Store
import { useAppSelector, useAppDispatch } from "../../../lib/hooks";
import { dataActions } from "../../../store/data-slice";

// Components
import { Box, Button, Skeleton, Typography } from "@mui/material";
import WordsStatus from "./WordsStatus";
import WordElement from "./WordElement";
import SectionHeader from "../../UI/SectionHeader";
// Types
import { WordType } from "../../../data.types";

const RepeatSection = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // Redux Store
  const { data } = useAppSelector((state) => state.data);
  // Local State
  const [repeatType, setRepeatType] = useState("");

  /* Filtering words by status. */
  const weakWords = data?.data?.words
    .filter((word: WordType) => word.status === "weak")
    .filter((word: WordType) => word.known === true);
  const averageWords = data?.data?.words
    .filter((word: WordType) => word.status === "average")
    .filter((word: WordType) => word.known === true);
  const wellWords = data?.data?.words
    .filter((word: WordType) => word.status === "well")
    .filter((word: WordType) => word.known === true);

  const changeRepeatTypeHandler = (type: string) => {
    setRepeatType(type);
    dispatch(
      dataActions.setWords(
        type === "Słabo znane"
          ? weakWords
          : type === "Średnio znane"
          ? averageWords
          : type === "Dobrze znane"
          ? wellWords
          : []
      )
    );
  };

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
            repeatType={repeatType}
            changeRepeatType={changeRepeatTypeHandler}
            title="Słabo znane"
            words={weakWords}
            /* It's calculating the percentage of words with a given status. */
            status={
              (weakWords?.length /
                data?.data?.words.filter(
                  (word: WordType) => word.known === true
                ).length) *
              100
            }
          />
          <WordsStatus
            repeatType={repeatType}
            changeRepeatType={changeRepeatTypeHandler}
            title="Średnio znane"
            words={averageWords}
            /* It's calculating the percentage of words with a given status. */
            status={
              (averageWords?.length /
                data?.data?.words.filter(
                  (word: WordType) => word.known === true
                ).length) *
              100
            }
          />
          <WordsStatus
            repeatType={repeatType}
            changeRepeatType={changeRepeatTypeHandler}
            title="Dobrze znane"
            words={wellWords}
            /* It's calculating the percentage of words with a given status. */
            status={
              (wellWords?.length /
                data?.data?.words.filter(
                  (word: WordType) => word.known === true
                ).length) *
              100
            }
          />
        </Box>
        {data?.data?.words.filter((word: WordType) => word.known === true)
          .length ? (
          <Button
            fullWidth
            variant="outlined"
            color="error"
            sx={{ mt: 3 }}
            onClick={() => navigate("/dashboard/repeat-words")}
          >
            {/* It's a button that is changing its text depending on the repeatType state. */}
            Powtórz {repeatType ? repeatType : "Wszystkie"} słówka
          </Button>
        ) : (
          <Typography variant="h6" sx={{ textAlign: "center", mt: 5 }}>
            Nie masz żadnych słówek
          </Typography>
        )}

        <Box
          sx={{
            display: "grid",
            mt: 3,
          }}
        >
          {data?.data?.words
            ? repeatType
              ? repeatType === "Słabo znane"
                ? weakWords.map(
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
                  )
                : repeatType === "Średnio znane"
                ? averageWords.map(
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
                  )
                : repeatType === "Dobrze znane"
                ? wellWords.map(
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
                  )
                : data?.data?.words
                    .filter((word: WordType) => word.known === true)
                    .map(
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
                    )
              : data?.data?.words
                  .filter((word: WordType) => word.known === true)
                  .map(
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
                  )
            : /* It's creating a skeleton loader. */
              [0, 1, 2, 3, 4, 5, 6, 7, 8].map((numb) => (
                <Box
                  key={numb}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr max-content",
                    mb: 2,
                  }}
                >
                  <Box>
                    <Skeleton
                      variant="text"
                      width="35%"
                      sx={{ background: "var(--color-grey-2)" }}
                    />
                    <Skeleton
                      variant="text"
                      width="50%"
                      sx={{ background: "var(--color-grey-2)" }}
                    />
                  </Box>
                  <Skeleton
                    variant="circular"
                    width={25}
                    height={25}
                    sx={{ background: "var(--color-grey-2)" }}
                  />
                </Box>
              ))}
        </Box>
      </Box>
    </Box>
  );
};

export default RepeatSection;
