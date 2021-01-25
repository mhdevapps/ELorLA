import realm from '../index';
import initWords from '../data/initWords';
import Toast from 'react-native-simple-toast';

export const getNextIdToUse = () => {
	const userWords = getUserWords();
	if (userWords.length > 0) return userWords.sorted('id', true)[0].id + 1;
	else return 1;
};

export const createInitWords = () => {
	const wordsSaved = getInitWords();
	const wordsSavedLength = wordsSaved.length;
	realm.write(() =>
		initWords.forEach(word => {
			if (wordsSavedLength < word.id || wordsSavedLength === 0)
				realm.create('InitWords', word, true);
		})
	);

	return true;
};

const getWordById = (table, id) => {
	return realm.objects(table).filtered(`id=${id}`)[0];
};

export const addWord = word => {
	realm.write(() =>
		realm.create('InitWords', { id: getNextIdToUse(), ...word })
	);
};

export const addUserWord = word => {
	realm.write(() =>
		realm.create('UserWords', { id: getNextIdToUse(), ...word })
	);
};

export const editWord = newData => {
	const table = newData.userWord ? 'UserWords' : 'InitWords';
	realm.write(() => {
		realm.create(
			table,
			{
				id: newData.id,
				art: newData.art,
				favorite: newData.favorite,
				comment: newData.comment,
				english: newData.english,
				spanish: newData.spanish
			},
			true
		);
	});
};

export const getInitWords = () => {
	return realm.objects('InitWords');
};

export const getUserWords = () => {
	return realm.objects('UserWords');
};

export const getAllWords = () => {
	const userWords = getUserWords();
	const initWords = getInitWords();
	return [...userWords, ...initWords];
};

export const getFilteredWordList = (word, favorite) => {
	let filterWord = '';
	let connector = '';
	let filterFavorite = '';

	if (word)
		filterWord = `(spanish CONTAINS[c] '${word}' OR english CONTAINS[c] '${word}')`;
	if (favorite) filterFavorite = 'favorite = true';
	if (filterWord && filterFavorite) connector = ' AND ';

	const userWords = getUserWords().filtered(
		`${filterWord}${connector}${filterFavorite}`
	);
	const initWords = getInitWords().filtered(
		`${filterWord}${connector}${filterFavorite}`
	);

	return [...userWords, ...initWords];
};

export const deleteInitWords = () => {
	realm.write(() => {
		realm.delete(getInitWords());
	});
};
export const deleteUserWords = () => {
	realm.write(() => {
		realm.delete(getUserWords());
	});
};
export const deleteAllWords = () => {
	deleteUserWords();
	deleteInitWords();
};
export const deleteOrHideWord = word => {
	const table = word.userWord ? 'UserWords' : 'InitWords';
	const wordToDelete = realm.objects(table).filtered(`id=${word.id}`)[0];
	realm.write(() => realm.delete(wordToDelete));
};

export const findWordByText = input => {
	const userWords = getUserWords()
		.filtered(`spanish CONTAINS[c] "${input}"`)
		.sorted('spanish', false);
	const initWords = getInitWords()
		.filtered(`spanish CONTAINS[c] "${input}"`)
		.sorted('spanish', false);
	if (input.length > 1) return [...userWords, ...initWords];
};

export const getPlayWords = () => {
	const allWords = [...getUserWords(), ...getInitWords()];
	const playWords = [];
	const memorisedWords = [];
	let max = allWords.length;

	for (let k = 0; k < max; k += 1) {
		if (!allWords[k].hidden && !allWords[k].memorized) {
			playWords.push(allWords[k]);
			if (playWords.length >= 20) max = 0; // out of the loop
		} else if (!allWords[k].hidden && allWords[k].memorized) {
			memorisedWords.push(allWords[k]);
		}
	}

	if (memorisedWords) {
		for (let k = 0; k < 3; k += 1) {
			const randomPosition = Math.floor(Math.random() * memorisedWords.length);
			if (memorisedWords[randomPosition])
				playWords.push(memorisedWords[randomPosition]);
		}
	}

	return playWords;
};

export const updateWordStreak = (word, isCorrect) => {
	const streakLetter = isCorrect ? 'c' : 'w';
	const streak = `${word.streak}${streakLetter}`;
	let markAsMemorized = false;
	if (streak.length >= 5 && streak.substr(streak.length - 5) === 'ccccc') {
		markAsMemorized = true;
		Toast.show('Word completed', Toast.LONG, ['UIAlertController']);
	}

	realm.write(() => {
		word, (word.memorized = markAsMemorized), (word.streak = streak);
	});
};

export const switchFavorite = word => {
	realm.write(() => {
		word.favorite = !word.favorite;
	});
};
