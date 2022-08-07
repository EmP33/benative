import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import functions from "../../../assets/functions.png";
import interfaces from "../../../assets/interfaces.png";
import statistics from "../../../assets/statistics.png";
import words from "../../../assets/words.png";
import stats from "../../../assets/stats.png";
import translate from "../../../assets/translate.png";

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
  // RTL - Right=Content | Left=Image
  // LTR - Left=Content | Right=Image
  return (
    <Grid
      data-aos={type === "ltr" ? "fade-left" : "fade-right"}
      container
      sx={{ p: { xs: 1, sm: 5 }, margin: "0 auto" }}
    >
      {type === "ltr" ? (
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "grid",
            rowGap: 2,
            alignContent: "center",
            mb: { xs: 3, sm: 0 },
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
          item
          sx={{
            display: "flex",
            mb: { xs: 3, sm: 0 },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {title === "Miły przyjemny interface" ? (
            <Box
              sx={{
                height: 400,
                display: "flex",
                mb: { xs: 3, sm: 0 },
              }}
            >
              <img
                src={translate}
                alt="image"
                style={{
                  width: "60%",
                  transform: "rotate(-5deg)",
                  zIndex: "-1",
                  boxShadow: " 0px 8px 10px -5px rgba(0,0,0,1)",
                }}
              />
              <img
                src={interfaces}
                alt="image"
                style={{
                  width: "60%",
                  boxShadow: " 0px 8px 10px -5px rgba(0,0,0,1)",
                }}
              />
            </Box>
          ) : title === "Szeroki wybór trybów nauki" ? (
            <Box
              sx={{
                height: 400,
                display: "flex",
                mb: { xs: 3, sm: 0 },
              }}
            >
              <img
                src={words}
                alt="image"
                style={{
                  width: "60%",
                  transform: "rotate(-5deg)",
                  zIndex: "-1",
                  boxShadow: " 0px 8px 10px -5px rgba(0,0,0,1)",
                }}
              />
              <img
                src={functions}
                alt="image"
                style={{
                  width: "60%",
                  transform: "rotate(5deg)",
                  boxShadow: " 0px 8px 10px -5px rgba(0,0,0,1)",
                }}
              />
            </Box>
          ) : (
            <Box
              sx={{
                height: 400,
                display: "flex",
                mb: { xs: 3, sm: 0 },
              }}
            >
              <img
                src={stats}
                alt="image"
                style={{
                  width: "60%",
                  transform: "rotate(-5deg)",
                  zIndex: "-1",
                  boxShadow: " 0px 8px 10px -5px rgba(0,0,0,1)",
                }}
              />
              <img
                src={interfaces}
                alt="image"
                style={{
                  width: "60%",
                  boxShadow: " 0px 8px 10px -5px rgba(0,0,0,1)",
                }}
              />
            </Box>
          )}
        </Grid>
      )}
      {type === "ltr" ? (
        <Grid
          xs={12}
          md={6}
          item
          sx={{
            display: "flex",
            mb: { xs: 3, sm: 0 },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {title === "Miły przyjemny interface" ? (
            <Box
              sx={{
                height: 400,
                display: "flex",
                mb: { xs: 3, sm: 0 },
              }}
            >
              <img
                src={translate}
                alt="image"
                style={{
                  width: "60%",
                  transform: "rotate(-5deg)",
                  zIndex: "-1",
                  boxShadow: " 0px 8px 10px -5px rgba(0,0,0,1)",
                }}
              />
              <img
                src={interfaces}
                alt="image"
                style={{
                  width: "60%",
                  boxShadow: " 0px 8px 10px -5px rgba(0,0,0,1)",
                }}
              />
            </Box>
          ) : title === "Szeroki wybór trybów nauki" ? (
            <Box
              sx={{
                height: 400,
                display: "flex",
                mb: { xs: 3, sm: 0 },
              }}
            >
              <img
                src={words}
                alt="image"
                style={{
                  width: "60%",
                  transform: "rotate(-5deg)",
                  zIndex: "-1",
                  boxShadow: " 0px 8px 10px -5px rgba(0,0,0,1)",
                }}
              />
              <img
                src={functions}
                alt="image"
                style={{
                  width: "60%",
                  boxShadow: " 0px 8px 10px -5px rgba(0,0,0,1)",
                }}
              />
            </Box>
          ) : (
            <Box
              sx={{
                height: 400,
                display: "flex",
                mb: { xs: 3, sm: 0 },
              }}
            >
              <img
                src={stats}
                alt="image"
                style={{
                  width: "60%",
                  transform: "rotate(-5deg)",
                  zIndex: "-1",
                  boxShadow: " 0px 8px 10px -5px rgba(0,0,0,1)",
                }}
              />
              <img
                src={statistics}
                alt="image"
                style={{
                  width: "60%",
                  boxShadow: " 0px 8px 10px -5px rgba(0,0,0,1)",
                }}
              />
            </Box>
          )}
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
