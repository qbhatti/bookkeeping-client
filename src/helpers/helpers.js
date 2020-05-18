export const convertBalanceToString = (balance) => {
  if (balance < 0) {
    return Math.abs(balance) + " /- Cr";
  } else if (balance > 0) {
    return balance + " /- Db";
  }
  return balance + " /-";
};
