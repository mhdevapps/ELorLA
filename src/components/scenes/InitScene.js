import React from 'react';
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Image,
	Alert,
	Linking
} from 'react-native';
import { connect } from 'react-redux';
import { createInitWords } from '../../db/services/wordsServices';
import { simpleAction } from '../../redux/actions/simpleActions';
import CustomButton from '../components/CustomButton';
import InfoModal from '../components/InfoModal';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import ThemeSwitch from '../components/ThemeSwitch';
import colors from '../../themes/colours';
import packageJson from '../../../package.json';
import { useTheme } from '../../themes/ThemeProvider';
import { useNavigation } from '@react-navigation/native';

const rateApp = () => {
	const url = 'https://play.google.com/store/apps/details?id=com.elorla';
	return (
		<TouchableOpacity
			key="sett"
			style={{ position: 'absolute', top: 5, right: 5 }}
			onPress={() => {
				Alert.alert(
					'Rate the app',
					`This opens the store so that you can review the app. Give your feedback and help with the improvement and visibility of ELorLA.\nThank you!`,
					[
						{
							text: 'Cancel',
							style: 'cancel'
						},
						{
							text: 'Rate',
							onPress: () => {
								Linking.openURL(
									'https://play.google.com/store/apps/details?id=com.elorla'
								);
							}
						}
					]
				);
			}}
		>
			<MaterialIcon name="rate-review" size={30} color={colors.green} />
		</TouchableOpacity>
	);
};

const InitScene = () => {
	const navigation = useNavigation();
	const { colors, isDark } = useTheme();
	const [dataLoadCompleted, setDataLoadCompleted] = React.useState(false);
	const [showInfo, setShowInfo] = React.useState(false);

	React.useEffect(() => {
		const completed = createInitWords();
		setDataLoadCompleted(completed);
	}, []); // like componentDidMount(), and the final [] to execute it only once.

	return (
		<View style={{ flex: 1, backgroundColor: colors.background }}>
			<View style={{ position: 'absolute', top: 5, left: 5 }}>
				<Text style={{ fontSize: 11, color: colors.grayDark }}>
					v-{packageJson.version}.
				</Text>
			</View>
			<ScrollView style={{ flex: 1, paddingTop: '33%', padding: 20 }}>
				<Text
					style={{
						fontSize: 50,
						textAlign: 'center',
						color: isDark ? colors.white : colors.text
					}}
				>
					EL or LA
				</Text>
				<View style={{ flexDirection: 'row' }}>
					<View
						style={{ height: 5, backgroundColor: colors.red, width: '28%' }}
					/>
					<View
						style={{ height: 5, backgroundColor: colors.orange, width: '44%' }}
					/>
					<View
						style={{ height: 5, backgroundColor: colors.red, width: '28%' }}
					/>
				</View>
				<Text style={{ fontSize: 23, textAlign: 'center', color: colors.text }}>
					Learn new words in Spanish and their gender
				</Text>
				<Text />
				<ThemeSwitch />
				<Text />
				<TouchableOpacity
					key="sett"
					style={{ alignSelf: 'center', padding: 0 }}
					onPress={() => {
						setShowInfo(true);
					}}
				>
					<Icon name="info" size={22} color={colors.grayDark} />
				</TouchableOpacity>
			</ScrollView>
			<View style={{ width: '100%', paddingBottom: 20 }}>
				{dataLoadCompleted && (
					<View>
						<CustomButton
							title="Word list"
							onPress={() => {
								navigation.navigate('Words');
							}}
						/>
						<CustomButton
							title="Play"
							onPress={() => {
								navigation.navigate('Play');
							}}
						/>
					</View>
				)}
			</View>
			<InfoModal
				theme={{ colors, isDark }}
				show={showInfo}
				switchVisible={show => {
					setShowInfo(show);
				}}
			/>
			{rateApp()}
		</View>
	);
};

const mapStateToProps = state => ({
	...state
});

export default connect(
	mapStateToProps,
	{ simpleAction }
)(InitScene);
