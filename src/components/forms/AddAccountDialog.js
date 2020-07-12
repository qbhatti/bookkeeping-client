import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import ResponsiveDialog from "../ui/ResponsiveDialog";

export default function AddAccountDialog({ open, handleClose }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const dialogTitle = (
    <DialogTitle id="responsive-dialog-title">
      {"Use Google's location service?"}
    </DialogTitle>
  );

  const dialogContent = (
    <DialogContentText>
      Let Google help apps determine location. This means sending anonymous
      location data to Google, even when no apps are running.
    </DialogContentText>
  );

  const dialogActions = (
    <>
      <Button autoFocus onClick={handleClose} color="primary">
        Disagree
      </Button>
      <Button onClick={handleClose} color="primary" autoFocus>
        Agree
      </Button>
    </>
  );

  return (
    <ResponsiveDialog
      open={open}
      handleClose={handleClose}
      dialogTitle={dialogTitle}
      dialogContent={dialogContent}
      dialogActions={dialogActions}
    />
  );
}
