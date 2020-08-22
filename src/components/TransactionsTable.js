import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";

//redux
import { connect } from "react-redux";
import { getAccountDetails } from "../redux/actions/dataActions";

//hooks
import useWindowDimensions from "../hooks/useWindowDimensions";

//components
import ReactVirtualizedTable from "./utils/ReactVirtualizedTable";

//misc
import { convertBalanceToString } from "../helpers/helpers";

export default function TransactionsTable({
  transactionsList,
  getTransactionDetails,
  history
}) {
  const [transactions, setTransactions] = useState([]);
  const rowHeight = 48;
  const headerHeight = 48;

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

  return <p>Transactions</p>;
}
