import React from "react";
// Components
import { Box, List } from "@mui/material";
import SettingsItem from "./SettingsItem";
// Icons
import SectionHeader from "../../UI/SectionHeader";

const SettingsSection = () => {
  return (
    <Box
      sx={{
        margin: "0 8px 0 8px",
        height: "100vh",
        display: "grid",
        gridTemplateRows: "max-content 1fr",
        rowGap: 2,
        userSelect: "none",
        overflow: "auto",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      <SectionHeader title="Ustawienia" />
      <Box
        sx={{
          width: "100%",
          background: "var(--color-base)",
          borderRadius: "30px 30px 0 0 ",
          position: "relative",
          p: { md: "24px 4px 0 4px", lg: "24px 12px 0 12px" },
          textAlign: "center",
          display: "grid",
          gridTemplateRows: "max-content max-content 1fr",
        }}
      >
        <List>
          <SettingsItem
            title="Ustawienia Konta"
            icon="settingsIcon"
            link="/dashboard/user-settings"
          />
          <SettingsItem
            title="Preferencje"
            icon="paletteIcon"
            link="/dashboard/preferences"
          />
          <SettingsItem title="Premium" icon="premiumIcon" link="/" />
          <SettingsItem title="Powtórz Tutorial" icon="tutorialIcon" link="/" />
          <SettingsItem title="Nowości" icon="newsIcon" link="/" />
          <SettingsItem
            title="Hasło i zabezpieczenia"
            icon="passwordIcon"
            link="/dashboard/security"
          />
          <SettingsItem title="Plan Nauki" icon="learnIcon" link="/" />
          <SettingsItem title="Pomoc" icon="helpIcon" link="/" />
          <SettingsItem title="Wyloguj się" icon="logoutIcon" link="/" />
        </List>
      </Box>
    </Box>
  );
};

export default SettingsSection;
