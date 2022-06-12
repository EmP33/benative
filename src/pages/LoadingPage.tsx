import React from "react";
// Components
import { Box } from "@mui/material";
import { ChaoticOrbit } from "@uiball/loaders";

const LoadingPage = () => {
  return (
    <Box
      sx={{
        background: "var(--color-base-light)",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ChaoticOrbit size={25} speed={1.5} color="#5b52d7" />
    </Box>
  );
};

export default LoadingPage;
