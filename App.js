import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { Provider } from "react-redux";
import { AppearanceProvider } from "react-native-appearance";
import admob, { MaxAdContentRating } from "@react-native-firebase/admob";
import configureStore from "./src/redux/store";
import StackNavigator from "./src/routes";
import { ThemeProvider } from "./src/themes/ThemeProvider";

export default function App() {
  admob()
    .setRequestConfiguration({
      // Update all future requests suitable for parental guidance
      maxAdContentRating: MaxAdContentRating.G,

      // Indicates that you want your content treated as child-directed for purposes of COPPA.
      tagForChildDirectedTreatment: false,

      // Indicates that you want the ad request to be handled in a
      // manner suitable for users under the age of consent.
      tagForUnderAgeOfConsent: true
    })
    .then(() => {
      // Request config successfully set!
    });

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
