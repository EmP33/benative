import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { userActions } from "../../store/user-slice";
// Components
import { Box, Typography } from "@mui/material";
import { HeaderButton, BorderLinearProgress } from "./Wrapper.style";
import LessonSettings from "../Lesson/LessonSettings/LessonSettings";

// Icons
import CloseIcon from "@mui/icons-material/Close";
import TuneIcon from "@mui/icons-material/Tune";

interface Props {
  children?: JSX.Element;
  title: string | undefined;
  status: number;
}

const Wrapper: React.FC<Props> = ({ children, title, status }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [openSettings, setOpenSettings] = useState(false);
  console.log(params);
  const navigateHander = () => {
    if (location.pathname.includes("/flash-cards")) {
      navigate(`/dashboard/categories/flash-cards/set/${params.setID}`);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 4,
        }}
      >
        <HeaderButton onClick={navigateHander}>
          <CloseIcon />
        </HeaderButton>
        <Typography sx={{ padding: "0 16px 0 16px", textAlign: "center" }}>
          {title}
        </Typography>
        <HeaderButton onClick={() => setOpenSettings(true)}>
          <TuneIcon />
        </HeaderButton>
      </Box>
      <BorderLinearProgress variant="determinate" value={status} />
      {children}
      {openSettings && (
        <Box
          sx={{
            width: "100%",
            height: "100vh",
            background: "var(--color-base-dark)",
            position: "absolute",
            left: 0,
            top: 0,
            opacity: ".5",
          }}
          onClick={() => setOpenSettings(false)}
        ></Box>
      )}
      <Box
        sx={{
          width: "100%",
          position: "absolute",
          bottom: 0,
          left: 0,
          height: openSettings ? "50vh" : 0,
          transition: "all .4s ease",
        }}
      >
        {openSettings && <LessonSettings />}
      </Box>
    </Box>
  );
};

export default Wrapper;
