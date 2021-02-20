import React from "react";
import { View, Text, FlatList } from "react-native";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import realm from "../../db";
import FilterBar from "../components/FilterBar";
import CompletedWordsProgressBar from "../components/CompletedWordsProgressBar";

import simpleAction from "../../redux/actions/simpleActions";
import { getAllWords, getFilteredWordList } from "../../db/services/wordsServices";
import WordMainCard from "../components/wordMainCard";
import Floating from "../components/AddFloating";
import { useTheme } from "../../themes/ThemeProvider";

// class HomeScene extends React.Component {
const HomeScene = () => {
  /* constructor(props) {
   super(props);
		this.state = { words: null, wordFilter: '', favoriteFilter: false };
		realm.addListener('change', () => {
			this.getWords();
		});
	}
	
	componentDidMount() {
		// this.getWords();
	} 
	*/
  React.useEffect(() => {
    realm.addListener("change", () => {
      getWords();
    });
  }, []);

  const navigation = useNavigation();
  const [favoriteFilter, setFavoriteFilter] = React.useState(false);
  const [wordFilter, setWordFilter] = React.useState("");
  const { colors } = useTheme();

  const simpleAction = event => {
    // this.props.simpleAction();
  };

  const getWords = () => {
    let words = null;

    if (wordFilter === "" && !favoriteFilter) words = getAllWords();
    else words = getFilteredWordList(wordFilter, favoriteFilter);

    return words;
  };

  const renderWords = words => {
    if (words.length > 0) {
      return (
        <FlatList
          ListHeaderComponent={<View style={{ height: 1 }} />}
          data={words}
          renderItem={({ item, index }) => (
            <WordMainCard index={index} key={index} word={item} />
          )}
          ListFooterComponent={<View style={{ height: 87 }} />}
          keyExtractor={(item, index) => String(index)}
        />
      );
    }

    return (
      <View style={{ paddingTop: 50, alignItems: "center", color: colors.text }}>
        <Text style={{ color: colors.text }}>No words found :(</Text>
        <Text style={{ color: colors.text }}>You can add more with the "+" button</Text>
      </View>
    );
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
        updateFavorite={favoriteFilter => setFavoriteFilter(favoriteFilter)}
        favoriteFilter={favoriteFilter}
      />
      <CompletedWordsProgressBar />
      {renderWords(getWords())}
      <Floating navigation={navigation} />
    </View>
  );
};

const mapStateToProps = state => ({
  ...state
});

export default connect(
  mapStateToProps,
  { simpleAction }
)(HomeScene);
