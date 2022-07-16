import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
// Redux Store
import { useAppSelector, useAppDispatch } from "../../lib/hooks";
import { addWordSet, dataActions } from "../../store/data-slice";
// Components
import { Box, TextField } from "@mui/material";
import SectionHeader from "../UI/SectionHeader";
import CreateCard from "./CreateCard";
import DisplayCard from "./DisplayCard";

interface Props {}

const FlashcardCreate: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const data = useAppSelector((state) => state.data.data);
  const user = useAppSelector((state) => state.user.user);
  const setsWords = useAppSelector((state) => state.data.setsWords);
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);

  const submitSetHandler = () => {
    if (title === "") return setTitleError(true);
    dispatch(
      addWordSet(
        user.uid,
        // @ts-ignore
        Object.values(data.data.categories).find(
          (cat: any) => cat.title === "Fiszki"
        ).id,
        { id: uuidv4(), title: title, words: setsWords }
      )
    );
    navigate("/dashboard/categories/flash-cards");
    dispatch(dataActions.setAllSetsWords([]));
  };

  return (
    <Box
      sx={{
        margin: "0 8px 0 8px",
        height: "94vh",
        display: "grid",
        gridTemplateRows: "max-content 1fr",
        rowGap: 3,
        userSelect: "none",
        overflow: "auto",
        "&::-webkit-scrollbar": { display: "none" },
        pb: 2,
      }}
    >
      <SectionHeader title="Stwórz zestaw" onSubmit={submitSetHandler} />
      <Box>
        <TextField
          error={titleError}
          helperText={titleError && "Wprowadź nazwę dla zestawu"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          onFocus={() => setTitleError(false)}
          focused
          required
          label="Nazwa"
          variant="outlined"
          placeholder="Przedmiot, rodzaj, jednostka"
          color="primary"
          fullWidth
          inputProps={{
            style: { color: "#aaa" },
          }}
          sx={{ mb: 3 }}
        />
        <CreateCard />
        {setsWords.map((word, i) => (
          <DisplayCard key={i} word={word} />
        ))}
      </Box>
    </Box>
  );
};

export default FlashcardCreate;
