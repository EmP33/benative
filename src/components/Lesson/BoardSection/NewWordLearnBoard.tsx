import React from "react";
// Components
import { Grid, Typography, Button } from "@mui/material";
// Icons
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

interface Props {
  task: any;
  nextQuestion: () => void;
}

const NewWordLearnBoard: React.FC<Props> = ({ task, nextQuestion }) => {
  console.log(task);
  return (
    <Grid container sx={{ mt: 2 }}>
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
      <Grid item xs={12}>
        {task.image && (
          <img
            src={task.image}
            srcSet={task.image}
            alt={task.title}
            loading="lazy"
          />
        )}
      </Grid>
      <Grid item xs={12} sx={{ mt: 2, mb: 2 }}>
        <Typography
          variant="body1"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {task.word}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            display: "flex",
            alignItems: "center",
            color: "#8e8e97",
          }}
        >
          {task.translation}
        </Typography>
      </Grid>

      <Grid item xs={12} sx={{ mb: 2, borderTop: "2px solid #8e8e97" }}>
        <Typography
          variant="body1"
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 2,
          }}
        >
          {task.example}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            display: "flex",
            alignItems: "center",
            color: "#8e8e97",
          }}
        >
          {task.translationOfExample}
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button onClick={nextQuestion} variant="contained" size="large">
          Dalej
        </Button>
      </Grid>
    </Grid>
  );
};

export default NewWordLearnBoard;
