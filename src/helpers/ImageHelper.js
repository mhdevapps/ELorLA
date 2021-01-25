import React from 'react';
import { Image } from 'react-native';

const images = {
	en: {
		uri: require('../assets/country_flags/en.png')
	},
	es: {
		uri: require('../assets/country_flags/es.png')
	},
	de: {
		uri: require('../assets/country_flags/de.png')
	}
};

const getImage = (name, size) => {
	let style = { height: 25, width: 25 };
	if (!name || name === '')
		return <Image source={images.en.uri} style={{ ...style }} />;

	if (size === 'icon') style = { height: 15, width: 15 };
	return <Image source={images[name].uri} style={{ ...style }} />;
};

export default getImage;
