import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../lib/hooks";
import { uiActions } from "../../../store/ui-slice";
import { userActions } from "../../../store/user-slice";
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
import QuestionResult from "../../Lesson/QuestionResult/QuestionResult";
import RepeatSection from "../RepeatSection/RepeatSection";
import RepeatWords from "../../Repeat/RepeatWords/RepeatWords";
import LearnDrawer from "../LearnDrawer/LearnDrawer";
import Words1000 from "../../1000-words/Words1000";
import Flashcards from "../../FlashCards/Flashcards";
import FlashcardCreate from "../../FlashCards/FlashcardCreate";
import SetSection from "../../FlashCards/SetSection/SetSection";
// Icons
import SchoolIcon from "@mui/icons-material/School";
import RepeatIcon from "@mui/icons-material/Repeat";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from "@mui/icons-material/Person";

const Welcome = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  // Redux Store
  const { isError, errorMessage, openLessonDrawer } = useAppSelector(
    (state) => state.ui
  );

  // Local State
  // Bottom Navigation Card
  const [value, setValue] = useState(0);

  useEffect(() => {
    /* Setting the value of the bottom navigation bar based on the current pathname. */
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
        <Route path="/categories/10-hundred-words" element={<Words1000 />} />
        <Route
          path="/categories/10-hundred-words/repeat-words"
          element={<RepeatWords />}
        />
        <Route path="/categories/flash-cards" element={<Flashcards />} />
        <Route
          path="/categories/flash-cards/create"
          element={<FlashcardCreate />}
        />
        <Route
          path="/categories/flash-cards/set/:setID"
          element={<SetSection />}
        />
        <Route path="/repeat" element={<RepeatSection />} />
        <Route path="/repeat-words" element={<RepeatWords />} />
        <Route path="/settings" element={<SettingsSection />} />
        <Route path="/user-settings" element={<AccountSettings />} />
        <Route path="/security" element={<Security />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route
          path="/lesson/:category/:lessonID/:partID/:ex"
          element={<QuestionResult />}
        />
      </Routes>
      {location.pathname.includes("/lesson") ||
      location.pathname.includes("/repeat-words") ? (
        ""
      ) : (
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
      )}

      {openLessonDrawer && (
        <Box
          sx={{
            width: "100%",
            height: "100vh",
            background: "var(--color-base-dark)",
            position: "absolute",
            left: 0,
            top: 0,
            opacity: ".5",
          }}
          onClick={() => {
            dispatch(userActions.setCurrentLessonPart(null));
            dispatch(uiActions.toggleOpenLessonDrawer());
          }}
        ></Box>
      )}
      <Box
        sx={{
          width: "100%",
          position: "absolute",
          bottom: 0,
          height: openLessonDrawer ? "50vh" : 0,
          transition: "all .4s ease",
        }}
      >
        {openLessonDrawer && <LearnDrawer />}
      </Box>
    </>
  );
};

export default React.memo(Welcome);
