import React from "react";
// Components
import { Box, Typography, Tooltip } from "@mui/material";
// Icons
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import StrollerIcon from "@mui/icons-material/Stroller";
import FlagIcon from "@mui/icons-material/Flag";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import StarRateIcon from "@mui/icons-material/StarRate";
import PsychologyIcon from "@mui/icons-material/Psychology";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";

interface Props {
  title: string;
  description: string;
  finished: boolean;
}

const Badge: React.FC<Props> = ({ title, description, finished }) => {
  return (
    <Tooltip title={description} placement="top">
      <Box
        sx={{
          display: "grid",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: 75,
            height: 75,
            background: finished
              ? "var(--color-base-light)"
              : "rgba(50, 50, 66,.1)",
            border: finished
              ? "2px solid var(--color-base-dark)"
              : "2px solid var(--color-base-light)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 4,
            margin: "0 auto",
            mb: 1,
          }}
        >
          {title === "Żółtodziób" ? (
            <StrollerIcon
              sx={{
                fontSize: 36,
                color: finished ? "#fff" : "#aaa",
                opacity: finished ? 1 : 0.1,
              }}
            />
          ) : title === "Początkujący" ? (
            <FlagIcon
              sx={{
                fontSize: 36,
                color: finished ? "#fff" : "#aaa",
                opacity: finished ? 1 : 0.1,
              }}
            />
          ) : title === "Zaawansowany" ? (
            <FitnessCenterIcon
              sx={{
                fontSize: 36,
                color: finished ? "#fff" : "#aaa",
                opacity: finished ? 1 : 0.1,
              }}
            />
          ) : title === "Master" ? (
            <StarRateIcon
              sx={{
                fontSize: 36,
                color: finished ? "#fff" : "#aaa",
                opacity: finished ? 1 : 0.1,
              }}
            />
          ) : title === "Mistrz sytuacji" ? (
            <PsychologyIcon
              sx={{
                fontSize: 36,
                color: finished ? "#fff" : "#aaa",
                opacity: finished ? 1 : 0.1,
              }}
            />
          ) : title === "Uczony" ? (
            <ImportContactsIcon
              sx={{
                fontSize: 36,
                color: finished ? "#fff" : "#aaa",
                opacity: finished ? 1 : 0.1,
              }}
            />
          ) : title === "Przegryw" ? (
            <SentimentVeryDissatisfiedIcon
              sx={{
                fontSize: 36,
                color: finished ? "#fff" : "#aaa",
                opacity: finished ? 1 : 0.1,
              }}
            />
          ) : title === "WTF" ? (
            <ThumbDownAltIcon
              sx={{
                fontSize: 36,
                color: finished ? "#fff" : "#aaa",
                opacity: finished ? 1 : 0.1,
              }}
            />
          ) : title === "Giga Chad" ? (
            <EmojiEmotionsIcon
              sx={{
                fontSize: 36,
                color: finished ? "#fff" : "#aaa",
                opacity: finished ? 1 : 0.1,
              }}
            />
          ) : title === "Pracowity" ? (
            <HomeRepairServiceIcon
              sx={{
                fontSize: 36,
                color: finished ? "#fff" : "#aaa",
                opacity: finished ? 1 : 0.1,
              }}
            />
          ) : (
            <EmojiEventsIcon
              sx={{
                fontSize: 36,
                color: finished ? "#fff" : "#aaa",
                opacity: finished ? 1 : 0.1,
              }}
            />
          )}
        </Box>
        <Typography
          variant="body2"
          sx={{
            color: finished ? "#fff" : "#aaa",
            opacity: finished ? 1 : 0.1,
            textAlign: "center",
          }}
        >
          {title}
        </Typography>
      </Box>
    </Tooltip>
  );
};

export default Badge;
