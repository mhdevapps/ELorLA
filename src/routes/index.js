import React from 'react';
import {
	createStackNavigator,
	CardStyleInterpolators
} from '@react-navigation/stack';
import InitScene from '../components/scenes/InitScene';
import HomeScene from '../components/scenes/HomeScene';
import CreateWordsScene from '../components/scenes/CreateWordScene';
import PlayScene from '../components/scenes/PlayScene';
import WordListScene from '../components/scenes/WordListScene';
import EditWordScene from '../components/scenes/EditWordScene';

const Stack = createStackNavigator();

export default (
	<Stack.Navigator
		screenOptions={{
			gestureEnabled: true,
			gestureDirection: 'horizontal',
			cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
		}}
	>
		<Stack.Screen
			name="Init"
			component={InitScene}
			options={{ headerShown: false }}
		/>
		<Stack.Screen name="Home" component={HomeScene} />
		<Stack.Screen name="Create word" component={CreateWordsScene} />
		<Stack.Screen name="Edit word" component={EditWordScene} />
		<Stack.Screen name="Play" component={PlayScene} />
		<Stack.Screen name="Words" component={WordListScene} />
	</Stack.Navigator>
);
