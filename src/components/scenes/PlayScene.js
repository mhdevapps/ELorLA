import React, { useEffect, useState } from 'react';
import {
	View,
	ScrollView,
	TouchableOpacity,
	ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import IonIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
	getPlayWords,
	updateWordStreak,
	switchFavorite
} from '../../db/services/wordsServices';
import { getColorByArticle } from '../../helpers/ThemeHelper';
import WordPlayCard from '../components/WordPlayCard';
import WebviewModal from '../components/WebviewModal';
import CustomButton from '../components/CustomButton';
import colours from '../../themes/colours';
import { useTheme } from '../../themes/ThemeProvider';
import { ARTICLE_EL, ARTICLE_LA } from '../../constants';

/*
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // Solo se vuelve a ejecutar si count cambia
*/

const PlayScene = props => {
	const [wordInfo, onChangeWordInfo] = useState({
		wordToShow: null,
		showArticle: false,
		correctAnswer: null,
		lastWord: null
	});
	const { colors, isDark } = useTheme();
	const [replied, onChangeReplied] = useState(false);
	const [getNextWord, onChangeGetNextWord] = useState(false);
	const [getFavorite, onChangeGetFavorite] = useState(false);
	const [getShowModal, onChangeShowModal] = useState(false);
	const [getModalQuery, onChangeModalQuery] = useState('meaning');

	let wordToShow = null;
	useEffect(() => {
		const words = getPlayWords();
		wordToShow = words[parseInt(Math.random() * words.length)];
		if (wordToShow.word === wordInfo.lastWord)
			wordToShow = words[parseInt(Math.random() * words.length)];

		onChangeWordInfo({
			showArticle: false,
			correctAnswer: null,
			wordToShow,
			lastWord: wordToShow.word
		});
		onChangeGetFavorite(wordToShow.favorite);
	}, [getNextWord]);

	const setResponse = (word, response) => {
		onChangeReplied(true);
		if (word.art === response) {
			updateWordStreak(word, true);
			onChangeWordInfo({ ...wordInfo, showArticle: true, correctAnswer: true });
		} else {
			updateWordStreak(word, false);
			onChangeWordInfo({
				...wordInfo,
				showArticle: true,
				correctAnswer: false
			});
		}
	};

	const renderExtraButtons = k => {
		if (!k) return null;
		return (
			<View
				style={{
					width: '100%',
					flexDirection: 'row',
					alignItems: 'center'
				}}
			>
				<TouchableOpacity
					style={{ alignItems: 'flex-end', padding: 17, width: '50%' }}
					onPress={() => {
						onChangeModalQuery('meaning');
						onChangeShowModal(!getShowModal);
					}}
				>
					<IonIcon name="format-letter-case" size={30} color={colours.gray} />
				</TouchableOpacity>
				<TouchableOpacity
					style={{ padding: 17, width: '50%' }}
					onPress={() => {
						onChangeModalQuery('images');
						onChangeShowModal(!getShowModal);
					}}
				>
					<IconFontisto name="picture" size={23} color={colours.gray} />
				</TouchableOpacity>
			</View>
		);
	};

	const getANewWord = () => {
		onChangeWordInfo({
			wordToShow: null,
			showArticle: false,
			correctAnswer: null
		});
		onChangeGetNextWord(!getNextWord);
		onChangeReplied(false);
	};

	const updateFavorite = () => {
		onChangeGetFavorite(!getFavorite);
		switchFavorite(wordInfo.wordToShow);
	};

	const renderButtons = () => {
		console.log('wordInfo', wordInfo);
		console.log('wordInfosss', wordInfo?.wordToShow?.favorite);

		if (!replied && wordInfo.wordToShow)
			return (
				<View>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-evenly'
						}}
					>
						<View style={{ flex: 1 }}>
							<CustomButton
								titleColor={colors.text}
								title={ARTICLE_EL}
								onPress={() => {
									onChangeReplied(true);
									setResponse(wordInfo.wordToShow, ARTICLE_EL);
								}}
							/>
						</View>
						<View style={{ flex: 1 }}>
							<CustomButton
								titleColor={colors.text}
								title={ARTICLE_LA}
								onPress={() => {
									onChangeReplied(true);
									setResponse(wordInfo.wordToShow, ARTICLE_LA);
								}}
							/>
						</View>
					</View>
				</View>
			);
		else
			return (
				<View style={{ paddingBottom: 0 }}>
					<CustomButton
						big
						title="NEXT"
						onPress={() => {
							getANewWord();
						}}
						loading={!wordInfo.wordToShow}
					/>
				</View>
			);
	};

	return (
		<View
			style={{
				flex: 1,
				paddingHorizontal: 20,
				paddingVertical: 10,
				backgroundColor: colors.background
			}}
		>
			<ScrollView style={{ flex: 1 }}>
				{wordInfo.wordToShow ? (
					<WordPlayCard word={wordInfo.wordToShow} wordInfo={wordInfo} />
				) : (
					<ActivityIndicator size="large" />
				)}
			</ScrollView>
			{renderExtraButtons()}
			<TouchableOpacity
				style={{ alignItems: 'center', paddingBottom: 17 }}
				onPress={() => updateFavorite()}
			>
				<Icon
					name="star"
					size={42}
					color={getFavorite ? colors.orange : colours.gray}
				/>
			</TouchableOpacity>
			{renderButtons()}
			<WebviewModal
				meaningOrImage={getModalQuery}
				word={wordInfo.wordToShow}
				show={getShowModal}
				switchVisible={() => {
					onChangeShowModal(!getShowModal);
				}}
			/>
		</View>
	);
};

export default PlayScene;
