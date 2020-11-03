import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

//MUI stuff
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

//hooks
import useInputState from "../../hooks/useInputState";

//component
import ResponsiveDialog from "../ui/ResponsiveDialog";
import MuiBackdrop from "../ui/MuiBackdrop";
//redux
import { connect } from "react-redux";
import { addTransaction, clearErrors } from "../../redux/actions/dataActions";

//helpers
import { convertStringToTitleCase } from "../../helpers/helpers";

//*****************Imports End***************************************

const useStyles = makeStyles((theme) => ({
  error: theme.customClasses.error
}));

function AddTransactionDialog(props) {
  const { open, handleClose, ui, addTransaction, history } = props;
  const [type, setType, resetType] = useInputState("Debit");

  const [errors, setErrors] = useState({});

  const classes = useStyles();

  useEffect(() => {
    if (ui.errors) {
      setErrors(ui.errors);
    }
  }, [ui.errors]);

  const resetForm = () => {
    clearErrors();
    setErrors({});
    resetType();
  };

  const handleDialogClose = () => {
    handleClose();
    resetForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addTransaction({
      accountId: history.location.state.accountId,
      type
    });
    handleDialogClose();
  };

  const dialogTitle = (
    <DialogTitle id="responsive-dialog-title">
      {"Add New Transaction"}
    </DialogTitle>
  );

  const dialogContent = (
    <form onSubmit={handleSubmit} id="transaction-form">
      <TextField
        select
        label="Type"
        value={type}
        error={!!errors.type}
        helperText={errors.type || "Please choose the Type of Transaction."}
        onChange={setType}
        SelectProps={{
          native: true
        }}
        fullWidth
        margin="normal"
        required
      >
        <option value="Debit">Debit</option>
        <option value="Credit">Credit</option>
      </TextField>

      {errors && (
        <Typography className={classes.error} variant="body2">
          {errors.general}
        </Typography>
      )}
    </form>
  );

  const dialogActions = (
    <>
      <Button onClick={handleDialogClose} color="primary">
        Cancel
      </Button>
      <Button
        onClick={handleSubmit}
        color="primary"
        form="account-form"
        type="submit"
      >
        Submit
      </Button>
    </>
  );

  return (
    <>
      <ResponsiveDialog
        open={open}
        handleClose={handleDialogClose}
        dialogTitle={dialogTitle}
        dialogContent={dialogContent}
        dialogActions={dialogActions}
      />
      <MuiBackdrop open={ui.loading} />
    </>
  );
}

AddTransactionDialog.propTypes = {
  ui: PropTypes.object.isRequired,
  addTransaction: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  ui: state.ui
});

export default connect(mapStateToProps, { addTransaction, clearErrors })(
  AddTransactionDialog
);
