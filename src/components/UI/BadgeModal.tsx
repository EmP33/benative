import React from "react";
import { useNavigate } from "react-router-dom";
// Components
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import Badge from "../Dashboard/ProfileSection/TabsSection/Badge";
// Redux Store
import { deleteAccount } from "../../store/user-slice";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { uiActions } from "../../store/ui-slice";

const BadgeModal = () => {
  const user = useAppSelector((state) => state.user.user);
  const badgeModalShow = useAppSelector((state) => state.ui.badgeModalShow);
  const data = useAppSelector((state) => state.data.data);
  const badgeID = useAppSelector((state) => state.ui.unlockedBadge);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  console.log(badgeModalShow);

  return (
    <Dialog
      open={badgeModalShow}
      onClose={() => dispatch(uiActions.toggleBadgeModal(null))}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box
        sx={{ background: "var(--color-base)", color: "var(--color-white)" }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center" }}>
          {"NOWA ODZNAKA"}
        </DialogTitle>
        {data?.data?.badges && badgeID ? (
          <DialogContent>
            <Badge
              title={data.data.badges[badgeID].title}
              description={data.data.badges[badgeID].description}
              finished={data.data.badges[badgeID].finished}
            />
            <DialogContentText
              id="alert-dialog-description"
              sx={{ color: "var(--color-white)", mt: 2 }}
            >
              Odblokowałeś nową odznakę: {data.data.badges[badgeID].title}
            </DialogContentText>
          </DialogContent>
        ) : (
          ""
        )}
      </Box>
    </Dialog>
  );
};

export default BadgeModal;
