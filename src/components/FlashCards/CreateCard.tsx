import React, { useRef } from "react";
// Redux store
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { dataActions } from "../../store/data-slice";
// Components
import { Card, CardContent, TextField, Button } from "@mui/material";

interface Props {
  word?: any;
}

const CreateCard: React.FC<Props> = ({ word }) => {
  const dispatch = useAppDispatch();
  const setsWords = useAppSelector((state) => state.data.setsWords);
  const concept = useRef<HTMLInputElement>(null);
  const definition = useRef<HTMLInputElement>(null);

  const addSetsWord = () => {
    if (!concept.current || !definition.current) return;
    if (concept.current.value === "" || definition.current.value === "") return;

    if (setsWords.findIndex((word: any) => word.concept === concept) !== -1) {
      let copyOfSetsWords = [...setsWords];
      copyOfSetsWords[
        setsWords.findIndex((word: any) => word.concept === concept)
      ] = {
        status: "weak",
        concept: concept.current.value,
        definition: definition.current.value,
      };
      dispatch(dataActions.setAllSetsWords([...[...copyOfSetsWords]]));
    } else {
      dispatch(
        dataActions.setSetsWords({
          status: "weak",
          concept: concept.current.value,
          definition: definition.current.value,
        })
      );
    }
    concept.current.value = "";
    definition.current.value = "";
  };

  return (
    <Card sx={{ mt: 2, background: "var(--color-base-light)" }}>
      <CardContent>
        <form
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            addSetsWord();
          }}
        >
          <TextField
            disabled={!!word}
            inputRef={concept}
            focused
            label="Pojęcie"
            variant="outlined"
            color="primary"
            fullWidth
            inputProps={{
              style: { color: "#aaa" },
            }}
            defaultValue={word ? word.concept : ""}
            sx={{
              mb: 3,
            }}
          />
          <TextField
            disabled={!!word}
            inputRef={definition}
            focused
            label="Definicja"
            variant="outlined"
            color="primary"
            fullWidth
            defaultValue={word ? word.definition : ""}
            inputProps={{
              style: {
                color: "#aaa",
              },
            }}
          />
          {!word && (
            <Button
              sx={{ mt: 1 }}
              fullWidth
              size="large"
              color="primary"
              type="submit"
            >
              Dodaj
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateCard;
