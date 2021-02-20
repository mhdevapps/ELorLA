module.exports = {
  extends: "airbnb",
  plugins: ["react", "react-native", "react-hooks"],
  parser: "babel-eslint",
  env: {
    jest: true,
    "react-native/react-native": true
  },
  rules: {
    "no-use-before-define": "off",
    "react/jsx-filename-extension": "off",
    "react/prop-types": "off",
    "comma-dangle": "off",
    "no-unused-vars": "warn",
    "padded-blocks": "off",
    "arrow-body-style": "off",
    "arrow-parens": "off",
    "react-hooks/exhaustive-deps": "warn",
    "react-hooks/exhaustive-deps": "warn",
    "react-native/no-unused-styles": 2,
    "react-native/split-platform-components": 2,
    "react-native/no-inline-styles": "off",
    "react-native/no-color-literals": 2,
    "react-native/no-raw-text": 2,
    "react-native/no-single-element-style-arrays": "off",
    "linebreak-style": 0,
    "jsx-quotes": "off",
    quotes: "off"
  },
  globals: {
    fetch: false
  }
};
