import React from "react";
import { useNavigate } from "react-router-dom";
// Components
import { Box, IconButton } from "@mui/material";
// Icons
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100%",
        background: "var(--color-base-light)",
        p: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ margin: 0 }}>&copy;2022 BeNative</p>
        <p style={{ display: "flex", alignItems: "center", margin: 0 }}>
          EmP33
          <IconButton
            aria-label="github"
            size="large"
            color="primary"
            sx={{ ml: 1 }}
            href="https://github.com/EmP33"
            target="_blank"
          >
            <GitHubIcon />
          </IconButton>
        </p>
      </Box>
    </Box>
  );
};

export default Footer;
