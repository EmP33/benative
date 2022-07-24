import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../lib/hooks";
// Components
import { Box, Typography, Button } from "@mui/material";
import SectionHeader from "../../UI/SectionHeader";
import WordElement from "../../Dashboard/RepeatSection/WordElement";
import { SituationLessonType, SituationWordType } from "../../../data.types";
// Icons
import EditIcon from "@mui/icons-material/Edit";
import SchoolIcon from "@mui/icons-material/School";
import BoltIcon from "@mui/icons-material/Bolt";
import DeleteIcon from "@mui/icons-material/Delete";
import DashboardIcon from "@mui/icons-material/Dashboard";

const SituationPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const data = useAppSelector((state) => state.data.data);
  const [lesson, setLesson] = useState<SituationLessonType | null>(null);
  useEffect(() => {
    if (data?.data?.categories) {
      setLesson(
        // @ts-ignore
        Object.values(data?.data?.categories).find(
          (cat: any) => cat.title === "Sytuacje"
        ).lessons[params.lessonID]
      );
    }
  }, [data?.data?.categories, params.lessonID]);

  return (
    <Box>
      <SectionHeader />
      <Typography
        sx={{ ml: 2, mr: 2, mb: 1, textAlign: "center" }}
        variant="h6"
      >
        {lesson?.title}
      </Typography>
      <Typography
        sx={{ ml: 2, mr: 2, textAlign: "center", color: "#aaa" }}
        variant="body1"
      >
        {lesson?.words.length} pojeć
      </Typography>
      <Box
        sx={{
          mt: 2,
          p: 2,
          display: "grid",
          width: "100%",
          justifyContent: "center",
          gridTemplateColumns: "repeat(2,1fr)",
          columnGap: 1,
          rowGap: 1,
        }}
      >
        <Button
          variant="contained"
          size="large"
          //   disabled={!currentSet?.words}
          startIcon={<SchoolIcon />}
          onClick={() =>
            navigate(
              `/dashboard/categories/situations/${params.lessonID}/learn-game`
            )
          }
        >
          Nauka
        </Button>
        <Button
          variant="contained"
          size="large"
          startIcon={<BoltIcon />}
          // disabled={!currentSet?.words}
          onClick={() =>
            navigate(
              `/dashboard/categories/situations/${params.lessonID}/flash-game`
            )
          }
        >
          Fiszki
        </Button>
      </Box>
      <Box sx={{ ml: 2, mr: 2 }}>
        <Typography variant="body1" sx={{ fontSize: 22, mb: 1 }}>
          Postęp w nauce:
        </Typography>
        {lesson
          ? lesson.words.map((word: SituationWordType, i: number) => (
              <Box key={i}>
                {typeof word.word === "string" ? (
                  <WordElement
                    status={word.status}
                    word={word.word}
                    translation={word.translation}
                  />
                ) : (
                  <WordElement
                    status={word.status}
                    word={word.word[0]}
                    translation={word.translation}
                  />
                )}
              </Box>
            ))
          : ""}
      </Box>
    </Box>
  );
};

export default SituationPage;
