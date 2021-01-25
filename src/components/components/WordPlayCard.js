import React from 'react';
import { View, Text } from 'react-native';
import colors from '../../themes/colours';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from '../../themes/ThemeProvider';

const showSettings = () => (
	<TouchableOpacity
		style={{
			flex: 1,
			justifyContent: 'center',
			padding: 4
		}}
	>
		<Icon name="options-vertical" size={15} />
	</TouchableOpacity>
);

const renderStreak = (streak, bgColor) => {
	const st = streak.split('').slice(-5);
	const squares = [];
	for (let k = st.length - 1; k >= 0; k -= 1) {
		squares.unshift(
			<View
				key={k}
				style={{
					height: 13,
					width: 13,
					borderRadius: 30,
					marginLeft: 4,
					backgroundColor: st[k] === 'w' ? 'red' : 'green',
					borderRadius: 1
				}}
			/>
		);
	}
	return (
		<View
			style={{
				flexDirection: 'row',
				right: 0,
				paddingTop: 10,
				borderBottomLeftRadius: 2
			}}
		>
			{squares}
		</View>
	);
};

const wordMainCard = props => {
	const [showComment, setShowComment] = React.useState(false);
	const { colors, isDark } = useTheme();

	let textColor = colors.text;
	if (props.wordInfo.showArticle)
		textColor = props.wordInfo.correctAnswer ? colors.green : colors.red;
	return (
		<View
			style={{
				marginHorizontal: 20,
				marginVertical: 5,
				borderRadius: 10,
				padding: 5,
				justifyContent: 'center'
			}}
		>
			<View
				style={{
					marginVertical: 5,
					borderRadius: 10,
					padding: 5,
					flex: 1,
					justifyContent: 'center'
				}}
			>
				<Text
					style={{
						fontSize: 30,
						textAlign: 'center',
						fontWeight: 'bold',
						color: textColor
					}}
				>
					{props.wordInfo.showArticle ? props.word.art : '__'}{' '}
					{props.word.spanish}
				</Text>
				<Text
					style={{
						fontSize: 30,
						textAlign: 'center',
						color: colors.textSecondary
					}}
				>
					{props.word.english}
				</Text>
				<Text
					style={{
						fontSize: 20,
						textAlign: 'center',
						color: colors.textSecondary
					}}
				>
					{props.word.comment}
				</Text>
			</View>
			<View style={{ marginVertical: 5, alignItems: 'center' }}>
				{renderStreak(props.word.streak)}
			</View>
		</View>
	);
};

export default wordMainCard;
