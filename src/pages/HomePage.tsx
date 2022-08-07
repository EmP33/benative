import React from "react";

import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
// Images
import EducatorIcon from "../assets/EducatorIcon";
import JoinIcon from "../assets/JoinIcon";
// Components
import { Typography, Box, Button, Grid, useMediaQuery } from "@mui/material";
import Appbar from "../components/Home/Appbar/Appbar";
import BenefitSection from "../components/Home/BenefitSection/BenefitSection";
import Footer from "../components/Home/Footer/Footer";

const HomePage = () => {
  /* Checking if the screen is smaller than md (900px). */
  const theme = useTheme();
  const phone = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Appbar />
      <Grid
        container
        sx={{
          background: "var(--color-base-light)",
          p: 2,
          pt: 5,
          alignItems: "center",
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: "grid", justifyItems: "flex-start", rowGap: 2, p: 1 }}
        >
          <Typography
            variant="h1"
            sx={{ fontSize: { xs: 34, sm: 40 }, fontWeight: "bold" }}
          >
            Wystarczy 10 minut dziennie, abyś poznał język angielski
          </Typography>
          <Typography variant="body1">
            Wyznaczaj cele, skorzystaj z mnóstwa lekcji oferowanych przez
            BeNative. Wiele trybów nauki: słuchanie, czytanie, poznawanie słow.
            Ucz się języka już teraz!
          </Typography>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="success"
              size="large"
              sx={{ color: "var(--color-white)" }}
            >
              Rozpocznij!
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} md={6} sx={{ mt: { xs: 3, md: 0 } }}>
          <EducatorIcon />
        </Grid>
      </Grid>
      <Box sx={{ textAlign: "center", p: 5 }}>
        <Typography
          variant="h3"
          sx={{ fontSize: { xs: 40, sm: 48 }, fontWeight: "bold" }}
        >
          Dlaczego BeNative?
        </Typography>
      </Box>
      <BenefitSection
        type="ltr"
        title="Miły przyjemny interface"
        subtitle="Wzorowy dobór kolorów i komponentów"
        description="Wygląd naszej strony pozwoli Tobie w przyjemny sposób z niej korzystać, łatwa nawigacja po stronie oraz miłe dla oka kolory."
      />
      <BenefitSection
        type={phone ? "ltr" : "rtl"}
        title="Szeroki wybór trybów nauki"
        subtitle="Wybierz tryb jaki tylko ci odpowiada"
        description="BeNative oferuje ci mnóstwo trybów nauki: możesz uczyć się najbardziej przydatnych słówek, tworzyć własne zestawy, uczyć się zwrotów i wiele wiele więcej."
      />
      <BenefitSection
        type="ltr"
        title="Dostęp do statystyk i postępów"
        subtitle="Na bierząca badaj swój progres w nauce"
        description="Dzięki dokładnym statystykom zbadasz swój postęp w nauce angielskiego jaki uzyskałeś przy współpracy z nami."
      />
      <Grid
        container
        sx={{
          background: "var(--color-tertiary-dark)",
          p: { xs: 2, sm: 5, md: 15 },
        }}
      >
        <Grid item xs={12} md={6} sx={{ mb: { xs: 5, md: 0 } }}>
          <JoinIcon />
        </Grid>
        <Grid
          item
          sx={{
            textAlign: "center",
            display: "grid",
            rowGap: 3,
            justifyItems: "center",
            alignContent: "center",
          }}
          xs={12}
          md={6}
        >
          <Box>
            <Typography variant="h5">
              Dołącz do nas! Stwórz konto za darmo!
            </Typography>
            <Typography variant="body1">
              Zacznij korzystać z ponad 100 lekcji już dzisiaj
            </Typography>
          </Box>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ color: "var(--color-white)" }}
              size="large"
            >
              Zacznij naukę!
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default HomePage;
