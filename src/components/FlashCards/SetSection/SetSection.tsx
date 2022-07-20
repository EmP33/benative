import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Redux Store
import { useAppSelector } from "../../../lib/hooks";
// Components
import { Box, Typography, IconButton, Button } from "@mui/material";
import SetWordsSwiper from "./SetWordsSwiper";
import SectionHeader from "../../UI/SectionHeader";
import DeleteSetDialog from "./DeleteSetDialog";
// Icons
import EditIcon from "@mui/icons-material/Edit";
import SchoolIcon from "@mui/icons-material/School";
import BoltIcon from "@mui/icons-material/Bolt";
import DeleteIcon from "@mui/icons-material/Delete";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WordElement from "../../Dashboard/RepeatSection/WordElement";
// Types
import { FlashCardWordType } from "../../../data.types";

const SetSection = () => {
  const params = useParams();
  const navigate = useNavigate();
  const data = useAppSelector((state) => state.data.data);
  const user = useAppSelector((state) => state.user.user);
  const [currentSet, setCurrentSet] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const closeDeleteDialogHandler = useCallback(() => {
    setDeleteDialogOpen(false);
  }, []);
  const openDeleteDialogHandler = () => {
    setDeleteDialogOpen(true);
  };

  console.log(currentSet);

  useEffect(() => {
    if (data?.data?.categories) {
      setCurrentSet(
        // @ts-ignore
        Object.values(
          // @ts-ignore
          Object.values(data.data.categories).find(
            (cat: any) => cat.title === "Fiszki"
          ).sets
        ).find((set: any) => set.id === params.setID)
      );
    }
  }, [data]);

  return (
    <Box
      sx={{
        overflow: "auto",
        height: "92vh",
        "&::-webkit-scrollbar ": {
          display: "none",
        },
      }}
    >
      <SectionHeader />
      <Box sx={{ pl: 1 }}>
        <SetWordsSwiper words={currentSet?.words} />
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr max-content max-content",
          columnGap: 1,
          pr: 2,
          pl: 2,
        }}
      >
        <Box>
          <Typography variant="h6">{currentSet?.title}</Typography>
          <Typography variant="body1" sx={{ color: "#aaa" }}>
            {user.displayName ? user.displayName : user.email} |{" "}
            {currentSet?.words ? currentSet?.words.length : "0"}{" "}
            {currentSet?.words
              ? currentSet?.words.length === 1
                ? "pojęcie"
                : currentSet?.words.length > 1 && currentSet?.words.length < 5
                ? "pojęcia"
                : "pojęć"
              : "pojęć"}
          </Typography>
        </Box>
        <IconButton
          aria-label="edit"
          color="primary"
          onClick={() =>
            navigate(
              `/dashboard/categories/flash-cards/set/${params.setID}/edit`
            )
          }
        >
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          color="error"
          onClick={openDeleteDialogHandler}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
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
          disabled={!currentSet?.words}
          startIcon={<SchoolIcon />}
          onClick={() =>
            navigate(
              `/dashboard/categories/flash-cards/set/${params.setID}/learn-game`
            )
          }
        >
          Nauka
        </Button>
        <Button
          variant="contained"
          size="large"
          startIcon={<BoltIcon />}
          disabled={!currentSet?.words}
          onClick={() =>
            navigate(
              `/dashboard/categories/flash-cards/set/${params.setID}/flash-game`
            )
          }
        >
          Fiszki
        </Button>
        <Button
          sx={{ gridColumn: "1/-1" }}
          variant="contained"
          size="large"
          startIcon={<DashboardIcon />}
          disabled={!currentSet?.words}
          onClick={() =>
            navigate(
              `/dashboard/categories/flash-cards/set/${params.setID}/memories`
            )
          }
        >
          Memories
        </Button>
      </Box>
      <Box sx={{ mt: 1, pl: 2 }}>
        <Typography variant="body1" sx={{ fontSize: 18, mb: 1 }}>
          Twój postęp w nauce:
        </Typography>
        {currentSet?.words
          ? currentSet.words.map((word: FlashCardWordType, i: number) => (
              <WordElement
                key={i}
                status={word.status}
                word={word.concept}
                translation={word.definition}
              />
            ))
          : ""}
      </Box>
      <DeleteSetDialog
        handleClose={closeDeleteDialogHandler}
        open={deleteDialogOpen}
      />
    </Box>
  );
};

export default SetSection;
