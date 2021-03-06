import Toast from "react-native-simple-toast";
import realm from "../index";
import initWords from "../data/initWords";
import { addWordCount } from "./statsService";

export const getNextIdToUse = () => {
  const userWords = getUserWords();
  return userWords.length > 0 ? userWords.sorted("id", true)[0].id + 1 : 1;
};

export const createInitWords = () => {
  const wordsSaved = getInitWords();
  const wordsSavedLength = wordsSaved.length;
  realm.write(() =>
    initWords.forEach(word => {
      if (wordsSavedLength < word.id || wordsSavedLength === 0) {
        realm.create("InitWords", word, true);
      }
    })
  );

  return true;
};

const getWordById = (table, id) => {
  return realm.objects(table).filtered(`id=${id}`)[0];
};

export const addWord = word => {
  realm.write(() => realm.create("InitWords", { id: getNextIdToUse(), ...word }));
};

export const addUserWord = word => {
  realm.write(() => realm.create("UserWords", { id: getNextIdToUse(), ...word }));
};

export const editWord = newData => {
  const table = newData.userWord ? "UserWords" : "InitWords";
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
  return realm.objects("InitWords");
};

export const getUserWords = () => {
  return realm.objects("UserWords");
};

export const getInitOrUserWordById = (userWord, id) => {
  const word = userWord
    ? getUserWords().filtered(`id == ${id}`)[0]
    : getInitWords().filtered(`id == ${id}`)[0];

  return word;
};

export const getAllWords = () => {
  const userWords = getUserWords();
  const initWordsSaved = getInitWords();
  return [...userWords, ...initWordsSaved];
};

export const getAllWordsMemorizedNumber = () => {
  const allWords = getAllWords();
  return allWords.filter(word => word.memorized).length;
};

export const getFilteredWordList = (word, favorite) => {
  let filterWord = "";
  let connector = "";
  let filterFavorite = "";

  if (word) {
    filterWord = `(spanish CONTAINS[c] '${word}' OR english CONTAINS[c] '${word}')`;
  }
  if (favorite) filterFavorite = "favorite = true";
  if (filterWord && filterFavorite) connector = " AND ";

  const userWords = getUserWords().filtered(`${filterWord}${connector}${filterFavorite}`);
  const initWordss = getInitWords().filtered(
    `${filterWord}${connector}${filterFavorite}`
  );

  return [...userWords, ...initWordss];
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
  const table = word.userWord ? "UserWords" : "InitWords";
  const wordToDelete = realm.objects(table).filtered(`id=${word.id}`)[0];
  realm.write(() => realm.delete(wordToDelete));
};

export const findWordByText = input => {
  const userWords = getUserWords()
    .filtered(`spanish CONTAINS[c] "${input}"`)
    .sorted("spanish", false);
  const initWordsSaved = getInitWords()
    .filtered(`spanish CONTAINS[c] "${input}"`)
    .sorted("spanish", false);
  if (input.length > 1) return [...userWords, ...initWordsSaved];
  return null;
};

export const getPlayWords = filters => {
  let allWords = [...getUserWords(), ...getInitWords()];
  if (filters.onlyFavs) {
    const favWords = allWords.filter(word => word.favorite && word);
    if (favWords.length > 2) allWords = favWords;
  }
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

  if (memorisedWords.length > 0) {
    for (let k = 0; k < 3; k += 1) {
      const randomPosition = Math.floor(Math.random() * memorisedWords.length);
      if (memorisedWords[randomPosition]) playWords.push(memorisedWords[randomPosition]);
    }
  }

  return playWords;
};

export const updateWordStreak = (word, isCorrect) => {
  addWordCount(isCorrect);
  const streakLetter = isCorrect ? "c" : "w";
  const streak = `${word.streak}${streakLetter}`;
  let markAsMemorized = false;
  if (streak.length >= 5 && streak.substr(streak.length - 5) === "ccccc") {
    markAsMemorized = true;
    if (!word.memorized) {
      Toast.show("Word completed", Toast.LONG, ["UIAlertController"]);
    }
  }

  realm.write(() => {
    word, (word.memorized = markAsMemorized), (word.streak = streak);
  });
};

export const switchFavorite = wordProp => {
  const word = getInitOrUserWordById(wordProp.userWord, wordProp.id);

  realm.write(() => {
    word.favorite = !word.favorite;
  });
};
