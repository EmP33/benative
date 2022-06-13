import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

// Components
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import ProfileSection from "../ProfileSection/ProfileSection";
import LearnSection from "../LearnSection/LearnSection";
// Icons

import SchoolIcon from "@mui/icons-material/School";
import RepeatIcon from "@mui/icons-material/Repeat";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from "@mui/icons-material/Person";

const Welcome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState(0);

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
      {/* DASHBOARD CONTENT ROUTES */}
      <Routes>
        <Route path="/" element={<LearnSection />} />
        <Route path="/profile" element={<ProfileSection />} />
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
          />
          <BottomNavigationAction
            sx={{ color: "var(--color-white)" }}
            label="Kategorie"
            icon={<CategoryIcon />}
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
