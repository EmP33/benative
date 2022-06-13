import React from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
// Redux store
import { useAppSelector } from "../../../lib/hooks";
// Components
import { Box, IconButton, Typography, Button } from "@mui/material";
import GoBackButton from "../../UI/GoBackButton";
import ProfileStatistics from "./ProfileStatistics";
import TabSection from "./TabsSection/TabsSection";
// Icons
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const ProfileSection = () => {
  const user = useAppSelector((state) => state.user.user);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <>
      {matches && (
        <Box
          sx={{
            margin: "0 8px 0 8px",
            height: "100vh",
            display: "grid",
            gridTemplateRows: "max-content 1fr",
            rowGap: 15,
            userSelect: "none",
            overflow: "auto",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <Box sx={{ p: 1, display: "flex", justifyContent: "space-between" }}>
            <GoBackButton />
            <IconButton
              aria-label="settings"
              sx={{ color: "var(--color-tertiary)" }}
            >
              <SettingsIcon sx={{ fontSize: 30 }} />
            </IconButton>
          </Box>

          <Box
            sx={{
              width: "100%",
              background: "var(--color-base)",
              borderRadius: "30px 30px 0 0 ",
              position: "relative",
              p: { md: "48px 4px 0 4px", lg: "48px 24px 0 24px" },
              pt: 6,
              textAlign: "center",
              display: "grid",
              gridTemplateRows: "max-content max-content 1fr",
            }}
          >
            <AccountCircleIcon
              sx={{
                fontSize: 80,
                position: "absolute",
                left: "50%",
                top: "-40px",
                transform: "translateX(-50%)",
              }}
            />
            <Typography variant="h6">
              {user.displayName ? user.displayname : user.email}
            </Typography>
            <ProfileStatistics />
            <TabSection />
          </Box>
        </Box>
      )}
    </>
  );
};

export default ProfileSection;
