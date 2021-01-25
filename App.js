import React from 'react';
import { Button, View, SafeAreaView, Text } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Provider } from 'react-redux';
import configureStore from './src/redux/store';
import StackNavigator from './src/routes/';
import { AppearanceProvider } from 'react-native-appearance';
import { ThemeProvider } from './src/themes/ThemeProvider';

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
