import React from "react";
import { useLocation } from "react-router-dom";
// Components
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import GoBackButton from "../../UI/GoBackButton";
import SettingsItem from "./SettingsItem";
// Icons
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SectionHeader from "../../UI/SectionHeader";

const SettingsSection = () => {
  const location = useLocation();
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
          background: location.pathname.includes("/profile")
            ? "var(--color-base-dark)"
            : "var(--color-base)",
          borderRadius: "30px 30px 0 0 ",
          position: "relative",
          p: { md: "24px 4px 0 4px", lg: "24px 12px 0 12px" },
          textAlign: "center",
          display: "grid",
          gridTemplateRows: "max-content max-content 1fr",
        }}
      >
        <List>
          <SettingsItem title="Ustawienia Konta" icon="example" link="/" />
          <SettingsItem title="Preferencje" icon="example" link="/" />
          <SettingsItem title="Premium" icon="example" link="/" />
          <SettingsItem title="Powtórz Tutorial" icon="example" link="/" />
          <SettingsItem title="Nowości" icon="example" link="/" />
          <SettingsItem
            title="Hasło i zabezpieczenia"
            icon="example"
            link="/"
          />
          <SettingsItem title="Plan Nauki" icon="example" link="/" />
          <SettingsItem title="Pomoc" icon="example" link="/" />
          <SettingsItem title="Wyloguj się" icon="example" link="/" />
        </List>
      </Box>
    </Box>
  );
};

export default SettingsSection;
