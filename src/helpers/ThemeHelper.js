import colors from "../themes/colours";

const getColorByArticle = art => {
  switch (art) {
    case "El":
      return colors.el;
    case "La":
      return colors.la;
    case "Los":
      return colors.los;
    case "Las":
      return colors.las;
    default:
      return colors.buttonBluePress;
  }
};

export default getColorByArticle;
