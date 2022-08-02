import React from "react";
import { Box, Typography } from "@mui/material";

interface Props {
  label: string;
  value: string | number;
}

const Detail: React.FC<Props> = ({ label, value }) => {
  console.log(typeof value === "boolean");
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Typography variant="body2">{label}:</Typography>
      <Typography variant="body2">
        {value === undefined || null
          ? ""
          : typeof value === "boolean"
          ? value
            ? "Tak"
            : "Nie"
          : value}
      </Typography>
    </Box>
  );
};

export default Detail;
