export const convertBalanceToString = (balance) => {
  if (balance < 0) {
    return Math.abs(balance) + " /- Db";
  } else if (balance > 0) {
    return balance + " /- Cr";
  }
  return balance + " /-";
};
