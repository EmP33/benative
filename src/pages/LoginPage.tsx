import React, { useRef } from "react";
import { Link } from "react-router-dom";
// Redux store
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { loginUser } from "../store/user-slice";
import { uiActions } from "../store/ui-slice";
// Components
import { Grid, Typography, Button } from "@mui/material";
// Icons
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
// Styles
import { GoBackButton, CSSTextField } from "../components/UI/Components.style";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const isError = useAppSelector((state) => state.ui.isError);
  const errorMessage = useAppSelector((state) => state.ui.errorMessage);
  const isLoading = useAppSelector((state) => state.ui.isLoading);

  const loginUserHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(uiActions.toggleIsLoading());
    // Validation
    if (!emailRef.current || !passwordRef.current) {
      return dispatch(uiActions.setError("Coś poszło nie tak.."));
    }
    if (emailRef.current.value === "" || passwordRef.current.value === "") {
      return dispatch(uiActions.setError("Żadne pole nie może być puste"));
    }
    if (passwordRef.current.value.length < 8) {
      return dispatch(
        uiActions.setError("Hasło musi być dłuższe lub równe 8 liter")
      );
    }
    // Login User functionality
    dispatch(loginUser(emailRef.current.value, passwordRef.current.value));
  };

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      <Grid
        item
        xs={0}
        sm={2}
        md={3}
        lg={4}
        sx={{ background: "var(--color-base-light)" }}
      ></Grid>
      <Grid item xs={12} sm={8} md={6} lg={4} sx={{ p: 3, pt: 8 }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <GoBackButton>
            <KeyboardArrowLeftIcon />
          </GoBackButton>
        </Link>

        <Typography variant="h4" sx={{ mt: 4 }}>
          Zaloguj się
        </Typography>
        <form onSubmit={loginUserHandler} autoComplete="off" autoSave="off">
          <Grid container spacing={2} sx={{ mt: 4 }}>
            <Grid item xs={12}>
              <CSSTextField
                error={!errorMessage.includes("Hasło") && isError}
                helperText={!errorMessage.includes("Hasło") && errorMessage}
                onFocus={() => dispatch(uiActions.removeError())}
                inputRef={emailRef}
                type="email"
                label="Email"
                variant="outlined"
                color="success"
                sx={{ width: "100%", input: { color: "#86868f" } }}
              />
            </Grid>
            <Grid item xs={12}>
              <CSSTextField
                error={isError}
                helperText={errorMessage}
                onFocus={() => dispatch(uiActions.removeError())}
                inputRef={passwordRef}
                type="password"
                label="Utwórz hasło"
                variant="outlined"
                color="success"
                sx={{ width: "100%", input: { color: "#86868f" } }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                size="large"
                type="submit"
                variant="contained"
                sx={{ width: "100%", mt: 2 }}
              >
                {isLoading ? "Loading..." : "Zaloguj"}
              </Button>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Button sx={{ color: "#86868f" }}>Zapomniałeś hasła?</Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <Grid
        item
        xs={0}
        sm={2}
        md={3}
        lg={4}
        sx={{ background: "var(--color-base-light)" }}
      ></Grid>
    </Grid>
  );
};

export default LoginPage;
