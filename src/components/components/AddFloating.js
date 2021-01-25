//This is an example code for React Native Floating Action Button//
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../../themes/colours';

import {
	StyleSheet,
	View,
	Image,
	TouchableOpacity,
	Alert,
	Text
} from 'react-native';
//import all the components we are going to use.

const clickHandler = () => {
	//function to handle click on floating Action Button
	this.props.navigation.navigate('Create word');
};

const floatingIcon = props => {
	return (
		<TouchableOpacity
			key="addIcon"
			onPress={() => props.navigation.navigate('Create word')}
			style={styles.TouchableOpacityStyle}
		>
			<Icon name="plus" size={50} color="white" />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	TouchableOpacityStyle: {
		position: 'absolute',
		width: 50,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		right: 30,
		bottom: 30,
		backgroundColor: colors.buttonBlue,
		borderRadius: 100
	},

	FloatingButtonStyle: {
		resizeMode: 'contain',
		width: 50,
		height: 50
	}
});

export default floatingIcon;
