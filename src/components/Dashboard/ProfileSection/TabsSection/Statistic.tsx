import React from "react";
// Components
import { Box, Typography, Tooltip } from "@mui/material";

interface Props {
  title: string;
  value: number;
}

const Statistic: React.FC<Props> = ({ title, value }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Typography variant="body2">{title}</Typography>
      <Typography variant="body2">{value}</Typography>
    </Box>
  );
};

export default Statistic;
