import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

//hooks
import useInputState from "../../hooks/useInputState";

//component
import ResponsiveDialog from "../ui/ResponsiveDialog";

//redux
import { connect } from "react-redux";
import { addNewAccount, clearErrors } from "../../redux/actions/dataActions";

//helpers
import { convertStringToTitleCase } from "../../helpers/helpers";
function AddAccountDialog(props) {
  const { open, handleClose, ui, addNewAccount } = props;
  const [name, setName, resetName] = useInputState("");
  const [email, setEmail, resetEmail] = useInputState("");
  const [phoneNum, setPhoneNum, resetPhoneNum] = useInputState("");
  const [category, setCategory, resetCategory] = useInputState("Individual");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (ui.errors) {
      setErrors(ui.errors);
    }
  }, [ui.errors]);

  const resetForm = () => {
    clearErrors();
    setErrors({});
    resetName();
    resetEmail();
    resetPhoneNum();
    resetCategory();
  };

  const handleDialogClose = () => {
    handleClose();
    resetForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addNewAccount({
      name: convertStringToTitleCase(name),
      email,
      phoneNum,
      category
    });
    handleDialogClose();
  };

  const dialogTitle = (
    <DialogTitle id="responsive-dialog-title">{"Add New Customer"}</DialogTitle>
  );

  const dialogContent = (
    <form onSubmit={handleSubmit} id="account-form">
      <TextField
        id="name"
        name="name"
        type="text"
        label="Name"
        margin="normal"
        error={!!errors.name}
        helperText={errors.name}
        value={name}
        onChange={setName}
        style={{ textTransform: "capitalize" }}
        fullWidth
        required
      />
      <TextField
        id="email"
        name="email"
        type="email"
        label="Email"
        margin="normal"
        error={!!errors.email}
        helperText={errors.email}
        value={email}
        onChange={setEmail}
        fullWidth
      />
      <TextField
        id="phoneNum"
        name="phoneNum"
        type="number"
        label="Phone Number"
        margin="normal"
        error={!!errors.phoneNum}
        helperText={errors.phoneNum}
        value={phoneNum}
        onChange={setPhoneNum}
        fullWidth
      ></TextField>

      <TextField
        select
        label="Category"
        value={category}
        error={!!errors.category}
        helperText={errors.category || "Please choose the category of account."}
        onChange={setCategory}
        SelectProps={{
          native: true
        }}
        fullWidth
        margin="normal"
        required
      >
        <option value="Customer">Individual</option>
        <option value="Vendor">Business</option>
        <option value="Expense">Expense</option>
        <option value="Shareholder">Shareholder</option>
        <option value="Inventory">Inventory</option>
        <option value="Income">Income</option>
        <option value="General">General</option>
      </TextField>
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
        autoFocus
      >
        Save
      </Button>
    </>
  );

  return (
    <ResponsiveDialog
      open={open}
      handleClose={handleDialogClose}
      dialogTitle={dialogTitle}
      dialogContent={dialogContent}
      dialogActions={dialogActions}
    />
  );
}

AddAccountDialog.propTypes = {
  ui: PropTypes.object.isRequired,
  addNewAccount: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  ui: state.ui
});

export default connect(mapStateToProps, { addNewAccount, clearErrors })(
  AddAccountDialog
);
