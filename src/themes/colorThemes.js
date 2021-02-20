const smoothBlack = "#222222";
const grayLight = "#D1D1D1";

const commonColors = {
  buttonBlue: "#0099ff",
  buttonBluePress: "#80bfff",
  secondary: "#D1D1D1",
  green: "#3BC05E",
  greenDark: "green",
  el: "#CCE5FF",
  la: "#FFCCE5",
  los: "#AFD5FF",
  pink: "#f495cc",
  gray: "#999999",
  grayLight,
  grayDark: "gray",
  red: "#c60b1e",
  white: "white",
  black: "#000000",
  orange: "#ffc400",
  blueButtonText: "#f6f6f6",
  textBlack: "#121212",
  smoothBlack
};

// Light theme colors
export const lightColors = {
  background: "#eeeeee",
  text: "#121212",
  textSecondary: smoothBlack,
  ...commonColors
};

// Dark theme colors
export const darkColors = {
  background: smoothBlack,
  text: "#f6f6f6",
  textSecondary: grayLight,
  ...commonColors
};
