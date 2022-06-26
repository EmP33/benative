import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
// Redux Store
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import {
  getData,
  createUser,
  fetchUserData,
  dataActions,
} from "../store/data-slice";
import { uiActions } from "../store/ui-slice";
// Components
import { Grid } from "@mui/material";
import Welcome from "../components/Dashboard/Welcome/Welcome";
import HelpSection from "../components/Dashboard/HelpSection/HelpSection";
import ProfileSection from "../components/Dashboard/ProfileSection/ProfileSection";
import SettingsSection from "../components/Dashboard/SettingsSection/SettingsSection";
import { LessonType } from "../data.types";

const DashboardPage = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { uid } = useAppSelector((state) => state.user.user);
  const data = useAppSelector((state) => state.data.data);
  const isError = useAppSelector((state) => state.data.dataError);
  console.log(data, isError);

  // if (data?.data) {
  //   console.log(
  //     Object.values(data?.data.learning)
  //       .map((lesson: any) => Object.values(lesson))
  //       .flat()
  //       .map((lesson: any) => lesson.parts)
  //       .filter((part) => part !== undefined)
  //       .map((part) => Object.values(part))
  //       .flat()
  //       .map((part: any) => part.words)
  //       .filter((part) => part !== undefined)
  //       .flat()
  //   );
  // }
  useEffect(() => {
    dispatch(getData());
    if (uid && !isError) {
      dispatch(fetchUserData(uid));
    }
    if (isError) {
      dispatch(createUser(uid, data));
      dispatch(dataActions.removeError());
    }
  }, [dispatch, uid, isError]);

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid
        item
        xs={0}
        sm={2}
        md={3}
        lg={4}
        sx={{ background: "var(--color-base-light)" }}
      >
        {location.pathname.includes("/profile") ? (
          <SettingsSection />
        ) : (
          <ProfileSection />
        )}
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={6}
        lg={4}
        sx={{ position: "relative", height: "100vh" }}
      >
        <Welcome />
      </Grid>
      <Grid
        item
        xs={0}
        sm={2}
        md={3}
        lg={4}
        sx={{ background: "var(--color-base-light)" }}
      >
        <HelpSection />
      </Grid>
    </Grid>
  );
};

export default DashboardPage;
