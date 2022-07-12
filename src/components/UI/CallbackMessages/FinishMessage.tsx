import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector, useAppDispatch } from "../../../lib/hooks";
import { updatePoints } from "../../../store/data-slice";
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
        dispatch(updatePoints(user.uid, (points += 25)));
      } else if ((correctAnswersQty / allAnswersQty) * 100 >= 80) {
        dispatch(updatePoints(user.uid, (points += 15)));
      } else if ((correctAnswersQty / allAnswersQty) * 100 >= 75) {
        dispatch(updatePoints(user.uid, (points += 12)));
      } else if ((correctAnswersQty / allAnswersQty) * 100 >= 70) {
        dispatch(updatePoints(user.uid, (points += 10)));
      } else if ((correctAnswersQty / allAnswersQty) * 100 >= 65) {
        dispatch(updatePoints(user.uid, (points += 7)));
      } else if ((correctAnswersQty / allAnswersQty) * 100 >= 60) {
        dispatch(updatePoints(user.uid, (points += 5)));
      } else if ((correctAnswersQty / allAnswersQty) * 100 >= 50) {
        dispatch(updatePoints(user.uid, (points += 3)));
      } else if ((correctAnswersQty / allAnswersQty) * 100 >= 45) {
        dispatch(updatePoints(user.uid, (points += 1)));
      } else if ((correctAnswersQty / allAnswersQty) * 100 >= 30) {
        dispatch(updatePoints(user.uid, (points -= 5)));
      } else if ((correctAnswersQty / allAnswersQty) * 100 < 30) {
        dispatch(updatePoints(user.uid, (points -= 10)));
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
                ? "25"
                : (correctAnswersQty / allAnswersQty) * 100 >= 80
                ? "15"
                : (correctAnswersQty / allAnswersQty) * 100 >= 75
                ? "12"
                : (correctAnswersQty / allAnswersQty) * 100 >= 70
                ? "10"
                : (correctAnswersQty / allAnswersQty) * 100 >= 65
                ? "7"
                : (correctAnswersQty / allAnswersQty) * 100 >= 60
                ? "5"
                : (correctAnswersQty / allAnswersQty) * 100 >= 50
                ? "3"
                : (correctAnswersQty / allAnswersQty) * 100 >= 45
                ? "1"
                : (correctAnswersQty / allAnswersQty) * 100 >= 30
                ? "-5"
                : "-10"}
            </span>
          </Typography>
        </Box>
      </Box>
    </AnimatePresence>
  );
};

export default FinishMessage;
