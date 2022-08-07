import React from "react";
import { Link } from "react-router-dom";
// Redux Store
import { useAppDispatch } from "../../../lib/hooks";
import { logoutUser } from "../../../store/user-slice";
// Components
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
// Icon
import PaletteIcon from "@mui/icons-material/Palette";
import SettingsIcon from "@mui/icons-material/Settings";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import MapIcon from "@mui/icons-material/Map";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import SecurityIcon from "@mui/icons-material/Security";
import SchoolIcon from "@mui/icons-material/School";
import HelpIcon from "@mui/icons-material/Help";
import LogoutIcon from "@mui/icons-material/Logout";

interface Props {
  title: string;
  icon: string;
  link: string;
}

const SettingsItem: React.FC<Props> = ({ title, icon, link }) => {
  const dispatch = useAppDispatch();
  return (
    <Link
      to={link === "/" ? "#" : link}
      onClick={() => (title === "Wyloguj się" ? dispatch(logoutUser()) : "")}
      style={{
        color:
          link === "/" && title !== "Wyloguj się"
            ? "#aaa"
            : "var(--color-white)",
        textDecoration: "none",
      }}
    >
      <ListItem disablePadding>
        <ListItemButton
          sx={{
            background:
              link === "/" && title !== "Wyloguj się"
                ? "var(--color-base-dark)"
                : "inherit",
            "&:active,&:hover": {
              background:
                link === "/" && title !== "Wyloguj się"
                  ? "var(--color-base-dark)"
                  : "var(--color-base-light)",
              cursor:
                link === "/" && title !== "Wyloguj się" ? "default" : "pointer",
            },
          }}
        >
          <ListItemIcon>
            {icon === "settingsIcon" ? (
              <SettingsIcon sx={{ color: "var(--color-primary)" }} />
            ) : icon === "paletteIcon" ? (
              <PaletteIcon sx={{ color: "var(--color-primary)" }} />
            ) : icon === "premiumIcon" ? (
              <WorkspacePremiumIcon sx={{ color: "var(--color-primary)" }} />
            ) : icon === "tutorialIcon" ? (
              <MapIcon sx={{ color: "var(--color-primary)" }} />
            ) : icon === "newsIcon" ? (
              <AnnouncementIcon sx={{ color: "var(--color-primary)" }} />
            ) : icon === "passwordIcon" ? (
              <SecurityIcon sx={{ color: "var(--color-primary)" }} />
            ) : icon === "learnIcon" ? (
              <SchoolIcon sx={{ color: "var(--color-primary)" }} />
            ) : icon === "helpIcon" ? (
              <HelpIcon sx={{ color: "var(--color-primary)" }} />
            ) : icon === "logoutIcon" ? (
              <LogoutIcon sx={{ color: "var(--color-primary)" }} />
            ) : (
              ""
            )}
          </ListItemIcon>

          {title === "Wyloguj się" ? (
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", color: "var(--color-primary-dark)" }}
            >
              Wyloguj się
            </Typography>
          ) : (
            <ListItemText primary={title} />
          )}
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default SettingsItem;
