import React from "react";
import { Link } from "react-router-dom";
// Components
import { Typography, Grid, Button } from "@mui/material";
import Welcome from "../components/Dashboard/Welcome";

const DashboardPage = () => {
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
      <Grid item xs={12} sm={8} md={6} lg={4} sx={{ position: "relative" }}>
        <Welcome />
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

export default DashboardPage;
