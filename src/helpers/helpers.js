export const convertBalanceToString = (balance) => {
  if (balance < 0) {
    return Math.abs(balance) + " /- Db";
  } else if (balance > 0) {
    return balance + " /- Cr";
  }
  return balance + " /-";
};

export const convertStringToTitleCase = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.replace(word[0], word[0].toUpperCase()))
    .join(" ");
};
