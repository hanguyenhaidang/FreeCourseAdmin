export const shortenNumber = (number) => {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  return formatter.format(number);
};

export const convertTime = (time) => {
  const tempTime = new Date(time).getTime();
  return new Date(tempTime - 1).toISOString();
};

export const generateRandomString = (length) => {
  const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let password = "";
  for (var i = 0; i <= length; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }
  return password;
};
