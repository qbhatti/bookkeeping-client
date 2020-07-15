import React from "react";
import useInputState from "../../hooks/useInputState";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import ResponsiveDialog from "../ui/ResponsiveDialog";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";

export default function AddAccountDialog({ open, handleClose }) {
  const [name, setName, resetName] = useInputState("");
  const [email, setEmail, resetEmail] = useInputState("");
  const [phoneNum, setPhoneNum, resetPhoneNum] = useInputState("");
  const [category, setCategory, resetCategory] = useInputState("Individual");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${name}, ${email}, ${phoneNum}`);
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
        value={name}
        onChange={setName}
        fullWidth
        required
      />
      <TextField
        id="email"
        name="email"
        type="email"
        label="Email"
        margin="normal"
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
        value={phoneNum}
        onChange={setPhoneNum}
        fullWidth
      ></TextField>

      <TextField
        select
        label="Category"
        value={category}
        onChange={setCategory}
        SelectProps={{
          native: true
        }}
        helperText="Please choose the category of account."
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
      <Button onClick={handleClose} color="primary">
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
      handleClose={handleClose}
      dialogTitle={dialogTitle}
      dialogContent={dialogContent}
      dialogActions={dialogActions}
    />
  );
}
