import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../../lib/hooks";
// Components
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Alert,
} from "@mui/material";
import ProfileSection from "../ProfileSection/ProfileSection";
import LearnSection from "../LearnSection/LearnSection";
import CategoriesSection from "../CategoriesSection/CategoriesSection";
import SettingsSection from "../SettingsSection/SettingsSection";
import AccountSettings from "../SettingsSection/SettingsElements/AccountSettings";
import Security from "../SettingsSection/SettingsElements/Security";
import Preferences from "../SettingsSection/SettingsElements/Preferences";
// Icons
import SchoolIcon from "@mui/icons-material/School";
import RepeatIcon from "@mui/icons-material/Repeat";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from "@mui/icons-material/Person";

const Welcome = () => {
  const isError = useAppSelector((state) => state.ui.isError);
  const errorMessage = useAppSelector((state) => state.ui.errorMessage);
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(
      location.pathname.includes("/profile")
        ? 3
        : location.pathname.includes("/categories")
        ? 2
        : location.pathname.includes("/repeat")
        ? 1
        : 0
    );
  }, [location.pathname]);

  return (
    <>
      {isError && <Alert severity="error">{errorMessage}</Alert>}
      {/* DASHBOARD CONTENT ROUTES */}
      <Routes>
        <Route path="/" element={<LearnSection />} />
        <Route path="/profile" element={<ProfileSection />} />
        <Route path="/categories" element={<CategoriesSection />} />
        <Route path="/settings" element={<SettingsSection />} />
        <Route path="/user-settings" element={<AccountSettings />} />
        <Route path="/security" element={<Security />} />
        <Route path="/preferences" element={<Preferences />} />
      </Routes>
      <Box sx={{ width: "100%", position: "absolute", bottom: 0 }}>
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          sx={{
            background: "var(--color-base-dark)",
          }}
        >
          <BottomNavigationAction
            sx={{ color: "var(--color-white)" }}
            label="Nauka"
            icon={<SchoolIcon />}
            onClick={() => navigate("/dashboard")}
          />
          <BottomNavigationAction
            sx={{ color: "var(--color-white)" }}
            label="Powtórz"
            icon={<RepeatIcon />}
            onClick={() => navigate("/dashboard/repeat")}
          />
          <BottomNavigationAction
            sx={{ color: "var(--color-white)" }}
            label="Kategorie"
            icon={<CategoryIcon />}
            onClick={() => navigate("/dashboard/categories")}
          />
          <BottomNavigationAction
            sx={{ color: "var(--color-white)" }}
            label="Profile"
            icon={<PersonIcon />}
            onClick={() => navigate("/dashboard/profile")}
          />
        </BottomNavigation>
      </Box>
    </>
  );
};

export default Welcome;
