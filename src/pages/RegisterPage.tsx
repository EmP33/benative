import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
// Redux Store
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { createUser } from "../store/user-slice";
import { uiActions } from "../store/ui-slice";
// Components
import {
  Grid,
  Typography,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
// Icons
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// Styles
import { GoBackButton, CSSTextField } from "../components/UI/Components.style";

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  // Redux Store
  const isError = useAppSelector((state) => state.ui.isError);
  const errorMessage = useAppSelector((state) => state.ui.errorMessage);
  // Local State
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmationRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Functions
  const toggleShowPasswordHandler = () => setShowPassword((prev) => !prev);
  const toggleShowConfirmPasswordHandler = () =>
    setShowConfirmPassword((prev) => !prev);

  const createUserHandler = (e: React.FormEvent) => {
    e.preventDefault();
    // User create validation
    if (
      !emailRef.current ||
      !passwordRef.current ||
      !passwordConfirmationRef.current
    ) {
      return dispatch(uiActions.setError("Coś poszło nie tak.."));
    }
    if (
      emailRef.current.value === "" ||
      passwordRef.current.value === "" ||
      passwordConfirmationRef.current.value === ""
    ) {
      return dispatch(uiActions.setError("Żadne pole nie może być puste"));
    }
    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return dispatch(uiActions.setError("Hasła nie są takie same"));
    }
    if (
      passwordRef.current.value.length < 8 ||
      passwordConfirmationRef.current.value.length < 8
    ) {
      return dispatch(
        uiActions.setError("Hasło musi być dłuższe lub równe 8 liter")
      );
    }
    // Creating User
    dispatch(createUser(emailRef.current.value, passwordRef.current.value));
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
          Stwórz konto
        </Typography>
        <form onSubmit={createUserHandler} autoComplete="off" autoSave="off">
          <Grid container spacing={2} sx={{ mt: 4 }}>
            <Grid item xs={12}>
              <CSSTextField
                error={!errorMessage.includes("Hasło") && isError}
                helperText={!errorMessage.includes("Hasło") && errorMessage}
                onFocus={() => dispatch(uiActions.removeError())}
                type="email"
                inputRef={emailRef}
                label="Email"
                variant="outlined"
                color="success"
                sx={{ width: "100%", input: { color: "var(--color-grey-1)" } }}
                inputProps={{
                  autoComplete: "off",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <CSSTextField
                error={isError}
                helperText={errorMessage}
                onFocus={() => dispatch(uiActions.removeError())}
                inputRef={passwordRef}
                label="Utwórz Hasło"
                variant="outlined"
                color="success"
                type={showPassword ? "text" : "password"}
                sx={{ width: "100%", input: { color: "var(--color-grey-1)" } }}
                inputProps={{
                  autoComplete: "off",
                }}
                InputProps={{
                  // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={toggleShowPasswordHandler}
                        onMouseDown={toggleShowPasswordHandler}
                        sx={{ color: "var(--color-grey-1)" }}
                      >
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <CSSTextField
                error={isError}
                helperText={errorMessage}
                onFocus={() => dispatch(uiActions.removeError())}
                inputRef={passwordConfirmationRef}
                label="Potwierdź Hasło"
                variant="outlined"
                color="success"
                type={showConfirmPassword ? "text" : "password"}
                sx={{ width: "100%", input: { color: "var(--color-grey-1)" } }}
                inputProps={{
                  autoComplete: "off",
                }}
                InputProps={{
                  // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={toggleShowConfirmPasswordHandler}
                        onMouseDown={toggleShowConfirmPasswordHandler}
                        sx={{ color: "var(--color-grey-1)" }}
                      >
                        {showConfirmPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                size="large"
                variant="contained"
                sx={{ width: "100%", mt: 2 }}
              >
                Stwórz konto
              </Button>
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

export default RegisterPage;
