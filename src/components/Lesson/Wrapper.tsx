import React, { useEffect } from "react";
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
}

const Wrapper: React.FC<Props> = ({ children, title }) => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.data.data);
  const { category, lessonID, partID } = params;
  const currentLessonPart = useAppSelector(
    (state) => state.user.currentLessonPart
  );

  useEffect(() => {
    if (!category || !lessonID || !partID) return;
    dispatch(
      userActions.setCurrentLesson(data.data.learning[category][lessonID])
    );
    dispatch(
      userActions.setCurrentLessonPart(
        data.data.learning[category][lessonID].parts[partID]
      )
    );
  }, []);

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
        <HeaderButton>
          <TuneIcon />
        </HeaderButton>
      </Box>
      <BorderLinearProgress
        variant="determinate"
        value={
          params.ex
            ? // @ts-ignore
              (params.ex / Object.values(currentLessonPart.tasks).length) * 100
            : 0
        }
      />
      {children}
    </Box>
  );
};

export default Wrapper;
