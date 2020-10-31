import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";

//redux
import { connect } from "react-redux";

//hooks
import useWindowDimensions from "../hooks/useWindowDimensions";

//components
import ReactVirtualizedTable from "./utils/ReactVirtualizedTable";

//misc
import { convertBalanceToString } from "../helpers/helpers";

function TransactionsTable({
  transactionsList,
  getTransactionDetails,
  history
}) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    setTransactions(calculateTransactionBalances(transactionsList));
  }, [transactionsList]);

  const calculateTransactionBalances = (trans) => {
    let totalDebit = 0;
    let totalCredit = 0;

    let reverseTransactionsList = [].concat(transactionsList).reverse();
    let transactionsWithBal = reverseTransactionsList.map((t) => {
      if (t.type === "Debit") {
        totalDebit += t.amount;
      }
      if (t.type === "Credit") {
        totalCredit += t.amount;
      }
      return {
        ...t,
        balance: convertBalanceToString(totalCredit - totalDebit)
      };
    });
    return [].concat(transactionsWithBal).reverse();
  };

  const rowHeight = 48;
  const headerHeight = 48;

  const rows = transactions;

  const { width } = useWindowDimensions();

  const handleRowClick = ({ index }) => {
    //getTransactionDetails(rows[index].transactionId, history);
  };

  const getColumns = () => {
    let columns = [];
    const dateColumn = {
      width: 150,
      label: "Date",
      dataKey: "date"
    };
    const detailsColumn = {
      width: 165,
      label: "Details",
      dataKey: "details"
    };
    const typeColumn = {
      width: 100,
      label: "Type",
      dataKey: "type"
    };
    const amountColumn = {
      width: 150,
      label: "Amount",
      dataKey: "amount"
    };
    const balanceColumn = {
      width: 180,
      label: "Balance",
      dataKey: "balance"
    };

    columns.push(dateColumn);
    if (width > 1050) {
      columns.push(typeColumn);
    }
    if (width > 1280) {
      columns.push(detailsColumn);
      columns[2].width = 250;
    }
    if (width > 1600) {
      columns[2].width = 380;
    }
    columns.push(amountColumn);
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

export default TransactionsTable;
