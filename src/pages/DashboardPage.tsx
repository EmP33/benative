import React from "react";
import { useLocation } from "react-router-dom";
// Components
import { Grid } from "@mui/material";
import Welcome from "../components/Dashboard/Welcome/Welcome";
import HelpSection from "../components/Dashboard/HelpSection/HelpSection";
import ProfileSection from "../components/Dashboard/ProfileSection/ProfileSection";

const DashboardPage = () => {
  const location = useLocation();
  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      <Grid
        item
        xs={0}
        sm={2}
        md={3}
        lg={4}
        sx={{ background: "var(--color-base-light)" }}
      >
        {location.pathname.includes("/profile") ? null : <ProfileSection />}
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={6}
        lg={4}
        sx={{ position: "relative", height: "100vh" }}
      >
        <Welcome />
      </Grid>
      <Grid
        item
        xs={0}
        sm={2}
        md={3}
        lg={4}
        sx={{ background: "var(--color-base-light)" }}
      >
        <HelpSection />
      </Grid>
    </Grid>
  );
};

export default DashboardPage;
