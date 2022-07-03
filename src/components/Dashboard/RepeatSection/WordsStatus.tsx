import React from "react";
// Components
import { Box, Typography, Chip } from "@mui/material";
// Types
import { WordType } from "../../../data.types";

interface Props {
  title: string;
  words: WordType[];
  status: number;
  changeRepeatType: (type: string) => void;
  repeatType: string;
}

const WordsStatus: React.FC<Props> = ({
  title,
  words,
  status,
  changeRepeatType,
  repeatType,
}) => {
  return (
    <Box
      onClick={() => {
        if (repeatType === title) {
          changeRepeatType("");
        } else {
          changeRepeatType(title);
        }
      }}
      sx={{
        background:
          title === "Słabo znane"
            ? `linear-gradient(0deg, rgb(211, 47, 47) ${
                status - 2
              }%, rgba(22,22,31,1) ${status}%)`
            : title === "Średnio znane"
            ? `linear-gradient(0deg, rgb(245, 124, 0) ${
                status - 2
              }%, rgba(22,22,31,1) ${status}%)`
            : `linear-gradient(0deg, rgba(31,139,77,1) ${
                status - 2
              }%, rgba(22,22,31,1) ${status}%)`,
        border:
          repeatType === title
            ? "2px solid var(--color-tertiary-light)"
            : "2px solid var(--color-base-light)",
        p: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="body1"
        sx={{ fontWeight: "bold", textAlign: "center" }}
      >
        {title} <br />
        {words?.length}
      </Typography>
    </Box>
  );
};

export default WordsStatus;
