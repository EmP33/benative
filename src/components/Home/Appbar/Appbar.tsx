import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
// Images
import benative from "../../../assets/benative-white.png";
// Components
import { Box, Button, SwipeableDrawer, useMediaQuery } from "@mui/material";
// Icons
import MenuIcon from "@mui/icons-material/Menu";

type Anchor = "top" | "left" | "bottom" | "right";

const Appbar = () => {
  const theme = useTheme();
  /* It's a hook that returns a boolean value. If the screen is smaller than the breakpoint, it returns
  true. */
  const phone = useMediaQuery(theme.breakpoints.down("sm"));
  /* Setting the state of the drawer. */
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  /**
   * If the event is a keydown event and the key is Tab or Shift, return; otherwise, set the state to
   * the new state.
   * @param {Anchor} anchor - Anchor
   * @param {boolean} open - boolean
   * @returns A function that takes an event and returns nothing.
   */
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      /* It's checking if the event is a keydown event and the key is Tab or Shift, if it is, it
      returns; otherwise, it sets the state to the new state. */
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      /* It's setting the state of the drawer. */
      setState({ ...state, [anchor]: open });
    };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 1,
        boxShadow: " 0px 1px 3px 0px rgba(46, 47, 50, 1)",
      }}
    >
      <img
        src={benative}
        alt="logo"
        style={{ width: phone ? "150px" : "200px" }}
      />
      {phone ? (
        <>
          <Button
            onClick={toggleDrawer("bottom", true)}
            size="large"
            sx={{ color: "#fff" }}
          >
            <MenuIcon sx={{ fontSize: 34 }} />
          </Button>
          <SwipeableDrawer
            anchor={"bottom"}
            open={state["bottom"]}
            onClose={toggleDrawer("bottom", false)}
            onOpen={toggleDrawer("bottom", true)}
          >
            <Box
              sx={{
                background: "var(--color-base)",
                minHeight: 200,
                height: "auto",
                display: "flex",
                flexDirection: "column",
                rowGap: 3,
                p: 4,
              }}
            >
              <Link to="/register" style={{ textDecoration: "none" }}>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: "var(--color-white)",
                    color: "var(--color-white)",
                    width: "100%",

                    "&:hover,&:active": {
                      borderColor: "#ccc",
                      color: "#ccc",
                    },
                  }}
                >
                  Rejestracja
                </Button>
              </Link>
              <Link to="login" style={{ textDecoration: "none" }}>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  sx={{ width: "100%" }}
                >
                  Logowanie
                </Button>
              </Link>
            </Box>
          </SwipeableDrawer>
        </>
      ) : (
        <Box sx={{ display: "flex", columnGap: 2 }}>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              sx={{
                borderColor: "var(--color-white)",
                color: "var(--color-white)",

                "&:hover,&:active": {
                  borderColor: "#ccc",
                  color: "#ccc",
                },
              }}
            >
              Rejestracja
            </Button>
          </Link>
          <Link to="login" style={{ textDecoration: "none" }}>
            <Button color="primary" variant="contained">
              Logowanie
            </Button>
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default Appbar;
