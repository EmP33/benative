import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useLocation, useParams } from "react-router-dom";
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
  const location = useLocation();
  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const data = useAppSelector((state) => state.data.data);
  const user = useAppSelector((state) => state.user.user);
  const setsWords = useAppSelector((state) => state.data.setsWords);
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);

  console.log(title);

  useEffect(() => {
    if (location.pathname.includes("/edit")) {
      setTitle(
        // @ts-ignore
        Object.values(
          // @ts-ignore
          Object.values(data.data.categories).find(
            (cat: any) => cat.title === "Fiszki"
          ).sets
        ).find((set: any) => set.id === params.setID).title
      );
      dispatch(
        dataActions.setAllSetsWords(
          // @ts-ignore
          Object.values(
            // @ts-ignore
            Object.values(data.data.categories).find(
              (cat: any) => cat.title === "Fiszki"
            ).sets
          ).find((set: any) => set.id === params.setID).words
        )
      );
    }
  }, []);

  console.log(params.setID);

  const submitSetHandler = () => {
    if (title === "") return setTitleError(true);
    dispatch(
      addWordSet(
        user.uid,
        // @ts-ignore
        Object.values(data.data.categories).find(
          (cat: any) => cat.title === "Fiszki"
        ).id,
        {
          id: params.setID ? params.setID : uuidv4(),
          title: title,
          words: setsWords,
        }
      )
    );
    if (location.pathname.includes("/edit")) {
      navigate(`/dashboard/categories/flash-cards/set/${params.setID}`, {
        replace: true,
      });
    } else {
      navigate("/dashboard/categories/flash-cards", { replace: true });
    }
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
          value={title}
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
