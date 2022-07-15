import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Redux Store
import { useAppSelector, useAppDispatch } from "../../lib/hooks";
import { dataActions } from "../../store/data-slice";

// Components
import { Box, Button, Skeleton, Typography } from "@mui/material";
import WordsStatus from "./WordsStatus";
import WordElement from "./WordElement";
import SectionHeader from "../UI/SectionHeader";
// Types
import { WordType } from "../../data.types";

const Words1000 = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // Redux Store
  const { data } = useAppSelector((state) => state.data);
  // Local State
  const [repeatType, setRepeatType] = useState("");

  /* Filtering words by status. */
  const weakWords = Object.values(
    // @ts-ignore
    Object.values(data.data.categories).find(
      // @ts-ignore
      (category) => category.title === "1000 słów"
    ).words
  ).filter((word: any) => word.status === "weak");

  const averageWords = Object.values(
    // @ts-ignore
    Object.values(data.data.categories).find(
      // @ts-ignore
      (category) => category.title === "1000 słów"
    ).words
  ).filter((word: any) => word.status === "average");

  const wellWords = Object.values(
    // @ts-ignore
    Object.values(data.data.categories).find(
      // @ts-ignore
      (category) => category.title === "1000 słów"
    ).words
  ).filter((word: any) => word.status === "well");
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
      <SectionHeader title="1000 słów" />
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
                Object.values(
                  // @ts-ignore
                  Object.values(data.data.categories).find(
                    // @ts-ignore
                    (category) => category.title === "1000 słów"
                  ).words
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
                Object.values(
                  // @ts-ignore
                  Object.values(data.data.categories).find(
                    // @ts-ignore
                    (category) => category.title === "1000 słów"
                  ).words
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
                Object.values(
                  // @ts-ignore
                  Object.values(data.data.categories).find(
                    // @ts-ignore
                    (category) => category.title === "1000 słów"
                  ).words
                ).length) *
              100
            }
          />
        </Box>
        <Button
          fullWidth
          variant="outlined"
          color="error"
          sx={{ mt: 3 }}
          onClick={() =>
            navigate("/dashboard/categories/10-hundred-words/repeat-words")
          }
        >
          {/* It's a button that is changing its text depending on the repeatType state. */}
          Powtórz {repeatType ? repeatType : "Wszystkie"} słówka
        </Button>

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
                    // @ts-ignore
                    (word: {
                      word: string;
                      translation: string;
                      status: string;
                      id: string;
                    }) => (
                      <WordElement
                        key={word.id}
                        status={word.status}
                        word={word.word}
                        translation={word.translation}
                      />
                    )
                  )
                : repeatType === "Średnio znane"
                ? averageWords.map(
                    // @ts-ignore
                    (word: {
                      word: string;
                      translation: string;
                      status: string;
                      id: string;
                    }) => (
                      <WordElement
                        key={word.id}
                        status={word.status}
                        word={word.word}
                        translation={word.translation}
                      />
                    )
                  )
                : repeatType === "Dobrze znane"
                ? wellWords.map(
                    // @ts-ignore
                    (word: {
                      word: string;
                      translation: string;
                      status: string;
                      id: string;
                    }) => (
                      <WordElement
                        key={word.id}
                        status={word.status}
                        word={word.word}
                        translation={word.translation}
                      />
                    )
                  )
                : Object.values(
                    // @ts-ignore
                    Object.values(data.data.categories).find(
                      // @ts-ignore

                      (category) => category.title === "1000 słów"
                    ).words
                  ).map(
                    // @ts-ignore
                    (word: {
                      word: string;
                      translation: string;
                      status: string;
                      id: string;
                    }) => (
                      <WordElement
                        key={word.id}
                        status={word.status}
                        word={word.word}
                        translation={word.translation}
                      />
                    )
                  )
              : Object.values(
                  // @ts-ignore
                  Object.values(data.data.categories).find(
                    // @ts-ignore
                    (category) => category.title === "1000 słów"
                  ).words
                ).map(
                  // @ts-ignore
                  (word: {
                    word: string;
                    translation: string;
                    status: string;
                    id: string;
                  }) => (
                    <WordElement
                      key={word.id}
                      status={word.status}
                      word={word.word}
                      translation={word.translation}
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

export default Words1000;
