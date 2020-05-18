import React from "react";
import Paper from "@material-ui/core/Paper";

//redux
import { connect } from "react-redux";
import { getAccountDetails } from "../redux/actions/dataActions";

//components
import ReactVirtualizedTable from "./utils/ReactVirtualizedTable";

function AccountsTable({ accountsList, getAccountDetails, history }) {
  const rowHeight = 48;
  const headerHeight = 48;

  const rows = accountsList.map((account) => ({
    balance: account.totalDebits - account.totalCredits,
    ...account
  }));

  const handleRowClick = ({ index }) => {
    getAccountDetails(rows[index].accountId, history);
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
        columns={[
          {
            width: 300,
            label: "Name",
            dataKey: "name"
          },
          {
            width: 180,
            label: "Phone\u00A0Number",
            dataKey: "phoneNum"
          },
          {
            width: 180,
            label: "Email",
            dataKey: "email"
          },
          {
            width: 180,
            label: "Balance",
            dataKey: "balance",
            numeric: true
          }
        ]}
      />
    </Paper>
  );
}

const mapActionsToState = {
  getAccountDetails
};

export default connect(null, mapActionsToState)(AccountsTable);
