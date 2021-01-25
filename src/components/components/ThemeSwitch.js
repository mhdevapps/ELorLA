import * as React from 'react';
import { Switch, View, Text } from 'react-native';
import { useTheme } from '../../themes/ThemeProvider';

export default (Toggle = () => {
	// We're also pulling setScheme here!
	const { setScheme, isDark, colors } = useTheme();

	const toggleScheme = () => {
		/*
		 * setScheme will change the state of the context
		 * thus will cause childrens inside the context provider to re-render
		 * with the new color scheme
		 */
		isDark ? setScheme('light') : setScheme('dark');
	};

	return (
		<View style={{ alignContent: 'center', alignItems: 'center' }}>
			<View
				style={{
					alignContent: 'center',
					alignItems: 'center',
					flexDirection: 'row',
					backgroundColor: colors.gray,
					paddingHorizontal: 5,
					paddingVertical: 3,
					borderRadius: 50
				}}
			>
				<Text
					style={{
						backgroundColor: colors.buttonBlue,
						borderRadius: 50,
						padding: 3
					}}
				>
					☀️
				</Text>
				<Switch
					value={isDark}
					onValueChange={toggleScheme}
					trackColor={{ false: colors.orange, true: colors.smoothBlack }}
					thumbColor={colors.white}
				/>
				<Text
					style={{
						backgroundColor: colors.smoothBlack,
						borderRadius: 50,
						padding: 3
					}}
				>
					🌙
				</Text>
			</View>
		</View>
	);
});
