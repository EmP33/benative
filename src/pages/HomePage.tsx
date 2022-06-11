import React from "react";
// Images
import EducatorIcon from "../assets/EducatorIcon";
import JoinIcon from "../assets/JoinIcon";
// Components
import { Container, Typography, Box, Button, Grid } from "@mui/material";
import Appbar from "../components/Home/Appbar/Appbar";
import BenefitSection from "../components/Home/BenefitSection/BenefitSection";
import Footer from "../components/Home/Footer/Footer";

const HomePage = () => {
  return (
    <Container
      disableGutters
      maxWidth="lg"
      sx={{
        background: "var(--color-base)",
        minHeight: "100vh",
        width: "100%",
      }}
    >
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
          <Typography variant="h1" sx={{ fontSize: 40, fontWeight: "bold" }}>
            Wystarczy 10 minut dziennie, abyś poznał język angielski
          </Typography>
          <Typography variant="body1">
            Wyznaczaj cele, skorzystaj z mnóstwa lekcji oferowanych przez
            BeNative. Wiele trybów nauki: słuchanie, czytanie, poznawanie słow.
            Ucz się języka już teraz!
          </Typography>
          <Button
            variant="contained"
            color="success"
            size="large"
            sx={{ color: "var(--color-white)" }}
          >
            Rozpocznij!
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <EducatorIcon />
        </Grid>
      </Grid>
      <Box sx={{ textAlign: "center", p: 5 }}>
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          Dlaczego BeNative?
        </Typography>
      </Box>
      <BenefitSection
        type="rtl"
        title="Miły przyjemny interface"
        subtitle="Wzorowy dobór kolorów i komponentów"
        description="Wygląd naszej strony pozwoli Tobi w przyjemny sposób z niej korzystaj, łatwa nawigacja po stronie oraz miłe dla oka kolory."
      />
      <BenefitSection
        type="ltr"
        title="Szeroki wybór trybów nauki"
        subtitle="Wybierz tryb jaki tylko ci odpowiada"
        description="BeNative oferuje ci dziesiątki trybów nauki: możesz słuchać opowiadać, czytać wiersze, uczyć się słówek i wiele wiele więcej."
      />
      <BenefitSection
        type="rtl"
        title="Dostęp do statystyk i postępów"
        subtitle="Na bierząca badaj swój progres w nauce"
        description="Dzięki dokładnym statystykom zbadasz swój postęp w nauce angielskiego jaki uzyskałeś przy współpracy z nami."
      />
      <Grid container sx={{ background: "var(--color-tertiary-dark)", p: 15 }}>
        <Grid item xs={12} md={6}>
          <JoinIcon />
        </Grid>{" "}
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
          <Button
            variant="contained"
            color="primary"
            sx={{ color: "var(--color-white)" }}
            size="large"
          >
            Zacznij naukę!
          </Button>
        </Grid>
      </Grid>
      <Footer />
    </Container>
  );
};

export default HomePage;
