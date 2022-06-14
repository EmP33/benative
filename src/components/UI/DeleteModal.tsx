import React from "react";
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
// Redux Store
import { deleteAccount } from "../../store/user-slice";
import { useAppDispatch } from "../../lib/hooks";

interface Props {
  openModal: boolean;
  onCloseModal: () => void;
}

const DeleteModal: React.FC<Props> = ({ openModal, onCloseModal }) => {
  const dispatch = useAppDispatch();
  return (
    <Dialog
      open={openModal}
      onClose={onCloseModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box
        sx={{ background: "var(--color-base)", color: "var(--color-white)" }}
      >
        <DialogTitle id="alert-dialog-title">
          {"Czy jesteś pewny, że chcesz usunąć konto?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ color: "var(--color-white)" }}
          >
            Zmiany będą nieodwracalne, utracisz cały swój postęp oraz jeżeli
            zakupiłeś konto premium, anuluje te działanie subskrybcję.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseModal}>Nie usuwaj</Button>
          <Button
            onClick={() => {
              dispatch(deleteAccount());
            }}
            variant="contained"
            color="error"
            autoFocus
          >
            Usuń
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default DeleteModal;
