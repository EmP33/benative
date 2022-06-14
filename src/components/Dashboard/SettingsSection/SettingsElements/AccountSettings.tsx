import React, { useRef, useState } from "react";
// Redux Store
import { useAppDispatch, useAppSelector } from "../../../../lib/hooks";
import {
  updateUsername,
  userActions,
  updateUserEmail,
} from "../../../../store/user-slice";
import { uiActions } from "../../../../store/ui-slice";
// Components
import SectionHeader from "../../../UI/SectionHeader";
import { CSSTextField } from "../../../UI/Components.style";
import { Typography, Grid, Button } from "@mui/material";
// Icons
import { Ring } from "@uiball/loaders";
import CheckIcon from "@mui/icons-material/Check";

const AccountSettings = () => {
  const [formType, setFormType] = useState<string>("");
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const isError = useAppSelector((state) => state.ui.isError);
  const errorMessage = useAppSelector((state) => state.ui.errorMessage);
  const isLoading = useAppSelector((state) => state.ui.isLoading);
  const dataStatus = useAppSelector((state) => state.user.dataStatus);
  console.log(isLoading);

  const changeUsernameHandler = (e: React.FormEvent) => {
    setFormType("username");
    dispatch(userActions.resetDataStatus());
    e.preventDefault();
    if (!usernameRef.current) {
      return dispatch(uiActions.setError("Coś poszło nie tak.."));
    }
    if (usernameRef.current.value === "") {
      return dispatch(
        uiActions.setError("Nazwa użytkownika nie może być pusta")
      );
    }
    dispatch(uiActions.toggleIsLoading());
    dispatch(updateUsername(usernameRef.current.value));
  };

  const changeEmailHandler = (e: React.FormEvent) => {
    setFormType("email");
    dispatch(userActions.resetDataStatus());
    e.preventDefault();
    if (!emailRef.current) {
      return dispatch(uiActions.setError("Coś poszło nie tak.."));
    }
    if (emailRef.current.value === "") {
      return dispatch(uiActions.setError("Email nie może być pusty."));
    }
    if (!emailRef.current.value.includes("@")) {
      return dispatch(uiActions.setError("Email nie jest poprawny."));
    }
    dispatch(uiActions.toggleIsLoading());
    dispatch(updateUserEmail(emailRef.current.value));
    console.log("eee");
  };
  return (
    <>
      <SectionHeader title="Ustawienia Konta" />
      <form onSubmit={changeUsernameHandler}>
        <Grid container spacing={2} sx={{ p: 2, mb: 4 }}>
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 900 }}>
              Nazwa Konta
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <CSSTextField
              onFocus={() => {
                dispatch(uiActions.removeError());
              }}
              error={errorMessage.includes("użytkownika") ? isError : false}
              helperText={
                errorMessage.includes("użytkownika") ? errorMessage : false
              }
              inputRef={usernameRef}
              type="text"
              label="Nazwa użytkownika"
              variant="outlined"
              color="success"
              sx={{ width: "100%", input: { color: "#86868f" } }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ width: "100%" }}
            >
              {dataStatus.status && dataStatus.type === "username" ? (
                <CheckIcon sx={{ fontSize: 27 }} />
              ) : isLoading && formType === "username" ? (
                <Ring size={27} lineWeight={5} speed={2} color="white" />
              ) : (
                "Ustaw"
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
      <form onSubmit={changeEmailHandler}>
        <Grid container spacing={2} sx={{ p: 2 }}>
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 900 }}>
              Zmień Email
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <CSSTextField
              onFocus={() => {
                dispatch(uiActions.removeError());
              }}
              error={!errorMessage.includes("użytkownika") ? isError : false}
              helperText={
                !errorMessage.includes("użytkownika") ? errorMessage : false
              }
              inputRef={emailRef}
              type="email"
              label="Email"
              variant="outlined"
              color="success"
              sx={{ width: "100%", input: { color: "#86868f" } }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ width: "100%" }}
            >
              {dataStatus.status && dataStatus.type === "email" ? (
                <CheckIcon sx={{ fontSize: 27 }} />
              ) : isLoading && formType === "email" ? (
                <Ring size={27} lineWeight={5} speed={2} color="white" />
              ) : (
                "Zmień"
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default AccountSettings;
