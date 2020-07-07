import { createMuiTheme } from "@material-ui/core/styles";

const ormBlue = "#a8dadc";
const ormRed = "#ffadad";

export default createMuiTheme({
  palette: {
    common: {
      blue: ormBlue,
      orange: ormRed
    },
    primary: {
      main: ormBlue
    },
    secondary: {
      main: ormRed
    },
    debit: "#ef476f",
    credit: "#74c69d"
  }
});
