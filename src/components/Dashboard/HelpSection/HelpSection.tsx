import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
// Components
import { Box, SwipeableDrawer, Button, Fab } from "@mui/material";
import HelpItem from "./HelpItem";
// Icons
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
// Styles
import { DragButton } from "./HelpSection.styles";

const HelpSection = () => {
  const theme = useTheme();
  const location = useLocation();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  // Local State
  const [state, setState] = useState(false);
  console.log(location.pathname);

  // Functions
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState(open);
    };

  const HelpPart = (
    <Box>
      <Box>
        <HelpItem
          title="Ustaw nazwę użytkownika"
          description=" Ustaw nazwę jaka zostanie przypisana dla twojego konta. Możesz to zrobić
tutaj:"
          linkTitle="Ustawienia Konta"
          link="/dashboard/user-settings"
        />
        <HelpItem
          title="Dowiedz się więcej.."
          description="Zobacz jakie funkcjonalności oferuje dla Ciebie BeNative. Tutorial dostępny już teraz:"
          linkTitle="Tutorial"
          link="settings"
        />
        <HelpItem
          title="Pamiętaj o regularnym powtarzaniu!"
          description="Staraj regularanie korzystać z zakładki powtórz, aby na bierząco powtarzać uczone przec Ciebie słownictwo oraz gramatykę."
          linkTitle="Powtórz"
          link="/dashboard/repeat"
        />
        <HelpItem
          title="Nowy tryb!"
          description="Dodaliśmy nowy tryb gry: Memories. Możesz go znaleźć w zakładce z kategoriami lub też klikając poniższy link."
          linkTitle="Memories"
          link="/dashboard/categories"
        />
      </Box>
    </Box>
  );

  return (
    <>
      {matches ? (
        <Box>{HelpPart}</Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {location.pathname === "/dashboard" && (
            <Fab
              color="primary"
              aria-label="tips"
              sx={{
                position: "absolute",
                right: "5vw",
                bottom: "8vh",
                opacity: 0.9,
                display: { xs: "flex", sm: "none" },
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={toggleDrawer(true)}
            >
              <EmojiObjectsIcon sx={{ fontSize: 30 }} />
            </Fab>
          )}
          <Button
            sx={{
              transform: "rotate(90deg)",
              display: { xs: "none", sm: "block", md: "none" },
            }}
            size="large"
            onClick={toggleDrawer(true)}
          >
            Open Tips
          </Button>
          <SwipeableDrawer
            anchor="right"
            open={state}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            <Box
              sx={{
                maxWidth: "90vw",
                minHeight: "100vh",
                width: "auto",
                background: "var(--color-base-light)",
                display: "flex",
                overflow: "auto",
                "&::-webkit-scrollbar": { display: "none" },
              }}
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <DragButton />
              {HelpPart}
            </Box>
          </SwipeableDrawer>
        </Box>
      )}
    </>
  );
};

export default React.memo(HelpSection);
