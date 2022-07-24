import React from "react";
// Redux Store
import { useAppSelector } from "../../../lib/hooks";
// Components
import { Box, Typography } from "@mui/material";
// Icons
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PublicIcon from "@mui/icons-material/Public";
import PsychologyIcon from "@mui/icons-material/Psychology";
// Types
import { WordType } from "../../../data.types";

const ProfileStatistics = () => {
  const data = useAppSelector((state) => state.data.data);

  console.log(
    // @ts-ignore
    Object.values(data?.data?.categories)
      .find((cat: any) => cat.title === "Sytuacje")
      .lessons.map((lesson: any) => lesson.words)
      .flat()
      .filter((lesson: any) => lesson.status === "well").length
  );

  return (
    <Box
      sx={{
        background: "var(--color-primary)",
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        p: 1,
        borderRadius: 5,
        ml: { xs: 2, sm: 4, md: 5, lg: 1 },
        mr: { xs: 2, sm: 4, md: 5, lg: 1 },
        mt: 3,
      }}
    >
      <Box
        sx={{
          borderRight: "1px solid rgba(255,255,255,.2)",
        }}
      >
        <StarBorderIcon />
        <Typography variant="body1" sx={{ fontSize: 14 }}>
          Punkty
        </Typography>
        <Typography variant="body2">
          {data?.data?.points ? data?.data?.points : 0}
        </Typography>
      </Box>
      <Box sx={{ borderRight: "1px solid rgba(255,255,255,.2)" }}>
        <PublicIcon />
        <Typography variant="body1" sx={{ fontSize: 14 }}>
          Ranking
        </Typography>
        <Typography variant="body2">#0</Typography>
      </Box>
      <Box>
        <PsychologyIcon />
        <Typography variant="body1" sx={{ fontSize: 14 }}>
          Słowa
        </Typography>
        <Typography variant="body2">
          {data?.data?.words
            ? data?.data?.words
                .filter((word: WordType) => word.status === "well")
                .filter((word: WordType) => word.known === true).length ||
              data?.data?.categories
              ? data?.data?.words
                  .filter((word: WordType) => word.status === "well")
                  .filter((word: WordType) => word.known === true).length +
                // @ts-ignore
                Object.values(
                  // @ts-ignore
                  Object.values(data?.data?.categories).find(
                    (cat: any) => cat.title === "1000 słów"
                  ).words
                ).filter((word: any) => word.status === "well").length +
                // @ts-ignore
                Object.values(data?.data?.categories)
                  .find((cat: any) => cat.title === "Sytuacje")
                  .lessons.map((lesson: any) => lesson.words)
                  .flat()
                  .filter((lesson: any) => lesson.status === "well").length
              : 0
            : 0}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProfileStatistics;
