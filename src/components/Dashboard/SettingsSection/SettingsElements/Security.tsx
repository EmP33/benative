import React, { useRef } from "react";
// Redux Store
import { useAppSelector, useAppDispatch } from "../../../../lib/hooks";
import { uiActions } from "../../../../store/ui-slice";
import { updateUserPassword } from "../../../../store/user-slice";
// Components
import { Grid, Button, Typography, Box } from "@mui/material";
import { CSSTextField } from "../../../UI/Components.style";
import SectionHeader from "../../../UI/SectionHeader";
// Icons
import { Ring } from "@uiball/loaders";
import CheckIcon from "@mui/icons-material/Check";

const Security = () => {
  const dispatch = useAppDispatch();
  const emailRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const repeatPasswordRef = useRef<HTMLInputElement>(null);
  const user = useAppSelector((state) => state.user.user);
  const isError = useAppSelector((state) => state.ui.isError);
  const errorMessage = useAppSelector((state) => state.ui.errorMessage);
  const isLoading = useAppSelector((state) => state.ui.isLoading);
  const dataStatus = useAppSelector((state) => state.user.dataStatus);

  const changePasswordHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !emailRef.current ||
      !newPasswordRef.current ||
      !repeatPasswordRef.current
    ) {
      return dispatch(uiActions.setError("Coś poszło nie tak.."));
    }
    if (
      emailRef.current.value === "" ||
      newPasswordRef.current.value === "" ||
      repeatPasswordRef.current.value === ""
    ) {
      return dispatch(uiActions.setError("Żadne z pól nie może być puste"));
    }
    if (emailRef.current.value !== user.email) {
      return dispatch(uiActions.setError("Błędy adres email"));
    }
    if (newPasswordRef.current.value !== repeatPasswordRef.current.value) {
      return dispatch(uiActions.setError("Hasła nie są takie same"));
    }
    if (
      newPasswordRef.current.value.length < 8 &&
      repeatPasswordRef.current.value.length < 8
    ) {
      return dispatch(
        uiActions.setError("Hasło musi być dłuższe lub równe 8 liter")
      );
    }
    dispatch(uiActions.toggleIsLoading());
    dispatch(updateUserPassword(newPasswordRef.current.value));
  };

  return (
    <>
      <SectionHeader title="Ustawienia Konta" />
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 900 }}>
          Zmień Hasło
        </Typography>
        <form
          onSubmit={changePasswordHandler}
          autoComplete="off"
          autoSave="off"
        >
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12}>
              <CSSTextField
                error={
                  !errorMessage.includes("Hasła") &&
                  !errorMessage.includes("Hasło") &&
                  isError
                }
                helperText={
                  !errorMessage.includes("Hasła") &&
                  !errorMessage.includes("Hasło") &&
                  errorMessage
                }
                onFocus={() => dispatch(uiActions.removeError())}
                type="email"
                inputRef={emailRef}
                label="Adres Email"
                variant="outlined"
                color="success"
                sx={{ width: "100%", input: { color: "#86868f" } }}
              />
            </Grid>
            <Grid item xs={12}>
              <CSSTextField
                error={!errorMessage.includes("email") && isError}
                helperText={!errorMessage.includes("email") && errorMessage}
                onFocus={() => dispatch(uiActions.removeError())}
                inputRef={newPasswordRef}
                label="Nowe Hasło"
                variant="outlined"
                color="success"
                type="password"
                sx={{ width: "100%", input: { color: "#86868f" } }}
              />
            </Grid>
            <Grid item xs={12}>
              <CSSTextField
                error={!errorMessage.includes("email") && isError}
                helperText={!errorMessage.includes("email") && errorMessage}
                onFocus={() => dispatch(uiActions.removeError())}
                inputRef={repeatPasswordRef}
                label="Powtórz Nowe Hasło"
                variant="outlined"
                color="success"
                type="password"
                sx={{ width: "100%", input: { color: "#86868f" } }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                size="large"
                variant="contained"
                sx={{ width: "100%", mt: 2 }}
              >
                {dataStatus.status ? (
                  <CheckIcon sx={{ fontSize: 27 }} />
                ) : isLoading ? (
                  <Ring size={27} lineWeight={5} speed={2} color="white" />
                ) : (
                  "Zmień"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default Security;
