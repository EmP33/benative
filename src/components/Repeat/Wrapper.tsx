import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { userActions } from "../../store/user-slice";
// Components
import { Box, Typography } from "@mui/material";
import { HeaderButton, BorderLinearProgress } from "./Wrapper.style";

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

  const [openSettings, setOpenSettings] = useState(false);

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
        <HeaderButton onClick={() => navigate("/dashboard")}>
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
    </Box>
  );
};

export default Wrapper;
