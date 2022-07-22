import React, { useState } from "react";
import { useAppSelector } from "../../../../lib/hooks";
// Components
import { Tabs, Tab, Typography, Box } from "@mui/material";
import Badge from "./Badge";
import Statistic from "./Statistic";
// Types
import { BadgeType } from "../../../../data.types";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabSection() {
  const [value, setValue] = useState(0);
  const data = useAppSelector((state) => state.data.data);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        mt: 2,
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="user navigation"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Szczegóły" {...a11yProps(0)} sx={{ color: "#4f525d" }} />
          <Tab label="Statystyki" {...a11yProps(1)} sx={{ color: "#4f525d" }} />
          <Tab label="Odznaki" {...a11yProps(2)} sx={{ color: "#4f525d" }} />
        </Tabs>
      </Box>
      {value === 0 && <Box sx={{ mt: 2 }}>Szczegóły</Box>}
      {value === 1 && (
        <Box sx={{ mt: 2, mb: 5 }}>
          <Box sx={{ mt: 2 }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr",
                rowGap: 3,
                mt: 4,
              }}
            >
              {Object.values(data?.data?.statistics).map((stat: any) => (
                <Statistic
                  title={stat.title}
                  value={stat.value}
                  key={stat.id}
                />
              ))}
            </Box>
          </Box>
        </Box>
      )}
      {value === 2 && (
        <Box sx={{ mt: 2, mb: 5 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Odznaki
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              rowGap: 2,
            }}
          >
            {Object.values(data?.data?.badges)
              .sort((a: any, b: any) => Number(b.finished) - Number(a.finished))
              .map((badge: any) => (
                <Badge
                  title={badge.title}
                  description={badge.description}
                  finished={badge.finished}
                  key={badge.id}
                />
              ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
