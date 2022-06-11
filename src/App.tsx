import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// Components
import HomePage from "./pages/HomePage";
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
      <HomePage />
    </ThemeProvider>
  );
}

export default App;
