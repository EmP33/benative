import React from "react";
// Components
import { Box } from "@mui/material";

interface Props {
  title: string;
}

const WordsStatus: React.FC<Props> = ({ title }) => {
  return (
    <Box
      sx={{
        background:
          title === "Słabo znane"
            ? "linear-gradient(0deg, rgb(211, 47, 47) 45%, rgba(22,22,31,1) 50%)"
            : title === "Średnio znane"
            ? "linear-gradient(0deg, rgb(245, 124, 0) 45%, rgba(22,22,31,1) 50%)"
            : "linear-gradient(0deg, rgba(31,139,77,1) 45%, rgba(22,22,31,1) 50%)",
        border: "2px solid var(--color-base-light)",
        p: 2,
        textAlign: "center",
      }}
    >
      {title}
    </Box>
  );
};

export default WordsStatus;
