import React from 'react';
import { Button, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import colors from '../../themes/colours';
import { getColorByArticle } from '../../helpers/ThemeHelper';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import OctIcon from 'react-native-vector-icons/Octicons';
import Modal from 'react-native-modal';

const renderModal = (isVisible, switchVisible) => {
	return (
		<Modal
			isVisible={isVisible}
			coverScreen={true}
			onBackButtonPress={() => {
				switchVisible(!isVisible);
			}}
			onBackdropPress={() => {
				switchVisible(!isVisible);
			}}
		>
			<View style={{ flex: 1 }}>
				<Text />
			</View>
		</Modal>
	);
};

const infoModal = props => {
	const { show, switchVisible, theme } = props;
	const text = `Hit Play, and you will be shown a word randomly chosen between the next 20 that haven't been completed.

Guess the word correctly 5 times in a row and it will be marked as complete, and new words will appear.

Completed words will still appear less often, so that you can focus on new words while also remembering old ones.

Also, the words you add will be placed at the top of the list so that they have priority.`;
	return (
		<Modal
			isVisible={show}
			coverScreen={true}
			onBackButtonPress={() => {
				switchVisible(!show);
			}}
			onBackdropPress={() => {
				switchVisible(!show);
			}}
		>
			<View
				style={{
					backgroundColor: theme.isDark
						? theme.colors.background
						: theme.colors.background,
					paddingTop: 20,
					paddingHorizontal: 20,
					height: 200,
					width: '82%',
					alignSelf: 'center',
					height: '53%',
					borderRadius: 10
				}}
			>
				<ScrollView style={{ flex: 1 }}>
					<Text style={{ color: theme.colors.text, textAlign: 'center' }}>
						{text}
					</Text>
				</ScrollView>
				<TouchableOpacity
					onPress={() => {
						switchVisible(!show);
					}}
					style={{ alignSelf: 'center', padding: 7 }}
				>
					<Icon name="close" size={23} color={colors.red} />
				</TouchableOpacity>
			</View>
		</Modal>
	);
};

export default infoModal;
