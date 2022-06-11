import React from "react";
import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// Components
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { Container } from "@mui/material";
// Styles
import GlobalStyle from "./App.styles";

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

function App() {
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
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;