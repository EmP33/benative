import React from "react";
// Redux store
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { dataActions } from "../../store/data-slice";
// Components
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

interface Props {
  word?: any;
}

const CreateCard: React.FC<Props> = ({ word }) => {
  const dispatch = useAppDispatch();
  const setsWords = useAppSelector((state) => state.data.setsWords);

  const deleteWordHandler = () => {
    let copyOfSetsWords = [...setsWords];
    copyOfSetsWords = copyOfSetsWords.filter((w) => w.concept !== word.concept);
    dispatch(dataActions.setAllSetsWords([...[...copyOfSetsWords]]));
  };

  return (
    <Card sx={{ mt: 2, background: "var(--color-base-light)" }}>
      <CardContent>
        <Box
          sx={{
            border: "1px solid var(--color-primary)",
            p: 1,
            borderRadius: 2,
          }}
        >
          <Typography variant="body1" sx={{ color: "#ddd" }}>
            {word.concept}
          </Typography>
        </Box>
        <Box
          sx={{
            border: "1px solid var(--color-primary)",
            p: 1,
            borderRadius: 2,
            mt: 2,
          }}
        >
          <Typography variant="body1" sx={{ color: "#ddd" }}>
            {word.definition}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            sx={{ mt: 2 }}
            size="small"
            color="error"
            onClick={deleteWordHandler}
          >
            Usuń
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CreateCard;
