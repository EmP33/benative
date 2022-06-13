import React from "react";
// Components
import { Box, Typography, Button } from "@mui/material";
// Icons
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";

interface Props {
  title: string;
  description: string;
  link: string;
  linkTitle: string;
}

const HelpItem: React.FC<Props> = ({ title, description, linkTitle, link }) => {
  return (
    <Box
      sx={{
        p: 3,
        m: 1,
        background: "var(--color-base)",
        borderRadius: 5,
        maxWidth: 380,
      }}
    >
      <Typography
        variant="h6"
        sx={{ mb: 1, color: "var(--color-primary-dark)", fontSize: 18 }}
      >
        <EmojiObjectsIcon /> {title}
      </Typography>
      <Typography
        variant="body1"
        sx={{ fontSize: 14, color: "var(--color-white)" }}
      >
        {description}
      </Typography>
      <Button sx={{ color: "var(--color-primary)" }}>{linkTitle}</Button>
    </Box>
  );
};

export default HelpItem;
