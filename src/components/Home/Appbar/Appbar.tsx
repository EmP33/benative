import React from "react";
// Images
import benative from "../../../assets/benative-white.png";
// Components
import { Box, Button } from "@mui/material";

const Appbar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 1,
        boxShadow: " 0px 1px 3px 0px rgba(46, 47, 50, 1)",
      }}
    >
      <img src={benative} alt="logo" style={{ width: "200px" }} />
      <Box sx={{ display: "flex", columnGap: 2 }}>
        <Button
          variant="outlined"
          sx={{
            borderColor: "var(--color-white)",
            color: "var(--color-white)",

            "&:hover,&:active": {
              borderColor: "#ccc",
              color: "#ccc",
            },
          }}
        >
          Rejestracja
        </Button>
        <Button color="primary" variant="contained">
          Logowanie
        </Button>
      </Box>
    </Box>
  );
};

export default Appbar;
