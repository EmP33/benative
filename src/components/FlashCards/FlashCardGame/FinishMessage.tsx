import React from "react";
import {
  Button,
  Dialog,
  Typography,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from "@mui/material";

interface Props {
  handleClose: () => void;
  open: boolean;
  rounds: number;
}

const FinishMessage: React.FC<Props> = ({ open, handleClose, rounds }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box
        sx={{
          background: "var(--color-base)",
          color: "var(--color-tertiary)",
          textAlign: "center",
          p: 2,
        }}
      >
        <DialogTitle id="alert-dialog-title">{"Gratulacje!"}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ color: "#fff" }}
          >
            Udało ci się ukończyć tryb memories w{" "}
            <Typography sx={{ fontWeight: "bold", display: "inline-block" }}>
              {rounds}
            </Typography>{" "}
            tur!
          </DialogContentText>
          <Button color="success" onClick={handleClose}>
            Przejdź dalej
          </Button>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default FinishMessage;
