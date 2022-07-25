import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector, useAppDispatch } from "../../../lib/hooks";
import { updatePoints, updateStates } from "../../../store/data-slice";
// Components
import { Box, Typography } from "@mui/material";
// Icons
import SmileFace from "../../../assets/SmileFace";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

interface Props {
  correctAnswersQty: number;
  allAnswersQty: number;
  showPoints: boolean;
}

const FinishMessage: React.FC<Props> = ({
  correctAnswersQty,
  allAnswersQty,
  showPoints,
}) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.data.data);
  const user = useAppSelector((state) => state.user.user);
  // Local State
  // const [points, setPoints] = useState<number>(data.data.points);
  let points = data.data.points;
  let initialRender = true;

  useEffect(() => {
    if (initialRender) {
      if ((correctAnswersQty / allAnswersQty) * 100 >= 90) {
        dispatch(
          updateStates(user.uid, "s4", data?.data?.statistics["s4"]?.value + 5)
        );
        dispatch(updatePoints(user.uid, (points += 5)));
      } else if ((correctAnswersQty / allAnswersQty) * 100 >= 80) {
        dispatch(
          updateStates(user.uid, "s4", data?.data?.statistics["s4"]?.value + 5)
        );
        dispatch(updatePoints(user.uid, (points += 5)));
      } else if ((correctAnswersQty / allAnswersQty) * 100 >= 75) {
        dispatch(
          updateStates(user.uid, "s4", data?.data?.statistics["s4"]?.value + 4)
        );
        dispatch(updatePoints(user.uid, (points += 4)));
      } else if ((correctAnswersQty / allAnswersQty) * 100 >= 70) {
        dispatch(
          updateStates(user.uid, "s4", data?.data?.statistics["s4"]?.value + 3)
        );
        dispatch(updatePoints(user.uid, (points += 3)));
      } else if ((correctAnswersQty / allAnswersQty) * 100 >= 65) {
        dispatch(
          updateStates(user.uid, "s4", data?.data?.statistics["s4"]?.value + 2)
        );
        dispatch(updatePoints(user.uid, (points += 2)));
      } else if ((correctAnswersQty / allAnswersQty) * 100 >= 60) {
        dispatch(
          updateStates(user.uid, "s4", data?.data?.statistics["s4"]?.value + 2)
        );
        dispatch(updatePoints(user.uid, (points += 2)));
      } else if ((correctAnswersQty / allAnswersQty) * 100 >= 50) {
        dispatch(
          updateStates(user.uid, "s4", data?.data?.statistics["s4"]?.value + 1)
        );
        dispatch(updatePoints(user.uid, (points += 1)));
      } else if ((correctAnswersQty / allAnswersQty) * 100 >= 45) {
        dispatch(
          updateStates(user.uid, "s4", data?.data?.statistics["s4"]?.value + 0)
        );
        dispatch(updatePoints(user.uid, (points += 0)));
      } else if ((correctAnswersQty / allAnswersQty) * 100 >= 30) {
        dispatch(
          updateStates(user.uid, "s5", data?.data?.statistics["s5"]?.value + 1)
        );
        dispatch(updatePoints(user.uid, (points -= 1)));
      } else if ((correctAnswersQty / allAnswersQty) * 100 < 30) {
        dispatch(
          updateStates(user.uid, "s5", data?.data?.statistics["s5"]?.value + 3)
        );
        dispatch(updatePoints(user.uid, (points -= 3)));
      } else {
        dispatch(updatePoints(user.uid, (points += 0)));
      }
    }

    initialRender = false;
  }, []);
  return (
    <AnimatePresence>
      <Box
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        sx={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
          background: "var(--color-base-dark)",
          width: { xs: "90%", sm: "80%" },
          borderRadius: 5,
          textAlign: "left",
        }}
      >
        <Box
          sx={{
            background: "var(--color-base-light)",
            p: 2,
            position: "relative",
            borderRadius: "20px 20px 0 0",
          }}
        >
          <Typography variant="h6" sx={{ color: "var(--color-primary-dark)" }}>
            Podsumowanie
          </Typography>
          {showPoints && (
            <Box
              sx={{
                width: 50,
                height: 50,
                background: "var(--color-primary-dark)",
                borderRadius: "50%",
                position: "absolute",
                right: 25,
                top: -5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontSize: 30, color: "var(--color-base-dark)" }}
              >
                {(correctAnswersQty / allAnswersQty) * 100 >= 90
                  ? "A"
                  : (correctAnswersQty / allAnswersQty) * 100 >= 80
                  ? "A-"
                  : (correctAnswersQty / allAnswersQty) * 100 >= 75
                  ? "B"
                  : (correctAnswersQty / allAnswersQty) * 100 >= 70
                  ? "B-"
                  : (correctAnswersQty / allAnswersQty) * 100 >= 65
                  ? "C"
                  : (correctAnswersQty / allAnswersQty) * 100 >= 60
                  ? "C-"
                  : (correctAnswersQty / allAnswersQty) * 100 >= 50
                  ? "D"
                  : (correctAnswersQty / allAnswersQty) * 100 >= 45
                  ? "D-"
                  : (correctAnswersQty / allAnswersQty) * 100 >= 30
                  ? "F"
                  : "F-"}
              </Typography>
            </Box>
          )}
        </Box>
        <Box
          sx={{ background: "var(--color-base-dark)", p: 2, borderRadius: 5 }}
        >
          {showPoints && (
            <Typography
              variant="body1"
              sx={{ color: "var(--color-grey-1)", mb: 1 }}
            >
              <span style={{ fontWeight: "bold" }}>
                {correctAnswersQty}/{allAnswersQty}
              </span>{" "}
              poprawnych odpowiedzi
            </Typography>
          )}

          <Typography
            variant="body2"
            sx={{
              mb: 3,
              color: "var(--color-primary-dark)",
              fontSize: showPoints ? 14 : 16,
            }}
          >
            Twój bilans punktów zmienił się o:{" "}
            <span style={{ fontWeight: "bold" }}>
              {(correctAnswersQty / allAnswersQty) * 100 >= 90
                ? "5"
                : (correctAnswersQty / allAnswersQty) * 100 >= 80
                ? "5"
                : (correctAnswersQty / allAnswersQty) * 100 >= 75
                ? "4"
                : (correctAnswersQty / allAnswersQty) * 100 >= 70
                ? "3"
                : (correctAnswersQty / allAnswersQty) * 100 >= 65
                ? "2"
                : (correctAnswersQty / allAnswersQty) * 100 >= 60
                ? "2"
                : (correctAnswersQty / allAnswersQty) * 100 >= 50
                ? "1"
                : (correctAnswersQty / allAnswersQty) * 100 >= 45
                ? "0"
                : (correctAnswersQty / allAnswersQty) * 100 >= 30
                ? "-1"
                : "-3"}
            </span>
          </Typography>
        </Box>
      </Box>
    </AnimatePresence>
  );
};

export default FinishMessage;
