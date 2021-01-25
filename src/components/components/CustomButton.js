import React from 'react';
import { View, TouchableOpacity, Text, TouchableHighlight } from 'react-native';
import { getColorByArticle } from '../../helpers/ThemeHelper';
import { useTheme } from '../../themes/ThemeProvider';

export const customButton = props => {
	const { title, onPress, big, color, loading, titleColor } = props;
	const { colors, isDark } = useTheme();
	return (
		<View
			style={{
				height: big ? 50 : 50,
				alignContent: 'center',
				alignItems: 'center',
				marginVertical: 10
			}}
		>
			<TouchableHighlight
				disabled={loading}
				style={[
					style.button,
					{
						backgroundColor: color || colors.buttonBlue,
						underlayColor: getColorByArticle(title)
					}
				]}
				onPress={onPress}
				underlayColor={getColorByArticle(title)}
			>
				<Text style={{ ...style.buttonText, color: colors.blueButtonText }}>
					{title}
				</Text>
			</TouchableHighlight>
		</View>
	);
};

const style = {
	button: {
		height: '100%',
		width: '90%',
		justifyContent: 'center',
		borderRadius: 7,
		shadowColor: '#00e',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 1
	},
	buttonText: {
		textAlign: 'center',
		fontSize: 20,
		fontWeight: 'bold'
	}
};

export default customButton;
