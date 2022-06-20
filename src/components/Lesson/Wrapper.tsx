import React from "react";
import { useNavigate } from "react-router-dom";
// Components
import { Box, Typography } from "@mui/material";
import { HeaderButton, BorderLinearProgress } from "./Wrapper.style";

// Icons
import CloseIcon from "@mui/icons-material/Close";
import TuneIcon from "@mui/icons-material/Tune";

interface Props {
  children?: JSX.Element;
  title: string | undefined;
}

const Wrapper: React.FC<Props> = ({ children, title }) => {
  const navigate = useNavigate();
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
        <Typography>{title}</Typography>
        <HeaderButton>
          <TuneIcon />
        </HeaderButton>
      </Box>
      <BorderLinearProgress variant="determinate" value={0} />
      {children}
    </Box>
  );
};

export default Wrapper;
