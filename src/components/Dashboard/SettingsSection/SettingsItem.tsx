import React from "react";
import { Link } from "react-router-dom";
// Components
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
// Icon
import DraftsIcon from "@mui/icons-material/Drafts";

interface Props {
  title: string;
  icon: string;
  link: string;
}

const SettingsItem: React.FC<Props> = ({ title, icon, link }) => {
  return (
    <Link
      to="/dashboard/user-settings"
      style={{ color: "var(--color-white)", textDecoration: "none" }}
    >
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <DraftsIcon sx={{ color: "var(--color-primary)" }} />
          </ListItemIcon>
          <ListItemText primary={title} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default SettingsItem;
