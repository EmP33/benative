import React from "react";
import { Grid, Typography, Box } from "@mui/material";

interface Props {
  type: "rtl" | "ltr";
  title: string;
  subtitle: string;
  description: string;
}

const BenefitSection: React.FC<Props> = ({
  type,
  title,
  subtitle,
  description,
}) => {
  return (
    <Grid container sx={{ p: 5, margin: "0 auto" }}>
      {type === "rtl" ? (
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "grid",
            rowGap: 2,
            alignContent: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#666",
              fontSize: 14,
              textTransform: "uppercase",
            }}
          >
            {subtitle}
          </Typography>
          <Typography variant="h4">{title}</Typography>
          <Typography variant="body1" sx={{ fontSize: 18 }}>
            {description}
          </Typography>
        </Grid>
      ) : (
        <Grid
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 300,
              height: 400,
              background: "var(--color-secondary)",
            }}
          ></Box>
        </Grid>
      )}
      {type === "rtl" ? (
        <Grid
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 300,
              height: 400,
              background: "var(--color-secondary)",
            }}
          ></Box>
        </Grid>
      ) : (
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "grid",
            rowGap: 2,
            alignContent: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#666",
              fontSize: 14,
              textTransform: "uppercase",
            }}
          >
            {subtitle}
          </Typography>
          <Typography variant="h4">{title}</Typography>
          <Typography variant="body1" sx={{ fontSize: 18 }}>
            {description}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default BenefitSection;
