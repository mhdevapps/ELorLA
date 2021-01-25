import React, { useState } from 'react';
import {
	Text,
	ScrollView,
	TextInput,
	TouchableOpacity,
	Switch,
	View
} from 'react-native';
import styles from '../../themes/styles';
import { useTheme } from '../../themes/ThemeProvider';

import { ARTICLE_EL, ARTICLE_LA } from '../../constants';
import { findWordByText } from '../../db/services/wordsServices';
import colours from '../../themes/colours';
import WordMainCard from '../components/wordMainCard';
import Icon from 'react-native-vector-icons/Octicons';

const switchState = () => {
	isMale = false;
};

const showWordsFound = words => {
	if (words && words.length > 0)
		return words.map((word, index) => (
			<WordMainCard index={index} key={index} word={word} hideSettings />
		));
};

const card = props => {
	const [isMale, setIsMale] = useState(
		props.word.art === ARTICLE_EL ? ARTICLE_EL : ARTICLE_LA
	);

	const { colors, isDark } = useTheme();

	return (
		<ScrollView style={{ flex: 1 }}>
			<Text style={{ color: colors.text }}>Article:</Text>
			<View style={{ flexDirection: 'row' }}>
				<Text style={{ color: colors.text, padding: 10 }}>{ARTICLE_EL}</Text>
				<Switch
					trackColor={{ false: colors.buttonBlue, true: colors.pink }}
					thumbColor={colors.white}
					value={isMale === ARTICLE_LA}
					onValueChange={value => {
						console.log('....', value, isMale);
						props.updateState(prevState => ({
							...prevState,
							art: isMale === ARTICLE_EL ? ARTICLE_LA : ARTICLE_EL
						}));
						setIsMale(isMale === ARTICLE_EL ? ARTICLE_LA : ARTICLE_EL);
					}}
				/>
				<Text style={{ color: colors.text, padding: 10 }}>{ARTICLE_LA}</Text>
			</View>
			<TextInput
				autoFocus
				style={{ ...styles.textInput, color: colors.text }}
				onChangeText={text => {
					props.updateState(prevState => ({
						...prevState,
						spanish: text
					}));
					props.setWordsFound(findWordByText(text));
				}}
				placeholder={'Spanish word'}
				placeholderTextColor={colors.grayDark}
			>
				{props.word.spanish}
			</TextInput>
			<ScrollView style={{ maxHeight: 175 }}>
				{showWordsFound(props.wordsFound)}
			</ScrollView>
			<TextInput
				style={{ ...styles.textInput, color: colors.text }}
				onChangeText={text =>
					props.updateState(prevState => ({
						...prevState,
						english: text
					}))
				}
				placeholder={'Translation'}
				placeholderTextColor={colors.grayDark}
			>
				{props.word.english}
			</TextInput>
			<TextInput
				style={{ ...styles.textInput, color: colors.text }}
				onChangeText={text =>
					props.updateState(prevState => ({
						...prevState,
						comment: text
					}))
				}
				placeholder={'Comment'}
				placeholderTextColor={colors.grayDark}
			>
				{props.word.comment}
			</TextInput>
			<TouchableOpacity
				style={{ alignItems: 'center' }}
				onPress={() =>
					props.updateState(prevState => ({
						...prevState,
						favorite: !prevState.favorite
					}))
				}
			>
				<Icon
					name="star"
					size={35}
					color={props.word.favorite ? colors.orange : colours.gray}
				/>
			</TouchableOpacity>
		</ScrollView>
	);
};

export default card;
