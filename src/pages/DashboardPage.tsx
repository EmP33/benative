import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
// Redux Store
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import {
  getData,
  createUser,
  fetchUserData,
  dataActions,
  updateBadge,
  updateStates,
} from "../store/data-slice";
import { uiActions } from "../store/ui-slice";
// Components
import { Grid } from "@mui/material";
import Welcome from "../components/Dashboard/Welcome/Welcome";
import HelpSection from "../components/Dashboard/HelpSection/HelpSection";
import ProfileSection from "../components/Dashboard/ProfileSection/ProfileSection";
import SettingsSection from "../components/Dashboard/SettingsSection/SettingsSection";
import BadgeModal from "../components/UI/BadgeModal";
// Types
import { LessonType, WordType } from "../data.types";

const DashboardPage = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { uid } = useAppSelector((state) => state.user.user);
  const badgeModalShow = useAppSelector((state) => state.ui.badgeModalShow);
  const { data, dataError: isError } = useAppSelector((state) => state.data);
  const { width, height } = useWindowSize();

  /* A React Hook that is called when the component is mounted. It is used to fetch data from the
  database. */

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

  useEffect(() => {
    ////////////////////////////////////////////////////////
    // BADGES
    if (data) {
      if (!data?.data?.learning) return;
      ///////////////////////////
      // Champion
      if (
        Object.values(data?.data?.learning)
          .map((cat: any) => Object.values(cat))
          .flat()
          .every((lesson: any) => lesson.status === 100) &&
        !data.data.badges["b1"].finished
      ) {
        dispatch(uiActions.toggleBadgeModal("b1"));
        dispatch(updateBadge(uid, "b1"));
      }
      ///////////////////////////
      // Żółtodziób
      if (
        Object.values(data?.data?.learning)
          .map((cat: any) => Object.values(cat))
          .flat()
          .filter((lesson: any) => lesson.status === 100).length >= 1 &&
        !data.data.badges["b2"].finished
      ) {
        dispatch(uiActions.toggleBadgeModal("b2"));
        dispatch(updateBadge(uid, "b2"));
      }
      ///////////////////////////
      // Początkujący
      if (
        data?.data?.words
          .filter((word: WordType) => word.status === "well")
          .filter((word: WordType) => word.known === true).length +
          // @ts-ignore
          Object.values(
            // @ts-ignore
            Object.values(data?.data?.categories).find(
              (cat: any) => cat.title === "1000 słów"
            ).words
          ).filter((word: any) => word.status === "well").length >=
          10 &&
        !data.data.badges["b3"].finished
      ) {
        dispatch(uiActions.toggleBadgeModal("b3"));
        dispatch(updateBadge(uid, "b3"));
      }
      /////////////////////////////
      // Zaawansowany
      if (
        data?.data?.words
          .filter((word: WordType) => word.status === "well")
          .filter((word: WordType) => word.known === true).length +
          // @ts-ignore
          Object.values(
            // @ts-ignore
            Object.values(data?.data?.categories).find(
              (cat: any) => cat.title === "1000 słów"
            ).words
          ).filter((word: any) => word.status === "well").length >=
          100 &&
        !data.data.badges["b4"].finished
      ) {
        dispatch(uiActions.toggleBadgeModal("b4"));
        dispatch(updateBadge(uid, "b4"));
      }
      ///////////////////////
      // Master
      if (
        data?.data?.words
          .filter((word: WordType) => word.status === "well")
          .filter((word: WordType) => word.known === true).length +
          // @ts-ignore
          Object.values(
            // @ts-ignore
            Object.values(data?.data?.categories).find(
              (cat: any) => cat.title === "1000 słów"
            ).words
          ).filter((word: any) => word.status === "well").length >=
          1000 &&
        !data.data.badges["b5"].finished
      ) {
        dispatch(uiActions.toggleBadgeModal("b5"));
        dispatch(updateBadge(uid, "b5"));
      }
      ///////////////////////////
      // Uczony
      if (
        Object.values(
          // @ts-ignore
          Object.values(data.data.categories).find(
            (cat: any) => cat.title === "1000 słów"
          ).words
        ).every((word: any) => word.status === "well") &&
        !data.data.badges["b6"].finished
      ) {
        dispatch(uiActions.toggleBadgeModal("b6"));
        dispatch(updateBadge(uid, "b6"));
      }
      ///////////////////////////
      // Przegryw
      if (data.data.points <= -100 && !data.data.badges["b7"].finished) {
        dispatch(uiActions.toggleBadgeModal("b7"));
        dispatch(updateBadge(uid, "b7"));
      }
      ///////////////////////////
      // WTF
      if (data.data.points <= -1000 && !data.data.badges["b8"].finished) {
        dispatch(uiActions.toggleBadgeModal("b8"));
        dispatch(updateBadge(uid, "b8"));
      }
      ///////////////////////////
      // Giga Chad
      if (data.data.points >= 1000 && !data.data.badges["b9"].finished) {
        dispatch(uiActions.toggleBadgeModal("b9"));
        dispatch(updateBadge(uid, "b9"));
      }

      ////////////////////////////////////////////////////////
      // STATISTICS
      if (
        data?.data?.words
          .filter((word: WordType) => word.status === "well")
          .filter((word: WordType) => word.known === true).length +
        // @ts-ignore
        Object.values(
          // @ts-ignore
          Object.values(data?.data?.categories).find(
            (cat: any) => cat.title === "1000 słów"
          ).words
        ).filter((word: any) => word.status === "well").length
      ) {
        dispatch(
          updateStates(
            uid,
            "s3",
            data?.data?.words
              .filter((word: WordType) => word.status === "well")
              .filter((word: WordType) => word.known === true).length +
              // @ts-ignore
              Object.values(
                // @ts-ignore
                Object.values(data?.data?.categories).find(
                  (cat: any) => cat.title === "1000 słów"
                ).words
              ).filter((word: any) => word.status === "well").length
          )
        );
      }
      ///////////////////////////
      if (
        Object.values(data?.data?.learning)
          .map((cat: any) => Object.values(cat))
          .flat()
          .filter((lesson: any) => lesson.status === 100).length
      ) {
        dispatch(
          updateStates(
            uid,
            "s1",
            Object.values(data?.data?.learning)
              .map((cat: any) => Object.values(cat))
              .flat()
              .filter((lesson: any) => lesson.status === 100).length
          )
        );
      }
      //////////////////////
      if (
        Object.values(data?.data?.learning)
          .map((cat: any) =>
            Object.values(cat).map((lesson: any) => lesson.status === 100)
          )
          .map((cat: any) => cat.every((lesson: any) => lesson === true))
          .filter((value) => value === true).length
      ) {
        dispatch(
          updateStates(
            uid,
            "s2",
            Object.values(data?.data?.learning)
              .map((cat: any) =>
                Object.values(cat).map((lesson: any) => lesson.status === 100)
              )
              .map((cat: any) => cat.every((lesson: any) => lesson === true))
              .filter((value) => value === true).length
          )
        );
      }
    }
  }, [data]);

  return (
    <Grid container sx={{ height: "100vh" }}>
      {badgeModalShow && (
        <Confetti
          confettiSource={{ w: 10, h: 10, x: width / 2, y: height / 2 }}
        />
      )}
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
      <BadgeModal />
    </Grid>
  );
};

export default DashboardPage;
