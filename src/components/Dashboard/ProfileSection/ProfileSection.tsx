import React from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useLocation, useNavigate } from "react-router-dom";
// Redux store
import { useAppSelector } from "../../../lib/hooks";
// Components
import { Box, IconButton, Typography } from "@mui/material";
import GoBackButton from "../../UI/GoBackButton";
import ProfileStatistics from "./ProfileStatistics";
import TabSection from "./TabsSection/TabsSection";
import SettingsSection from "../SettingsSection/SettingsSection";
// Icons
import SettingsIcon from "@mui/icons-material/Settings";
import {
  AvatarOne,
  AvatarTwo,
  AvatarThree,
  AvatarFour,
  AvatarFive,
  AvatarSix,
} from "../../../assets/avatars";
// Assets
import bg from "../../../assets/1C1C27.png";

const ProfileSection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);

  return (
    <Box
      sx={{
        margin: "0 8px 0 8px",
        height: "100vh",
        display: "grid",
        gridTemplateRows: "max-content 1fr",
        rowGap: 15,
        userSelect: "none",
        overflow: "auto",
        background: `url(${bg})`,
        backgroundSize: "cover",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      <Box
        sx={{
          p: 1,
          display: "flex",
          justifyContent: location.pathname.includes("/profile")
            ? "space-between"
            : "flex-end",
        }}
      >
        {location.pathname.includes("/profile") && <GoBackButton />}
        <IconButton
          aria-label="settings"
          sx={{ color: "var(--color-tertiary)" }}
          onClick={() => navigate("/dashboard/settings")}
        >
          <SettingsIcon sx={{ fontSize: 30 }} />
        </IconButton>
      </Box>

      <Box
        sx={{
          width: "100%",
          background: location.pathname.includes("/profile")
            ? "var(--color-base-dark)"
            : "var(--color-base)",
          borderRadius: "30px 30px 0 0 ",
          position: "relative",
          p: { xs: "48px 10px 0 10px", lg: "48px 24px 0 24px" },
          textAlign: "center",
          display: "grid",
          gridTemplateRows: "max-content max-content 1fr",
        }}
      >
        <Box
          sx={{
            width: 75,
            height: 75,
            position: "absolute",
            left: "50%",
            top: "-40px",
            transform: "translateX(-50%)",
            borderRadius: "50%",
            overflow: "hidden",
            cursor: "pointer",
            "&:hover": { filter: "brightness(50%)" },
          }}
          onClick={() => navigate("/dashboard/preferences")}
        >
          {user.photoURL === "AvatarSix" ? (
            <AvatarSix />
          ) : user.photoURL === "AvatarFive" ? (
            <AvatarFive />
          ) : user.photoURL === "AvatarFour" ? (
            <AvatarFour />
          ) : user.photoURL === "AvatarThree" ? (
            <AvatarThree />
          ) : user.photoURL === "AvatarTwo" ? (
            <AvatarTwo />
          ) : user.photoURL === "AvatarOne" ? (
            <AvatarOne />
          ) : (
            <AvatarOne />
          )}
        </Box>

        <Typography variant="h6">
          {user.displayName ? user.displayName : user.email}
        </Typography>
        <ProfileStatistics />
        <TabSection />
      </Box>
    </Box>
  );
};

const ConditionRender = () => {
  const location = useLocation();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const xsMatches = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      {/* Rendering the ProfileSection component if the screen is larger than lg or if the url is
     /profile. It is rendering the SettingsSection component if the screen is larger than md and the
     url is not /settings. It is rendering a box with a background image if the screen is smaller
     than md or the url is /settings. */}
      {matches ? (
        <ProfileSection />
      ) : location.pathname.includes("/profile") ? (
        <ProfileSection />
      ) : null}
      {!matches && xsMatches && !location.pathname.includes("/settings") ? (
        <SettingsSection />
      ) : (
        <Box
          sx={{
            height: "100vh",
            background: `url(${bg})`,
            backgroundSize: "cover",
          }}
        ></Box>
      )}
    </>
  );
};

export default ConditionRender;
