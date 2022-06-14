import * as React from "react";

// Components
import { Tabs, Tab, Typography, Box } from "@mui/material";
import Badge from "./Badge";

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
  const [value, setValue] = React.useState(0);

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
      {value === 1 && <Box sx={{ mt: 2 }}>Statystyki</Box>}
      {value === 2 && (
        <Box sx={{ mt: 2 }}>
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
            <Badge />
            <Badge />
            <Badge />
            <Badge />
            <Badge />
            <Badge />
            <Badge />
            <Badge />
            <Badge />
            <Badge />
          </Box>
        </Box>
      )}
    </Box>
  );
}
