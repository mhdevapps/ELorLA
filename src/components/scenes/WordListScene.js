/* eslint-disable no-tabs */
/* eslint-disable max-len */
import React from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";

import { connect } from "react-redux";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import realm from "../../db";
import FilterBar from "../components/FilterBar";
import CompletedWordsProgressBar from "../components/CompletedWordsProgressBar";

import simpleAction from "../../redux/actions/simpleActions";
import { getAllWords, getFilteredWordList } from "../../db/services/wordsServices";
import WordMainCard from "../components/wordMainCard";
import Floating from "../components/AddFloating";
import { useTheme } from "../../themes/ThemeProvider";
import colours from "../../themes/colours";

// class WordListScene extends React.Component {
/* constructor(props) {
   super(props);
		this.state = { words: null, wordFilter: '', favoriteFilter: false };
		realm.addListener('change', () => {
			this.getWords();
		});
	}

	componentDidMount() {
		this.getWords();
	} */

const WordListScene = () => {
  const navigation = useNavigation();
  const [favoriteFilter, setFavoriteFilter] = React.useState(false);
  const [wordFilter, setWordFilter] = React.useState("");
  const [wordsLoaded, setWordsLoaded] = React.useState(false);
  const [pages, setPages] = React.useState({ current: 1, total: 10 });
  const [wordList, setWordList] = React.useState([]);
  const { colors } = useTheme();
  const flatlistRef = React.useRef();

  const getWordsListener = React.useCallback(() => {
    // useCallback will return a memoized version of the callback that only changes if one of the inputs in [] has changed
    getWords(true, "updateButRemainInSamePage");
  }, [wordFilter, favoriteFilter]);

  React.useEffect(() => {
    /**  Like ComponentDidMount
     *  Gets the initial words. Then if there is a word changed/deleted, it refreshes them, but it would call getWords()
     *  with the same values always, because it is a copy of when it was first createdso it has no access to the current state.
     *  That is why I used the useCallback in getWordsListener, so when its [wordFilter, favoriteFilter] changes, it is updated, and the listener function with it
     */
    realm.addListener("change", getWordsListener);
    return () => realm.removeAllListeners(); // willUnmount
  }, [getWordsListener]);

  React.useEffect(() => {
    getWords(true);
  }, [favoriteFilter, wordFilter]);

  const simpleAction = event => {
    // this.props.simpleAction();
  };

  const getWords = (filtersApplied, updateButRemainInSamePage) => {
    let words = null;
    if (wordFilter !== "" || favoriteFilter) {
      words = getFilteredWordList(wordFilter, favoriteFilter);
    } else {
      words = getAllWords();
    }

    const totalPages = parseInt(words.length / 50 + 1, 10);
    const currentPage = totalPages > pages.current ? 1 : pages.current;

    if (updateButRemainInSamePage) {
      // do nothing
    } else if (filtersApplied) {
      setPages({ current: 1, total: totalPages });
    } else {
      setPages({ current: currentPage, total: totalPages });
    }

    const wordsByPage = Array.from({ length: totalPages + 1 }, () => []);
    let page = 1;

    words.forEach((word, index) => {
      if (index >= (page - 1) * 50) {
        wordsByPage[page].push({ ...JSON.parse(JSON.stringify(word)), index });
        if (wordsByPage[page].length >= 50) page += 1;
      }
    });

    setWordList(wordsByPage);
    setWordsLoaded(true);
  };

  const renderWords = () => {
    const words = wordList[pages.current];

    return words?.length > 0 ? (
      <Animatable.View animation="fadeIn" duration={500} style={{ flex: 1 }}>
        <FlatList
          ref={flatlistRef}
          ListHeaderComponent={<View style={{ height: 1 }} />}
          data={words}
          renderItem={({ item, index }) => (
            <WordMainCard index={item.index} key={index} word={item} />
          )}
          ListFooterComponent={<View style={{ height: 25 }} />}
          keyExtractor={(item, index) => String(index)}
        />
      </Animatable.View>
    ) : (
      <View style={{ flex: 1, paddingTop: 50, alignItems: "center", color: colors.text }}>
        <Text style={{ color: colors.text }}>No words found :(</Text>
        <Text style={{ color: colors.text }}>
          You can add more with the &quot;+&quot; button
        </Text>
      </View>
    );
  };

  const changePage = increase => {
    if (increase) {
      setPages({
        ...pages,
        current: pages.current >= pages.total ? pages.total : pages.current + 1
      });
    } else {
      setPages({ ...pages, current: pages.current <= 1 ? 1 : pages.current - 1 });
    }
    try {
      flatlistRef.current.scrollToIndex({ index: 0 });
    } catch (e) {
      console.log("error scroll", e);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: "5%",
        backgroundColor: colors.background
      }}
    >
      <FilterBar
        updateWord={input => setWordFilter(input)}
        updateFavorite={updatedFavorite => setFavoriteFilter(updatedFavorite)}
        favoriteFilter={favoriteFilter}
      />
      <CompletedWordsProgressBar />
      {wordsLoaded ? (
        renderWords()
      ) : (
        <View style={{ flex: 1, paddingTop: 30 }}>
          <ActivityIndicator color={colors.gray} size="large" />
        </View>
      )}
      <View style={styles.paginationContainer}>
        <View style={styles.paginationView}>
          <TouchableOpacity
            disabled={pages.current === 1}
            style={styles.buttonPagination}
            onPress={() => changePage(false)}
          >
            <Icon
              name="arrow-left"
              size={20}
              color={pages.current === 1 ? colours.grayDark : colours.black}
            />
          </TouchableOpacity>
          <View style={{ backgroundColor: colors.grayLight, minWidth: 70 }}>
            <Text style={styles.paginationCount}>
              {`${pages.current}/${pages.total}`}
            </Text>
          </View>
          <TouchableOpacity
            disabled={pages.current === pages.total}
            style={styles.buttonPagination}
            onPress={() => changePage(true)}
          >
            <Icon
              name="arrow-right"
              size={20}
              color={pages.current === pages.total ? colours.grayDark : colours.black}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Floating navigation={navigation} />
    </View>
  );
};

const styles = {
  buttonPagination: {
    height: "100%",
    paddingHorizontal: 17,
    backgroundColor: colours.buttonBluePress,
    justifyContent: "center"
  },
  paginationCount: {
    paddingHorizontal: 15,
    backgroundColor: colours.grayLight,
    textAlignVertical: "center",
    height: "100%",
    textAlign: "center"
  },
  paginationView: {
    height: 37,
    flexDirection: "row",
    borderRadius: 50,
    overflow: "hidden",
    backgroundColor: colours.el,
    borderColor: colours.gray,
    borderWidth: 1
  },
  paginationContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 50,
    padding: 10
  }
};

const mapStateToProps = state => ({
  ...state
});

export default connect(
  mapStateToProps,
  { simpleAction }
)(WordListScene);
