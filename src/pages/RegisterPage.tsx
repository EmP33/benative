import React from "react";
import { Link } from "react-router-dom";
// Components
import { Grid, Typography, Button } from "@mui/material";
// Icons
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
// Styles
import { GoBackButton, CSSTextField } from "./Components.style";

const RegisterPage = () => {
  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      <Grid
        item
        xs={0}
        sm={2}
        md={3}
        lg={4}
        sx={{ background: "var(--color-base-light)" }}
      ></Grid>
      <Grid item xs={12} sm={8} md={6} lg={4} sx={{ p: 3, pt: 8 }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <GoBackButton>
            <KeyboardArrowLeftIcon />
          </GoBackButton>
        </Link>

        <Typography variant="h4" sx={{ mt: 4 }}>
          Stwórz konto
        </Typography>
        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={12}>
            <CSSTextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              color="success"
              sx={{ width: "100%", input: { color: "#86868f" } }}
            />
          </Grid>
          <Grid item xs={12}>
            <CSSTextField
              id="outlined-basic"
              label="Create Password"
              variant="outlined"
              color="success"
              type="password"
              sx={{ width: "100%", input: { color: "#86868f" } }}
            />
          </Grid>
          <Grid item xs={12}>
            <CSSTextField
              id="outlined-basic"
              label="Confirm Password"
              variant="outlined"
              color="success"
              type="password"
              sx={{ width: "100%", input: { color: "#86868f" } }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              size="large"
              variant="contained"
              sx={{ width: "100%", mt: 2 }}
            >
              Stwórz konto
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={0}
        sm={2}
        md={3}
        lg={4}
        sx={{ background: "var(--color-base-light)" }}
      ></Grid>
    </Grid>
  );
};

export default RegisterPage;
