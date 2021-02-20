import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { Provider } from "react-redux";
import { AppearanceProvider } from "react-native-appearance";
import configureStore from "./src/redux/store";
import StackNavigator from "./src/routes";
import { ThemeProvider } from "./src/themes/ThemeProvider";

export default function App() {
  return (
    <Provider store={configureStore()}>
      <AppearanceProvider>
        <ThemeProvider>
          <NavigationContainer>{StackNavigator}</NavigationContainer>
        </ThemeProvider>
      </AppearanceProvider>
    </Provider>
  );
}
