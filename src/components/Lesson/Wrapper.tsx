import React from "react";
// Components
import { Box, Typography } from "@mui/material";
import { HeaderButton, BorderLinearProgress } from "./Wrapper.style";

// Icons
import CloseIcon from "@mui/icons-material/Close";
import TuneIcon from "@mui/icons-material/Tune";

interface Props {
  children?: JSX.Element;
}

const Wrapper: React.FC<Props> = ({ children }) => {
  console.log("wrapper");
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
        <HeaderButton>
          <CloseIcon />
        </HeaderButton>
        <Typography>Wybierz poprawną odpowiedź</Typography>
        <HeaderButton>
          <TuneIcon />
        </HeaderButton>
      </Box>
      <BorderLinearProgress variant="determinate" value={30} />
      {children}
    </Box>
  );
};

export default Wrapper;
