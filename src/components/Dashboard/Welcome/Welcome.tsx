import React from "react";
// Redux Store
import { useAppSelector } from "../../../lib/hooks";
// Components
import {
  Box,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import LessonItem from "../LessonItem/LessonItem";
// Icons
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SchoolIcon from "@mui/icons-material/School";
import RepeatIcon from "@mui/icons-material/Repeat";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from "@mui/icons-material/Person";

const Welcome = () => {
  const user = useAppSelector((state) => state.user.user);
  const currentHour = new Date().getHours();
  const [value, setValue] = React.useState(0);

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          alignItems: "center",
          background: "var(--color-base-dark)",
          p: 2,
          pt: 3,
          borderRadius: "0 0 30px 30px",
        }}
      >
        <Box>
          <Typography
            variant="body2"
            sx={{
              display: "flex",
              alignItems: "center",
              columnGap: 1,
              textTransform: "uppercase",
              color:
                currentHour <= 24 && currentHour >= 20
                  ? "#3A5BA0"
                  : currentHour < 20 && currentHour >= 12
                  ? "#FFA500"
                  : currentHour < 12 && currentHour >= 6
                  ? "var(--color-tertiary)"
                  : currentHour < 6
                  ? "#3A5BA0"
                  : "var(--color-tertiary)",
              fontSize: 12,
            }}
          >
            <WbSunnyIcon sx={{ fontSize: 18 }} />
            {currentHour <= 24 && currentHour >= 20
              ? "Spokojnej Nocy!"
              : currentHour < 20 && currentHour >= 12
              ? "Miłego Popołudnia!"
              : currentHour < 12 && currentHour >= 6
              ? "Dzień Dobry!"
              : currentHour < 6
              ? "Spokojnej Nocy!"
              : "Witaj!"}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 18 }}>
            {user.displayName ? user.displayName : user.email}
          </Typography>
        </Box>
        <AccountCircleIcon sx={{ fontSize: 40, justifySelf: "flex-end" }} />
        <Typography
          variant="h5"
          sx={{ fontSize: 24, gridColumn: "1/-1", mt: 5, pb: 3 }}
        >
          Kontynuuj naukę angielskiego!
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          maxHeight: "72vh",
          p: 2,
          overflow: "auto",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <Typography variant="h6" sx={{ mt: 1 }}>
          Poziom początkujący: A1 - 50%
        </Typography>
        <LessonItem title="Dzieła sztuki aftrykańskiej" status={100} />
        <LessonItem title="Marokańskie pociągi" status={100} />
        <LessonItem title="K-Pop" status={100} />
        <LessonItem title="Nowy film Barrego" status={100} />
        <LessonItem title="Niebezpieczny owoc" status={75} />
        <LessonItem title="Kondolencje" status={15} />
        <LessonItem title="Gekony" status={0} />
        <LessonItem title="Kondolencje cz.2" status={0} />
      </Box>
      <Box sx={{ width: "100%", position: "absolute", bottom: 0 }}>
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          sx={{
            background: "var(--color-base-dark)",
          }}
        >
          <BottomNavigationAction
            sx={{ color: "var(--color-white)" }}
            label="Nauka"
            icon={<SchoolIcon />}
          />
          <BottomNavigationAction
            sx={{ color: "var(--color-white)" }}
            label="Powtórz"
            icon={<RepeatIcon />}
          />
          <BottomNavigationAction
            sx={{ color: "var(--color-white)" }}
            label="Kategorie"
            icon={<CategoryIcon />}
          />
          <BottomNavigationAction
            sx={{ color: "var(--color-white)" }}
            label="Profil"
            icon={<PersonIcon />}
          />
        </BottomNavigation>
      </Box>
    </>
  );
};

export default Welcome;
