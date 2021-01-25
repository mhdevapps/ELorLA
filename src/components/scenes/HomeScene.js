import React from 'react';
import { Button, View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { createInitWords } from '../../db/services/wordsServices';
import { simpleAction } from '../../redux/actions/simpleActions';
import { getAllWords, deleteAllWords } from '../../db/services/wordsServices';
import WordMainCard from '../components/wordMainCard';
import CustomButton from '../components/CustomButton';

class HomeScene extends React.Component {
	constructor(props) {
		super(props);
		this.state = { words: null, firstLanguage: '', secondLanguage: '' };
	}

	componentDidMount() {
		this.getWords();
	}

	simpleAction = event => {
		this.props.simpleAction();
	};

	getWords = () => {
		const words = getAllWords();
		this.setState({ words });
	};

	renderWords = () =>
		this.state.words.map((word, index) => (
			<WordMainCard index={index} key={index} word={word} />
		));

	render() {
		return (
			<View style={{ flex: 1 }}>
				<Button
					onPress={() => {
						this.props.navigation.navigate('Create word');
					}}
					title="Add word"
				/>
				<Button
					title="Get words"
					onPress={() => {
						this.getWords();
					}}
				/>
				<Button
					title="Words"
					onPress={() => {
						this.props.navigation.navigate('Words');
					}}
				/>
				<Button
					style={{ backgroundColor: 'red' }}
					onPress={() => {
						deleteAllWords();
					}}
					title="Delete all words"
				/>
				<View style={{ position: 'absolute', bottom: 23, width: '100%' }}>
					<CustomButton
						title="PLAY"
						onPress={() => {
							this.props.navigation.navigate('Play');
						}}
					/>
				</View>
			</View>
		);
	}
}

const mapStateToProps = state => ({
	...state
});

export default connect(
	mapStateToProps,
	{ simpleAction }
)(HomeScene);
