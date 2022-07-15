import React from "react";
// Components
import { Box, Typography } from "@mui/material";
// Icons
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

interface Props {
  status: string;
  word: string;
  translation: string;
  oldStatus?: { status: string; id: string; wasCorrect: boolean; word: {} };
}

const WordElement: React.FC<Props> = ({
  status,
  word,
  translation,
  oldStatus,
}) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr max-content max-content max-content",
        p: 1,
        alignItems: "center",
        "&:hover": {
          background: "var(--color-base-light)",
        },
      }}
    >
      <Box>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          {word}
        </Typography>
        <Typography variant="body2" sx={{ color: "#8282ac" }}>
          {translation}
        </Typography>
      </Box>
      {oldStatus && (
        <Box
          sx={{
            width: 25,
            height: 25,
            background:
              oldStatus.status === "well"
                ? "linear-gradient(100deg, rgba(31,139,77,1) 21%, rgba(47,209,115,1) 77%)"
                : oldStatus.status === "average"
                ? "linear-gradient(100deg, rgba(245,124,0,1) 21%, rgba(255,167,38,1) 77%)"
                : "linear-gradient(100deg, #d32f2f 21%, #f44336 77%)",
            borderRadius: "50%",
          }}
        ></Box>
      )}
      {oldStatus && <ArrowRightAltIcon sx={{ m: 0.5 }} />}
      <Box
        sx={{
          width: 25,
          height: 25,
          background:
            status === "well"
              ? "linear-gradient(100deg, rgba(31,139,77,1) 21%, rgba(47,209,115,1) 77%)"
              : status === "average"
              ? "linear-gradient(100deg, rgba(245,124,0,1) 21%, rgba(255,167,38,1) 77%)"
              : "linear-gradient(100deg, #d32f2f 21%, #f44336 77%)",
          borderRadius: "50%",
        }}
      ></Box>
    </Box>
  );
};

export default WordElement;
