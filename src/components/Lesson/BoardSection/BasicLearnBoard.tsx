import React from "react";
// Components
import { Box, Grid, Typography, Button } from "@mui/material";
// Icons
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

interface Props {
  task: any;
  nextQuestion: () => void;
}

const BasicLearnBoard: React.FC<Props> = ({ task, nextQuestion }) => {
  return (
    <Grid container sx={{ mt: 5 }}>
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
        <Typography
          variant="body1"
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 2,
            color: "#8e8e97",
          }}
        >
          {task.description}
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

export default BasicLearnBoard;
