import React from "react";
import Paper from "@material-ui/core/Paper";

//redux
import { connect } from "react-redux";
import { getAccountDetails } from "../redux/actions/dataActions";

//hooks
import useWindowDimensions from "../hooks/useWindowDimensions";

//components
import ReactVirtualizedTable from "./utils/ReactVirtualizedTable";

function AccountsTable({ accountsList, getAccountDetails, history }) {
  const rowHeight = 48;
  const headerHeight = 48;

  const rows = accountsList.map((account) => ({
    balance: account.totalDebits - account.totalCredits,
    ...account
  }));

  const { width } = useWindowDimensions();

  const handleRowClick = ({ index }) => {
    getAccountDetails(rows[index].accountId, history);
  };

  const getColumns = () => {
    let columns = [];
    const nameColumn = {
      width: 300,
      label: "Name",
      dataKey: "name"
    };
    const phoneNumColumn = {
      width: 180,
      label: "Phone\u00A0Number",
      dataKey: "phoneNum"
    };
    const emailColumn = {
      width: 180,
      label: "Email",
      dataKey: "email"
    };
    const balanceColumn = {
      width: 180,
      label: "Balance",
      dataKey: "balance",
      numeric: true
    };

    columns.push(nameColumn);
    if (width > 850) {
      columns[0].width = 450;
      columns.push(phoneNumColumn);
      columns.push(emailColumn);
    }
    columns.push(balanceColumn);
    return columns;
  };

  return (
    <Paper
      style={{
        height: rows.length * rowHeight + headerHeight,
        width: "100%"
      }}
    >
      <ReactVirtualizedTable
        rowHeight={rowHeight}
        headerHeight={headerHeight}
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        onRowClick={handleRowClick}
        columns={getColumns()}
      />
    </Paper>
  );
}

const mapActionsToState = {
  getAccountDetails
};

export default connect(null, mapActionsToState)(AccountsTable);
