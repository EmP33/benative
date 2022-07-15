import React from "react";
// Components
import { Grid, Typography, Button } from "@mui/material";
// Icons
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

interface Props {
  task: any;
  nextQuestion: () => void;
}

const MultipleWordsLearnBoard: React.FC<Props> = ({ task, nextQuestion }) => {
  return (
    <Grid
      container
      sx={{
        mt: 2,
        overflow: "auto",
        height: "86vh",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Grid item xs={12}>
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            alignItems: "center",
            color: "var(--color-primary)",
          }}
        >
          <NotificationsActiveIcon sx={{ mr: 1 }} />
          {task.title}
        </Typography>
      </Grid>
      {task.description && (
        <Grid item xs={12}>
          <Typography
            variant="body1"
            sx={{
              display: "flex",
              alignItems: "center",
              color: "#8e8e97",
            }}
          >
            {task.description}
          </Typography>
        </Grid>
      )}
      <Grid item xs={12} sx={{ mt: 2, mb: 2 }}>
        <Grid container sx={{ border: "1px solid var(--color-primary)" }}>
          <Grid
            item
            xs={6}
            sx={{
              fontWeight: "bold",
              color: "var(--color-tertiary-dark)",
              p: 1,
            }}
          >
            Słówko
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              fontWeight: "bold",
              color: "var(--color-tertiary-dark)",
              p: 1,
            }}
          >
            Tłumaczenie
          </Grid>
          {task.wordPair.map((pair: any, i: number) => (
            <Grid container key={i}>
              <Grid item xs={6} sx={{ p: 1 }}>
                {pair.word}
              </Grid>
              <Grid item xs={6} sx={{ p: 1 }}>
                {pair.translation}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid
        item
        xs={12}
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Button onClick={nextQuestion} variant="contained" size="large">
          Dalej
        </Button>
      </Grid>
    </Grid>
  );
};

export default MultipleWordsLearnBoard;
