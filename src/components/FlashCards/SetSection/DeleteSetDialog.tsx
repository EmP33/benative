import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../lib/hooks";
import { removeSet } from "../../../store/data-slice";
import { useNavigate, useParams } from "react-router-dom";
// Components
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from "@mui/material";

interface Props {
  handleClose: () => void;
  open: boolean;
}

const DeleteSetDialog: React.FC<Props> = ({ handleClose, open }) => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.data.data);
  const user = useAppSelector((state) => state.user.user);

  const deleteSetHandler = () => {
    if (!params.setID) return;
    dispatch(
      removeSet(
        user.uid,
        // @ts-ignore
        Object.values(data?.data?.categories).find(
          (cat: any) => cat.title === "Fiszki"
        ).id,
        params.setID
      )
    );
    handleClose();
    navigate("/dashboard/categories/flash-cards", { replace: true });
  };

  // dispatch(
  //     dataActions.setAllSetsWords(
  //       // @ts-ignore
  //       Object.values(
  //         // @ts-ignore
  //         Object.values(data.data.categories).find(
  //           (cat: any) => cat.title === "Fiszki"
  //         ).sets
  //       ).find((set: any) => set.id === params.setID).words
  //     )
  //   );
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box sx={{ background: "var(--color-base)", color: "#fff" }}>
        <DialogTitle id="alert-dialog-title">
          {"Usunięcie zestawu fiszek"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ color: "#fff" }}
          >
            Jesteś pewny/a, że chcesz usunąć ten zestaw? Czynność będzie
            nieodwracalna
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cofnij</Button>
          <Button onClick={deleteSetHandler} autoFocus color="error">
            Usuń
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default React.memo(DeleteSetDialog);
