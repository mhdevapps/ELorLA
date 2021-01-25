import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../../themes/styles';
import colours from '../../themes/colours';
import Icon from 'react-native-vector-icons/Octicons';
import { useTheme } from '../../themes/ThemeProvider';

const FilterBar = props => {
	const { colors } = useTheme();
	return (
		<View style={{ flexDirection: 'row', paddingTop: 10 }}>
			<View style={{ width: '80%' }}>
				<TextInput
					style={{ ...styles.textInput, color: colors.text }}
					onChangeText={text => {
						props.updateWord(text);
					}}
					placeholder={'Search word'}
					placeholderTextColor={colors.grayDark}
				/>
			</View>
			<View style={{ width: '20%' }}>
				<TouchableOpacity
					style={{ alignItems: 'center' }}
					onPress={() => props.updateFavorite(!props.favoriteFilter)}
				>
					<Icon
						name="star"
						size={35}
						color={props.favoriteFilter ? 'orange' : colours.gray}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default FilterBar;
