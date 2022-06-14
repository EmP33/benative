import React from "react";
// Components
import SectionHeader from "../../../UI/SectionHeader";
import { Box, Typography, Grid } from "@mui/material";
import AvatarItem from "./AvatarItem/AvatarItem";
// Assets
import {
  AvatarFive,
  AvatarFour,
  AvatarOne,
  AvatarSix,
  AvatarThree,
  AvatarTwo,
} from "../../../../assets/avatars";

const Preferences = () => {
  const avatars = [
    "AvatarOne",
    "AvatarTwo",
    "AvatarThree",
    "AvatarFour",
    "AvatarFive",
    "AvatarSix",
  ];
  return (
    <>
      <SectionHeader title="Ustawienia Konta" />
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 900 }}>
          Zmień Avatar
        </Typography>
        <Grid container spacing={2} sx={{ maxWidth: "100%", margin: "0 auto" }}>
          {avatars.map((avatar) => (
            <AvatarItem key={avatar} icon={avatar} />
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Preferences;
