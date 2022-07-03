import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Redux Store
import { useAppSelector } from "../../../lib/hooks";
// Components
import { Box, Typography, Skeleton } from "@mui/material";

import LessonLevel from "./LessonLevel";
// Icons
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import {
  AvatarTwo,
  AvatarFive,
  AvatarSix,
  AvatarFour,
  AvatarOne,
  AvatarThree,
} from "../../../assets/avatars";

const LearnSection = () => {
  const navigate = useNavigate();
  /* Getting the current hour from the user's computer. */
  const currentHour = new Date().getHours();
  // Redux Store
  const user = useAppSelector((state) => state.user.user);
  const data = useAppSelector((state) => state.data.data);

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
        <Box
          onClick={() => navigate("/dashboard/profile")}
          sx={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            overflow: "hidden",
            justifySelf: "flex-end",
            cursor: "pointer",
          }}
        >
          {user.photoURL === "AvatarSix" ? (
            <AvatarSix />
          ) : user.photoURL === "AvatarFive" ? (
            <AvatarFive />
          ) : user.photoURL === "AvatarFour" ? (
            <AvatarFour />
          ) : user.photoURL === "AvatarThree" ? (
            <AvatarThree />
          ) : user.photoURL === "AvatarTwo" ? (
            <AvatarTwo />
          ) : user.photoURL === "AvatarOne" ? (
            <AvatarOne />
          ) : (
            <AvatarOne />
          )}
        </Box>
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
        {data && data?.id ? (
          Object.entries(data?.data?.learning).map(
            ([categoryName, lessons]) => (
              <LessonLevel
                key={categoryName}
                category={categoryName}
                lessons={Object.values(lessons as {})}
              />
            )
          )
        ) : (
          <>
            <Typography variant="h2">
              <Skeleton sx={{ background: "var(--color-base-light)" }} />
            </Typography>
            {[1, 2, 3, 4, 5, 6, 7].map((numb) => (
              <Skeleton
                key={numb}
                sx={{
                  borderRadius: 5,
                  mb: 2,
                  background: "var(--color-base-light)",
                }}
                variant="rectangular"
                width="100%"
                height={70}
              />
            ))}
          </>
        )}
      </Box>
    </>
  );
};

export default LearnSection;
