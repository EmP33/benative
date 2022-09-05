import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// AOS
import AOS from "aos";
import "aos/dist/aos.css";
// Firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
// Redux Store
import { useAppDispatch, useAppSelector } from "./lib/hooks";
import { userActions } from "./store/user-slice";
// Components
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import { Container } from "@mui/material";
// Styles
import GlobalStyle from "./App.styles";
import LoadingPage from "./pages/LoadingPage";

const theme = createTheme({
  palette: {
    primary: { main: "#5b52d7" },
    secondary: { main: "#26272a" },
    success: { main: "#27ae60" },
    info: { main: "#1d1c1e" },
  },
  typography: {
    fontFamily: ["IBM Plex Sans", "lato", "Roboto"].join(","),
  },
});

const App = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const dataStatus = useAppSelector((state) => state.user.dataStatus);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(userActions.fetchUser(user));
      } else {
        dispatch(userActions.fetchUser(user));
      }
    });
  }, [dispatch, dataStatus]);
  useEffect(() => {
    AOS.init({
      duration: 500,
    });
  }, []);

  if (user === undefined) {
    return (
      <>
        <GlobalStyle />
        <LoadingPage />
      </>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container
        disableGutters
        maxWidth="lg"
        sx={{
          background: "var(--color-base)",
          minHeight: "100vh",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/register"
            element={user ? <Navigate to="/dashboard" /> : <RegisterPage />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" /> : <LoginPage />}
          />
          <Route
            path="/dashboard/*"
            element={!user ? <Navigate to="/" /> : <DashboardPage />}
          />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
};

export default App;
